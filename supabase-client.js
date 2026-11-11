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
  // Helper: Clean YouTube/Drive embed URL
  formatVideoEmbed(url) {
    if (!url) return { type: "none", src: "" };
    const clean = url.trim();
    if (clean.startsWith("data:video") || /\.(mp4|webm|ogg)(\?.*)?$/i.test(clean)) {
      return { type: "video", src: clean };
    }
    const ytMatch = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}` };
    }
    const driveMatch = clean.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch && driveMatch[1]) {
      return { type: "iframe", src: `https://drive.google.com/file/d/${driveMatch[1]}/preview` };
    }
    return { type: "iframe", src: clean };
  },

  // 1. Fetch all real courses (excluding system_ban, site_video, site_review)
  async getCourses() {
    if (db) {
      try {
        const { data, error } = await db
          .from("courses")
          .select("*")
          .not("grade", "in", '("site_video","site_review","system_ban","system_avatar","system_config")');
        if (!error && data && data.length > 0) {
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
    try {
      const local = localStorage.getItem("abaqera_courses");
      let courses = local ? JSON.parse(local) : [];
      const idx = courses.findIndex(c => c.id === course.id);
      if (idx >= 0) courses[idx] = Object.assign(courses[idx], course);
      else courses.unshift(course);
      localStorage.setItem("abaqera_courses", JSON.stringify(courses));
    } catch (e) {}

    if (db) {
      try {
        await db.from("courses").upsert({
          id: course.id,
          title: course.title,
          grade: course.grade,
          grade_name: course.gradeName,
          price: course.price,
          lectures_count: course.lecturesCount || 20,
          image: course.image || "assets/logo.png",
          youtube_url: course.youtubeUrl || "",
          description: course.description || "",
          pdf_url: course.pdfUrl || ""
        });
      } catch (err) {
        console.warn("Failed to upsert course to Supabase:", err);
      }
    }
  },

  // 2.1 Delete course
  async deleteCourse(courseId) {
    try {
      const local = localStorage.getItem("abaqera_courses");
      if (local) {
        const courses = JSON.parse(local).filter(c => c.id !== courseId);
        localStorage.setItem("abaqera_courses", JSON.stringify(courses));
      }
    } catch (e) {}

    if (db) {
      try {
        await db.from("courses").delete().eq("id", courseId);
      } catch (err) {
        console.warn("Failed to delete course:", err);
      }
    }
  },

  // 3. Register or Update Student in Supabase
  async saveStudent(student) {
    if (db) {
      try {
        const studentPayload = {
          student_code: student.id || student.student_code,
          name: student.name,
          phone: student.phone.trim(),
          grade: student.grade,
          governorate: student.governorate,
          password: student.password || ""
        };

        if (student.email && student.email.trim()) {
          studentPayload.email = student.email.trim().toLowerCase();
        }

        let existingId = null;
        const { data: existing } = await db.from("students")
          .select("id")
          .eq("phone", student.phone.trim())
          .limit(1);

        if (existing && existing.length > 0) {
          existingId = existing[0].id;
        }

        const runSave = async (payload) => {
          if (existingId) {
            return await db.from("students").update(payload).eq("id", existingId).select();
          } else {
            return await db.from("students").insert([payload]).select();
          }
        };

        let res = await runSave(studentPayload);
        if (res.error && studentPayload.email) {
          delete studentPayload.email;
          res = await runSave(studentPayload);
        }

        if (res.error) console.warn("Supabase saveStudent error:", res.error);
        return { success: !res.error, data: res.data };
      } catch (err) {
        console.warn("Failed to save student in Supabase:", err);
      }
    }
    return { success: false };
  },

  // 3.1 Authenticate Student (with Ban check)
  async loginStudent(identifier, password) {
    if (db) {
      try {
        const cleanIdentifier = identifier.trim();
        let data = null;

        if (cleanIdentifier.includes("@")) {
          try {
            const res = await db.from("students")
              .select("*")
              .eq("email", cleanIdentifier.toLowerCase())
              .limit(1);
            if (!res.error && res.data && res.data.length > 0) {
              data = res.data;
            }
          } catch (e) {}
        }

        if (!data || data.length === 0) {
          const res = await db.from("students")
            .select("*")
            .eq("phone", cleanIdentifier)
            .limit(1);
          if (!res.error && res.data && res.data.length > 0) {
            data = res.data;
          }
        }

        if (!data || data.length === 0) {
          const res = await db.from("students")
            .select("*")
            .eq("student_code", cleanIdentifier)
            .limit(1);
          if (!res.error && res.data && res.data.length > 0) {
            data = res.data;
          }
        }

        if (data && data.length > 0) {
          const user = data[0];

          // Check if student is banned (via column or system_ban marker)
          let isBanned = user.is_banned === true;
          if (!isBanned) {
            try {
              const { data: banRows } = await db
                .from("courses")
                .select("id")
                .eq("id", `ban-${user.id}`)
                .limit(1);
              if (banRows && banRows.length > 0) isBanned = true;
            } catch (e) {}
          }

          if (isBanned) {
            return {
              success: false,
              error: "banned",
              message: "تم حظر هذا الحساب من دخول المنصة من قبل الإدارة. يرجى التواصل مع الدعم الفني."
            };
          }

          if (user.password && user.password.toString().trim() === password.toString().trim()) {
            // Hydrate avatar from system_avatar marker if not directly stored on student row
            if (!user.avatar && user.id) {
              user.avatar = await this.getStudentAvatar(user.id);
            }
            return { success: true, user: user };
          } else {
            return { success: false, error: "wrong_password", message: "كلمة المرور غير صحيحة، يرجى إعادة المحاولة!" };
          }
        } else {
          return { success: false, error: "user_not_found", message: "هذا الحساب غير مسجل في قاعدة البيانات، يرجى إنشاء حساب جديد أولاً." };
        }
      } catch (err) {
        console.warn("Supabase loginStudent exception:", err);
      }
    }

    const local = localStorage.getItem("abaqera_registered_students");
    if (local) {
      try {
        const studentsList = JSON.parse(local);
        const user = studentsList.find(s => s.phone === identifier.trim() || s.email === identifier.trim() || s.id === identifier.trim());
        if (user) {
          if (user.is_banned) {
            return { success: false, error: "banned", message: "تم حظر هذا الحساب من دخول المنصة." };
          }
          if (user.password && user.password.toString().trim() === password.toString().trim()) {
            return { success: true, user: user };
          } else {
            return { success: false, error: "wrong_password", message: "كلمة المرور غير صحيحة!" };
          }
        }
      } catch (e) {}
    }

    return { success: false, error: "user_not_found", message: "هذا الحساب غير مسجل في المنصة!" };
  },

  // 3.2 Ban / Unban Student
  async toggleBanStudent(studentId, phone, email, shouldBan) {
    if (!db) return { success: false };
    try {
      const banId = `ban-${studentId}`;
      if (shouldBan) {
        await db.from("courses").upsert({
          id: banId,
          title: phone || studentId,
          grade: "system_ban",
          grade_name: "محظور",
          price: "banned",
          description: email || ""
        });
      } else {
        await db.from("courses").delete().eq("id", banId);
      }
      // Also attempt updating column if present
      try {
        await db.from("students").update({ is_banned: shouldBan }).eq("id", studentId);
      } catch (e) {}
      return { success: true };
    } catch (err) {
      console.warn("toggleBanStudent error:", err);
      return { success: false, error: err };
    }
  },

  // 3.3 Delete Student permanently
  async deleteStudent(studentId) {
    if (!db) return { success: false };
    try {
      const { error } = await db.from("students").delete().eq("id", studentId);
      try {
        await db.from("courses").delete().eq("id", `ban-${studentId}`);
      } catch (e) {}
      return { success: !error, error };
    } catch (err) {
      console.warn("deleteStudent error:", err);
      return { success: false, error: err };
    }
  },

  // 3.3b Get / Save Student Avatar & Profile (Name, Password, Avatar)
  async getStudentAvatar(studentKey) {
    if (!db || !studentKey) return "";
    try {
      const { data } = await db
        .from("courses")
        .select("image")
        .eq("id", `avatar-${studentKey}`)
        .limit(1);
      if (data && data.length > 0 && data[0].image) {
        return data[0].image;
      }
    } catch (e) {}
    return "";
  },

  async updateStudentProfile({ dbId, phone, email, studentCode, name, currentPassword, newPassword, avatar }) {
    let targetRow = null;

    if (db) {
      try {
        if (dbId) {
          const { data } = await db.from("students").select("*").eq("id", dbId).limit(1);
          if (data && data.length > 0) targetRow = data[0];
        }
        if (!targetRow && phone) {
          const { data } = await db.from("students").select("*").eq("phone", phone.trim()).limit(1);
          if (data && data.length > 0) targetRow = data[0];
        }
        if (!targetRow && email) {
          const { data } = await db.from("students").select("*").eq("email", email.trim().toLowerCase()).limit(1);
          if (data && data.length > 0) targetRow = data[0];
        }
        if (!targetRow && studentCode) {
          const { data } = await db.from("students").select("*").eq("student_code", studentCode.trim()).limit(1);
          if (data && data.length > 0) targetRow = data[0];
        }

        // Verify password if changing password
        if (newPassword && newPassword.trim() !== "") {
          if (targetRow && targetRow.password && currentPassword !== undefined && currentPassword !== null) {
            if (targetRow.password.toString().trim() !== currentPassword.toString().trim()) {
              return {
                success: false,
                error: "wrong_password",
                message: "كلمة المرور الحالية غير صحيحة!"
              };
            }
          }
        }

        const updates = {};
        if (name && name.trim()) updates.name = name.trim();
        if (newPassword && newPassword.trim()) updates.password = newPassword.trim();

        if (targetRow && Object.keys(updates).length > 0) {
          const { error: updErr } = await db.from("students").update(updates).eq("id", targetRow.id);
          if (updErr) {
            return { success: false, error: updErr, message: "تعذر تحديث البيانات في قاعدة البيانات." };
          }
        }

        // Save avatar in system_avatar marker (+ try direct column if present)
        const avatarKey = (targetRow && targetRow.id) || dbId || phone || studentCode;
        if (avatar !== undefined && avatarKey) {
          if (avatar === "") {
            await db.from("courses").delete().eq("id", `avatar-${avatarKey}`);
          } else {
            await db.from("courses").upsert({
              id: `avatar-${avatarKey}`,
              title: (targetRow && targetRow.phone) || phone || "avatar",
              grade: "system_avatar",
              grade_name: "صورة الطالب",
              price: "avatar",
              image: avatar
            });
          }
          if (targetRow) {
            try {
              await db.from("students").update({ avatar: avatar }).eq("id", targetRow.id);
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn("updateStudentProfile Supabase error:", err);
        return { success: false, error: err, message: "حدث خطأ أثناء حفظ البيانات." };
      }
    }

    // Update localStorage fallback list as well
    try {
      const localListRaw = localStorage.getItem("abaqera_registered_students");
      if (localListRaw) {
        const list = JSON.parse(localListRaw);
        const idx = list.findIndex(s =>
          (phone && s.phone === phone) ||
          (email && s.email === email) ||
          (studentCode && s.id === studentCode)
        );
        if (idx >= 0) {
          if (name && name.trim()) list[idx].name = name.trim();
          if (newPassword && newPassword.trim()) list[idx].password = newPassword.trim();
          if (avatar !== undefined) list[idx].avatar = avatar;
          localStorage.setItem("abaqera_registered_students", JSON.stringify(list));
        }
      }
    } catch (e) {}

    return {
      success: true,
      user: {
        ...(targetRow || {}),
        name: (name && name.trim()) || (targetRow && targetRow.name),
        password: (newPassword && newPassword.trim()) || (targetRow && targetRow.password),
        avatar: avatar !== undefined ? avatar : (targetRow && targetRow.avatar)
      }
    };
  },

  // 3.4 Get Subscribed courses for a student from Supabase (approved only)
  async getStudentSubscriptions(studentPhone) {
    if (db && studentPhone) {
      try {
        const { data, error } = await db.from("subscriptions")
          .select("*")
          .eq("student_phone", studentPhone.trim())
          .eq("status", "approved");

        if (!error && data && data.length > 0) {
          let allCourses = [];
          try { allCourses = await this.getCourses(); } catch (e) {}

          return data.map(sub => {
            const matchedCourse = allCourses.find(c =>
              c.id === sub.course_id ||
              (sub.course_title && c.title && c.title.trim() === sub.course_title.trim())
            );
            return {
              id: sub.course_id || (matchedCourse && matchedCourse.id) || sub.id,
              title: sub.course_title,
              grade: (matchedCourse && matchedCourse.gradeName) || "الصف الثالث الثانوي",
              price: sub.price || (matchedCourse && matchedCourse.price) || "250 ج.م",
              image: (matchedCourse && matchedCourse.image) || "assets/logo.png",
              youtubeUrl: (matchedCourse && matchedCourse.youtubeUrl) || "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
              description: (matchedCourse && matchedCourse.description) || "شرح تفصيلي للمنهج مع حل أفكار ومسائل الثانوية العامة ونواتج التعلم.",
              lecturesCount: (matchedCourse && matchedCourse.lecturesCount) || 20,
              pdfUrl: (matchedCourse && matchedCourse.pdfUrl) || "",
              subscribedAt: sub.created_at ? new Date(sub.created_at).toLocaleDateString("ar-EG") : "حديثاً",
              status: "كورس نشط ومفعل ✓",
              rawStatus: sub.status
            };
          });
        }
      } catch (err) {
        console.warn("Supabase fetch student subscriptions failed:", err);
      }
    }
    return [];
  },

  // 3.5 Get ALL subscription records (approved + pending + rejected) for student overview modal
  async getAllStudentSubscriptions(studentPhone) {
    if (db && studentPhone) {
      try {
        const { data, error } = await db.from("subscriptions")
          .select("*")
          .eq("student_phone", studentPhone.trim())
          .order("created_at", { ascending: false });

        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn("Supabase fetch all student subscriptions failed:", err);
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
      } catch (err) {
        console.warn("Failed to save subscription in Supabase:", err);
      }
    }
  },

  // 4.1 Update Subscription status
  async updateSubscriptionStatus(subId, newStatus) {
    if (!db) return { success: false };
    try {
      const { error } = await db.from("subscriptions").update({ status: newStatus }).eq("id", subId);
      return { success: !error, error };
    } catch (err) {
      return { success: false, error: err };
    }
  },

  // 5. Get all Subscriptions for Admin
  async getSubscriptions() {
    if (db) {
      try {
        const { data, error } = await db.from("subscriptions").select("*").order("created_at", { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn("Failed to get subscriptions from Supabase:", err);
      }
    }
    return [];
  },

  // 6. Get all Students for Admin (with ban flags merged)
  async getStudents() {
    if (db) {
      try {
        const [stuRes, banRes] = await Promise.all([
          db.from("students").select("*").order("created_at", { ascending: false }),
          db.from("courses").select("id").eq("grade", "system_ban")
        ]);
        const bannedSet = new Set((banRes.data || []).map(b => b.id.replace(/^ban-/, "")));
        if (!stuRes.error && stuRes.data) {
          return stuRes.data.map(s => ({
            ...s,
            is_banned: s.is_banned === true || bannedSet.has(String(s.id))
          }));
        }
      } catch (err) {
        console.warn("Failed to get students from Supabase:", err);
      }
    }
    return [];
  },

  // 7. Homepage Videos (stored in Supabase courses table with grade = 'site_video' + localStorage)
  async getSiteVideos() {
    if (db) {
      try {
        const { data, error } = await db
          .from("courses")
          .select("*")
          .eq("grade", "site_video")
          .order("created_at", { ascending: false });
        if (!error && data) {
          const videos = data.map(v => ({
            id: v.id,
            title: v.title,
            gradeName: v.grade_name || "عام لجميع الصفوف",
            videoUrl: v.youtube_url || "",
            thumbnail: v.image || "assets/logo.png",
            description: v.description || "",
            createdAt: v.created_at
          }));
          localStorage.setItem("abaqera_site_videos", JSON.stringify(videos));
          return videos;
        }
      } catch (err) {
        console.warn("getSiteVideos failed:", err);
      }
    }
    const local = localStorage.getItem("abaqera_site_videos");
    return local ? JSON.parse(local) : [];
  },

  async saveSiteVideo(video) {
    const id = video.id || ("video-" + Date.now());
    const payload = {
      id,
      title: video.title,
      grade: "site_video",
      grade_name: video.gradeName || "الصف الثالث الثانوي",
      price: "مجاني",
      lectures_count: 1,
      image: video.thumbnail || "assets/logo.png",
      youtube_url: video.videoUrl,
      description: video.description || ""
    };

    try {
      const local = localStorage.getItem("abaqera_site_videos");
      let list = local ? JSON.parse(local) : [];
      list = list.filter(item => item.id !== id);
      list.unshift({
        id,
        title: payload.title,
        gradeName: payload.grade_name,
        videoUrl: payload.youtube_url,
        thumbnail: payload.image,
        description: payload.description
      });
      localStorage.setItem("abaqera_site_videos", JSON.stringify(list));
    } catch (e) {}

    if (db) {
      const { error } = await db.from("courses").upsert(payload);
      return { success: !error, error };
    }
    return { success: true };
  },

  async deleteSiteVideo(videoId) {
    try {
      const local = localStorage.getItem("abaqera_site_videos");
      if (local) {
        const list = JSON.parse(local).filter(v => v.id !== videoId);
        localStorage.setItem("abaqera_site_videos", JSON.stringify(list));
      }
    } catch (e) {}

    if (db) {
      const { error } = await db.from("courses").delete().eq("id", videoId);
      return { success: !error, error };
    }
    return { success: true };
  },

  // 8. Student Reviews / Testimonials (stored in Supabase courses table with grade = 'site_review' + localStorage)
  async getReviews() {
    if (db) {
      try {
        const { data, error } = await db
          .from("courses")
          .select("*")
          .eq("grade", "site_review")
          .order("created_at", { ascending: false });
        if (!error && data) {
          const reviews = data.map(r => ({
            id: r.id,
            studentName: r.title,
            subtitle: r.grade_name || "طالب ثانوية عامة",
            rating: r.lectures_count || 5,
            text: r.description || "",
            image: r.image || "",
            createdAt: r.created_at
          }));
          localStorage.setItem("abaqera_reviews", JSON.stringify(reviews));
          return reviews;
        }
      } catch (err) {
        console.warn("getReviews failed:", err);
      }
    }
    const local = localStorage.getItem("abaqera_reviews");
    return local ? JSON.parse(local) : [];
  },

  async saveReview(review) {
    const id = review.id || ("review-" + Date.now());
    const payload = {
      id,
      title: review.studentName,
      grade: "site_review",
      grade_name: review.subtitle || "الصف الثالث الثانوي • 60/60",
      price: "approved",
      lectures_count: parseInt(review.rating) || 5,
      image: review.image || "",
      youtube_url: "",
      description: review.text
    };

    try {
      const local = localStorage.getItem("abaqera_reviews");
      let list = local ? JSON.parse(local) : [];
      list = list.filter(item => item.id !== id);
      list.unshift({
        id,
        studentName: payload.title,
        subtitle: payload.grade_name,
        rating: payload.lectures_count,
        text: payload.description,
        image: payload.image
      });
      localStorage.setItem("abaqera_reviews", JSON.stringify(list));
    } catch (e) {}

    if (db) {
      const { error } = await db.from("courses").upsert(payload);
      return { success: !error, error };
    }
    return { success: true };
  },

  async deleteReview(reviewId) {
    try {
      const local = localStorage.getItem("abaqera_reviews");
      if (local) {
        const list = JSON.parse(local).filter(r => r.id !== reviewId);
        localStorage.setItem("abaqera_reviews", JSON.stringify(list));
      }
    } catch (e) {}

    if (db) {
      const { error } = await db.from("courses").delete().eq("id", reviewId);
      return { success: !error, error };
    }
    return { success: true };
  },

  // 9. Activation Codes
  async getActivationCodes() {
    if (db) {
      try {
        const { data, error } = await db.from("activation_codes").select("*").order("created_at", { ascending: false });
        if (!error && data) return data;
      } catch (e) {}
    }
    return [];
  },

  async createActivationCode(code, courseTitle) {
    if (db) {
      try {
        const { data, error } = await db.from("activation_codes").insert([{
          code,
          course_title: courseTitle || "كود باقة العباقرة الشامل",
          is_used: false
        }]).select();
        return { success: !error, data, error };
      } catch (e) {
        return { success: false, error: e };
      }
    }
    return { success: false };
  },

  async deleteActivationCode(code) {
    if (db) {
      try {
        await db.from("activation_codes").delete().eq("code", code);
      } catch (e) {}
    }
  },

  // 10. Kashier Payment Gateway Configuration (stored cleanly via system_config + localStorage)
  KASHIER_DEFAULT_API_KEY: "ded74f2b-df3b-4a8e-92a4-3198ee0a18c7",

  async getKashierConfig() {
    const defaults = {
      merchantId: "",
      apiKey: this.KASHIER_DEFAULT_API_KEY,
      mode: "test",
      enabled: true,
      updatedAt: null
    };

    let localCfg = null;
    try {
      const raw = localStorage.getItem("abaqera_kashier_config");
      if (raw) localCfg = JSON.parse(raw);
    } catch (e) {}

    if (db) {
      try {
        const { data, error } = await db
          .from("courses")
          .select("*")
          .eq("id", "config-kashier")
          .maybeSingle();
        if (!error && data && data.description) {
          const parsed = JSON.parse(data.description);
          const merged = {
            ...defaults,
            ...(localCfg || {}),
            ...parsed,
            apiKey: parsed.apiKey || (localCfg && localCfg.apiKey) || defaults.apiKey
          };
          try {
            localStorage.setItem("abaqera_kashier_config", JSON.stringify(merged));
          } catch (e) {}
          return merged;
        }
      } catch (e) {
        console.warn("getKashierConfig failed, using fallback:", e);
      }
    }

    return { ...defaults, ...(localCfg || {}) };
  },

  async saveKashierConfig(cfg) {
    const clean = {
      merchantId: String((cfg && cfg.merchantId) || "").trim(),
      apiKey: String((cfg && cfg.apiKey) || this.KASHIER_DEFAULT_API_KEY).trim(),
      mode: String((cfg && cfg.mode) || "test").trim().toLowerCase() === "live" ? "live" : "test",
      enabled: cfg && typeof cfg.enabled === "boolean" ? cfg.enabled : true,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem("abaqera_kashier_config", JSON.stringify(clean));
    } catch (e) {}

    if (db) {
      try {
        const { error } = await db.from("courses").upsert({
          id: "config-kashier",
          title: "__KASHIER_CONFIG__",
          grade: "system_config",
          grade_name: clean.mode,
          price: "0",
          lectures_count: 0,
          image: "assets/logo.png",
          youtube_url: "",
          description: JSON.stringify(clean)
        });
        return { success: !error, config: clean, error };
      } catch (e) {
        return { success: false, config: clean, error: e };
      }
    }

    return { success: true, config: clean };
  }
};
