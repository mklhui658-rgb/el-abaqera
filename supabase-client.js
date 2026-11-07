// ==========================================
// SUPABASE CLIENT & SERVICE FOR AL-ABAQERA PLATFORM
// ==========================================
const SUPABASE_URL = "https://frmtlxhxkwmobetvbhor.supabase.co";
const SUPABASE_KEY = "sb_publishable_wczrF8UHYVe2jjF1Ym9-VA_NBEyVIiu";

let db = null;
if (typeof supabase !== "undefined") {
  db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("Supabase Client initialized successfully!");
}

const SupabaseAPI = {
  // 1. Fetch all courses from Supabase with fallback to localStorage
  async getCourses() {
    if (db) {
      try {
        const { data, error } = await db.from("courses").select("*");
        if (!error && data && data.length > 0) {
          // Normalize field names
          return data.map(c => ({
            id: c.id,
            grade: c.grade,
            gradeName: c.grade_name || c.gradeName,
            title: c.title,
            description: c.description,
            price: c.price,
            lecturesCount: c.lectures_count || c.lecturesCount || 20,
            image: c.image || "assets/logo.png",
            youtubeUrl: c.youtube_url || c.youtubeUrl || "",
            pdfUrl: c.pdf_url || c.pdfUrl || "",
            watermarkEnabled: true
          }));
        }
      } catch (err) {
        console.warn("Supabase getCourses failed, using local fallback:", err);
      }
    }
    const local = localStorage.getItem("abaqera_courses");
    return local ? JSON.parse(local) : (typeof DEFAULT_COURSES !== "undefined" ? DEFAULT_COURSES : []);
  },

  // 2. Save/Update course in Supabase & localStorage
  async saveCourse(course) {
    // Save to local storage first for instant feedback
    let courses = [];
    try {
      const local = localStorage.getItem("abaqera_courses");
      courses = local ? JSON.parse(local) : [];
      const idx = courses.findIndex(c => c.id === course.id);
      if (idx >= 0) courses[idx] = Object.assign(courses[idx], course);
      else courses.unshift(course);
      localStorage.setItem("abaqera_courses", JSON.stringify(courses));
    } catch(e) {}

    // Save to Supabase
    if (db) {
      try {
        await db.from("courses").upsert({
          id: course.id,
          title: course.title,
          grade: course.grade,
          grade_name: course.gradeName,
          price: course.price,
          lectures_count: course.lecturesCount,
          image: course.image,
          youtube_url: course.youtubeUrl,
          description: course.description,
          pdf_url: course.pdfUrl
        });
        console.log("Course saved to Supabase:", course.title);
      } catch (err) {
        console.warn("Failed to upsert course to Supabase:", err);
      }
    }
  },

  // 3. Register or Update Student in Supabase
  async saveStudent(student) {
    if (db) {
      try {
        const { data, error } = await db.from("students").upsert({
          student_code: student.id || student.student_code,
          name: student.name,
          phone: student.phone,
          grade: student.grade,
          governorate: student.governorate,
          password: student.password || ""
        }, { onConflict: "phone" });
        console.log("Student saved to Supabase:", student.name);
        return { success: true, data };
      } catch (err) {
        console.warn("Failed to save student in Supabase:", err);
      }
    }
    return { success: false };
  },

  // 3.1 Authenticate Student by Phone or Code and Password
  async loginStudent(phoneOrCode, password) {
    if (db) {
      try {
        const cleanIdentifier = phoneOrCode.trim();
        // Query student by phone or student_code
        const { data, error } = await db.from("students")
          .select("*")
          .or(`phone.eq.${cleanIdentifier},student_code.eq.${cleanIdentifier}`)
          .limit(1);

        if (error) {
          console.warn("Supabase query error:", error);
        } else if (data && data.length > 0) {
          const user = data[0];
          // Strict password verification
          if (user.password === password.trim()) {
            return { success: true, user: user };
          } else {
            return { success: false, error: "wrong_password", message: "كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى." };
          }
        } else {
          return { success: false, error: "user_not_found", message: "الحساب غير مسجل في المنصة، يرجى إنشاء حساب جديد." };
        }
      } catch (err) {
        console.warn("Supabase loginStudent exception:", err);
      }
    }

    // Local fallback if Supabase is offline
    const local = localStorage.getItem("abaqera_registered_students");
    if (local) {
      try {
        const studentsList = JSON.parse(local);
        const user = studentsList.find(s => s.phone === phoneOrCode.trim() || s.id === phoneOrCode.trim());
        if (user) {
          if (user.password === password.trim()) {
            return { success: true, user: user };
          } else {
            return { success: false, error: "wrong_password", message: "كلمة المرور غير صحيحة." };
          }
        }
      } catch(e) {}
    }

    return { success: false, error: "user_not_found", message: "الحساب غير مسجل أو البيانات غير صحيحة." };
  },

  // 3.2 Get Subscribed courses for a student from Supabase
  async getStudentSubscriptions(studentPhone) {
    if (db) {
      try {
        const { data, error } = await db.from("subscriptions")
          .select("*")
          .eq("student_phone", studentPhone.trim())
          .eq("status", "approved");
        
        if (!error && data && data.length > 0) {
          return data.map(sub => ({
            id: sub.course_id || sub.id,
            title: sub.course_title,
            grade: "الصف الثالث الثانوي",
            price: sub.price,
            image: "assets/logo.png",
            youtubeUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
            description: "شرح تفصيلي للمنهج مع حل أفكار ومسائل الثانوية العامة ونواتج التعلم.",
            lecturesCount: 20,
            pdfUrl: "",
            subscribedAt: new Date(sub.created_at).toLocaleDateString("ar-EG"),
            status: "كورس نشط ومفعل ✓"
          }));
        }
      } catch (err) {
        console.warn("Supabase fetch student subscriptions failed:", err);
      }
    }
    return [];
  },

  // 4. Save Subscription order
  async saveSubscription(sub) {
    if (db) {
      try {
        await db.from("subscriptions").insert([{
          invoice_code: sub.invoiceCode || sub.invoice_code || ("#INV-" + Math.floor(10000 + Math.random() * 90000)),
          student_name: sub.studentName || sub.student_name,
          student_phone: sub.studentPhone || sub.student_phone,
          course_id: sub.courseId || sub.course_id || null,
          course_title: sub.courseTitle || sub.course_title,
          price: sub.price,
          payment_method: sub.paymentMethod || sub.payment_method || "فودافون كاش",
          sender_number: sub.senderNumber || sub.sender_number || "",
          status: sub.status || "approved"
        }]);
        console.log("Subscription saved to Supabase:", sub.courseTitle);
      } catch (err) {
        console.warn("Failed to save subscription in Supabase:", err);
      }
    }
  },

  // 5. Get all Subscriptions for Admin
  async getSubscriptions() {
    if (db) {
      try {
        const { data, error } = await db.from("subscriptions").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn("Failed to get subscriptions from Supabase:", err);
      }
    }
    return [];
  },

  // 6. Get all Students for Admin
  async getStudents() {
    if (db) {
      try {
        const { data, error } = await db.from("students").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn("Failed to get students from Supabase:", err);
      }
    }
    return [];
  }
};
