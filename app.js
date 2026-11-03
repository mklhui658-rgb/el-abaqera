// Phone & Contact Configuration
const PLATFORM_PHONE = "019624723742";
const WHATSAPP_INTL = "2019624723742"; // Egyptian international format

// Data: Courses (Dark Red Themed)
const coursesData = [
  {
    id: "chem3-organic",
    grade: "grade3",
    gradeName: "الصف الثالث الثانوي",
    title: "الكيمياء العضوية الشاملة - من الصفر حتى الإتقان",
    description: "شرح تفصيلي للهيدروكربونات، مشتقات الهيدروكربونات، التسمية بنظام الأيوباك (IUPAC)، ومعادلات التحويلات الصعبة بنظام الفهم ونواتج التعلم.",
    badge: "الأكثر طلباً ⭐",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    lecturesCount: 28,
    hours: 54,
    price: "250 ج.م / شهر",
    topics: ["الألكانات والألكينات والألكاينات", "الهيدروكربونات الحلقية والبنزين العطري", "الكحولات والفينولات", "الأحماض الكربوكسيلية والإسترات"],
    icon: "fa-flask-vial",
    color: "from-red-600 to-rose-900"
  },
  {
    id: "chem3-transition",
    grade: "grade3",
    gradeName: "الصف الثالث الثانوي",
    title: "الباب الأول: العناصر الانتقالية وتعدين الحديد",
    description: "التوزيع الإلكتروني، حالات التأكسد الشائعة، الخواص المغناطيسية والألوان، وتفاعلات سبائك الحديد وأكاسيده الثلاثة بدقة متناهية.",
    badge: "تأسيس تالتة",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
    lecturesCount: 16,
    hours: 32,
    price: "200 ج.م / شهر",
    topics: ["عناصر السلسلة الانتقالية الأولى", "الخواص العامة وخواص التيتانيوم والمنجنيز", "خامات الحديد والأفران", "مخطط تحويلات أكاسيد الحديد"],
    icon: "fa-atom",
    color: "from-red-700 to-stone-900"
  },
  {
    id: "chem3-electro",
    grade: "grade3",
    gradeName: "الصف الثالث الثانوي",
    title: "الباب الرابع: الكيمياء الكهربية والخلايا الجلفانية والإلكتروليتية",
    description: "فهم متعمق لمتسلسلة الجهود الكهربية، صدأ المعادن، بطاريات الليثيوم والمركم الرصاصي، وقوانين فاراداي ومسائلها الوزارية.",
    badge: "شامل المسائل 💡",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    lecturesCount: 18,
    hours: 36,
    price: "220 ج.م / شهر",
    topics: ["الخلايا الجلفانية وخلية دانيال", "تطبيقات إنتاج الطاقة وبطارية الرصاص", "تآكل المعادن وطرق الحماية الكاثودية", "قوانين فاراداي والتحليل الكهربي"],
    icon: "fa-bolt",
    color: "from-red-800 to-rose-950"
  },
  {
    id: "chem3-equilibrium",
    grade: "grade3",
    gradeName: "الصف الثالث الثانوي",
    title: "الباب الثاني والثالث: التحليل الكيميائي والاتزان الأيوني",
    description: "كواشف الشقوق الحامضية والقاعدية وألوان الرواسب، ومسائل التطاير والترسيب، مع قاعدة لوشاتيليه وحسابات الـ pH و Ka.",
    badge: "تجارب معملية",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
    lecturesCount: 22,
    hours: 40,
    price: "220 ج.م / شهر",
    topics: ["الكشف عن الأنيونات والكاتيونات", "مسائل المعايرة والترسيب والتطاير", "الاتزان الكيميائي وقاعدة لوشاتيليه", "حسابات الأس الهيدروجيني وحاصل الإذابة Ksp"],
    icon: "fa-scale-balanced",
    color: "from-rose-700 to-red-950"
  },
  {
    id: "chem2-full",
    grade: "grade2",
    gradeName: "الصف الثاني الثانوي",
    title: "منهج الكيمياء المتكامل - الصف الثاني الثانوي",
    description: "بنية الذرة ونظريات بور والحديثة، أعداد الكم الأربعة، الجدول الدوري وتدرج الخواص، والروابط التساهمية والأيونية ونظرية الأوربيتالات الجزيئية.",
    badge: "ترم كامل",
    badgeColor: "bg-red-600/20 text-red-300 border-red-500/30",
    lecturesCount: 24,
    hours: 42,
    price: "180 ج.م / شهر",
    topics: ["تطور مفهوم بنية الذرة", "أعداد الكم الأربعة وقواعد التوزيع", "تدرج نصف القطر وسالبية العناصر", "نظريات الرابطة التساهمية والتهجين"],
    icon: "fa-dna",
    color: "from-red-600 to-zinc-900"
  },
  {
    id: "chem1-full",
    grade: "grade1",
    gradeName: "الصف الأول الثانوي",
    title: "تأسيس الكيمياء والنانو تكنولوجي - الصف الأول الثانوي",
    description: "الكيمياء مركز العلوم، كيمياء النانو والمواد أحادية وثنائية وثلاثية الأبعاد، الحساب الكيميائي، المول والمعادلة الأيونية ومسائل الناتج الفعلي.",
    badge: "كورس التأسيس 🚀",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    lecturesCount: 20,
    hours: 35,
    price: "150 ج.م / شهر",
    topics: ["الكيمياء والقياس وأدوات المعمل", "كيمياء النانو وتطبيقاتها الطبية", "المول والكتلة المولية وحجم الغاز", "المعادلة الأيونية ومسائل التحديد"],
    icon: "fa-vial",
    color: "from-red-700 to-amber-900"
  }
];

// Interactive Quiz Questions
const quizQuestions = [
  {
    id: 1,
    question: "عند إضافة محلول هيدروكسيد الصوديوم (NaOH) إلى محلول يحتوي على كاتيونات الحديد الثلاثي Fe³⁺، يتكون راسب لونه:",
    options: [
      "أبيض مخضر",
      "بني محمر جيلاتيني",
      "أزرق يتحول لأسود بالتسخين",
      "أصفر يذوب في الأحماض"
    ],
    correctAnswer: 1,
    explanation: "يتكون راسب بني محمر جيلاتيني من هيدروكسيد الحديد الثلاثي Fe(OH)₃ يذوب في الأحماض المخففة، بينما Fe²⁺ يعطي راسب أبيض مخضر."
  },
  {
    id: 2,
    question: "وفقاً لقاعدة ماركونيكوف، عند إضافة بروميد الهيدروجين (HBr) إلى 2-ميثيل بروبين، فإن الناتج الرئيسي هو:",
    options: [
      "1-برومو-2-ميثيل بروبان",
      "2-برومو-2-ميثيل بروبان",
      "2-برومو بيوتان",
      "1-برومو بيوتان"
    ],
    correctAnswer: 1,
    explanation: "تهاجم ذرة الهيدروجين ذرة الكربون الحاملة للعدد الأكبر من ذرات الهيدروجين (الكربون الطرفية)، بينما يرتبط البروم بذرة الكربون الثالثية الحاملة لفرع الميثيل، ليتكون 2-برومو-2-ميثيل بروبان."
  },
  {
    id: 3,
    question: "في الخلية الجلفانية، تحدث عملية الأكسدة عند القطب المسمى:",
    options: [
      "المهبط (الكاثود) وهو القطب الموجب",
      "المصعد (الأنود) وهو القطب السالب",
      "المهبط (الكاثود) وهو القطب السالب",
      "المصعد (الأنود) وهو القطب الموجب"
    ],
    correctAnswer: 1,
    explanation: "في جميع الخلايا الكهروكيميائية تحدث الأكسدة دائماً عند الأنود (المصعد)، وفي الخلية الجلفانية تحديداً يكون الأنود هو القطب السالب نتيجة تراكم الإلكترونات المتحررة."
  },
  {
    id: 4,
    question: "طبقاً لقاعدة لوشاتيليه، في التفاعل الطارد للحرارة N₂ + 3H₂ ⇌ 2NH₃ + Heat، لزيادة كمية غاز النشادر الناتجة يلزم:",
    options: [
      "رفع درجة الحرارة وخفض الضغط",
      "خفض درجة الحرارة وزيادة الضغط",
      "إضافة عامل حفاز ورفع الحرارة",
      "سحب النيتروجين باستمرار من حيز التفاعل"
    ],
    correctAnswer: 1,
    explanation: "التفاعل طارد للحرارة (الحرارة في النواتج)، فخفض الحرارة يزيح الاتزان طردياً نحو تكوين النشادر. وعدد مولات الغازات في المتفاعلات (4) أكبر من النواتج (2)، فزيادة الضغط تزيح التفاعل نحو الحجم الأقل (النشادر)."
  },
  {
    id: 5,
    question: "أي من العناصر الانتقالية الآتية يمتلك أعلى حالة تأكسد ممكنة في السلسلة الانتقالية الأولى؟",
    options: [
      "الكروم (+6)",
      "التيتانيوم (+4)",
      "المنجنيز (+7)",
      "الحديد (+6)"
    ],
    correctAnswer: 2,
    explanation: "المنجنيز (Mn 25) توزيعه [Ar] 4s² 3d⁵ ويفقد جميع إلكترونات 4s و 3d ليصل لأعلى حالة تأكسد (+7) في مركب مثل برمنجنات البوتاسيوم KMnO₄."
  }
];

// Interactive Flashcards
const elementsData = [
  { symbol: "Fe", name: "الحديد", atomicNumber: 26, group: "عنصر انتقالي", note: "عصب الصناعات الثقيلة وعامل حفاز في صناعة النشادر والوقود المخلق بطريقة فيشر-تروبش" },
  { symbol: "Ti", name: "التيتانيوم", atomicNumber: 22, group: "عنصر انتقالي", note: "شديد الصلابة كالصلب وأقل منه كثافة، يستخدم في زراعة الأسنان والمفاصل وسبائك الطائرات" },
  { symbol: "Mn", name: "المنجنيز", atomicNumber: 25, group: "عنصر انتقالي", note: "هش في حالته النقية، سبائكه مع الألومنيوم تصنع منها عبوات المشروبات الغازية المقاومة للتآكل" },
  { symbol: "Cu", name: "النحاس", atomicNumber: 29, group: "عنصر انتقالي", note: "أول فلز عرفه الإنسان، موصل ممتاز للكهرباء ومحلول فهلنج يكشف عن سكر الجلوكوز" },
  { symbol: "C", name: "الكربون", atomicNumber: 6, group: "لافلز", note: "أساس الكيمياء العضوية، يتميز بقدرته الفريدة على تكوين ملايين المركبات بسلاسل مستقيمة وحلقية" },
  { symbol: "Cr", name: "الكروم", atomicNumber: 24, group: "عنصر انتقالي", note: "يقاوم فعل العوامل الجوية لتكون طبقة غير مسامية من الأكسيد على سطحه حجم جزيئاتها أكبر من ذرات الفلز" }
];

// State
let currentFilter = "all";
let currentQuizIndex = 0;
let userAnswers = {};
let quizSubmitted = false;

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderNavbarAuthState();
  renderCourses();
  initFilterButtons();
  renderQuizQuestion();
  renderElementsCards();
  initContactForms();
  initScrollSpy();
});

// Check if student is logged in and adjust the header navigation dynamically
function renderNavbarAuthState() {
  const isLoggedIn = localStorage.getItem("abaqera_logged_in") === "true";
  const authContainer = document.getElementById("nav-auth-container");
  const topAuthContainer = document.getElementById("top-auth-container");

  if (!authContainer) return;

  if (isLoggedIn) {
    let studentName = "أحمد محمود";
    const stored = localStorage.getItem("abaqera_student");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.name) studentName = u.name.split(" ").slice(0, 2).join(" ");
      } catch(e) {}
    }

    // Replace header buttons with student dashboard link and logout
    authContainer.innerHTML = `
      <div class="flex items-center gap-2">
        <a href="dashboard.html" class="flex items-center gap-2 bg-[#1f0910] hover:bg-red-950 border border-red-800/60 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md">
          <div class="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center text-[10px]">
            <i class="fa-solid fa-user-graduate"></i>
          </div>
          <span class="text-white">${studentName}</span>
          <span class="text-amber-400 text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">لوحة الطالب</span>
        </a>

        <button onclick="logoutFromHome()" title="تسجيل الخروج" class="w-9 h-9 rounded-xl bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-900/50 flex items-center justify-center text-xs transition">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    `;

    if (topAuthContainer) {
      topAuthContainer.innerHTML = `
        <span class="text-emerald-400 font-bold flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>مرحباً، ${studentName}</span>
        </span>
        <span class="text-red-900">|</span>
        <a href="dashboard.html" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
          <i class="fa-solid fa-graduation-cap"></i>
          <span>لوحة الطالب والمحتوى المشترك فيه</span>
        </a>
      `;
    }
  } else {
    // Guest state
    authContainer.innerHTML = `
      <a href="auth.html" class="flex items-center gap-2 bg-[#1f0a10] hover:bg-red-950 border border-red-900/50 text-red-200 px-3.5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm">
        <i class="fa-solid fa-user-lock text-red-400"></i>
        <span>دخول / تسجيل</span>
      </a>

      <button onclick="goToCheckout('كورس كيمياء الثانوية العامة', '250 ج.م')" class="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-red-900/40 transition duration-200 btn-glow flex items-center gap-1.5">
        <i class="fa-solid fa-bolt"></i>
        <span>اشترك الآن</span>
      </button>
    `;

    if (topAuthContainer) {
      topAuthContainer.innerHTML = `
        <a href="auth.html" class="hover:text-red-300 transition font-bold text-red-400 flex items-center gap-1">
          <i class="fa-solid fa-user-circle"></i>
          <span>تسجيل الدخول / حساب جديد</span>
        </a>
      `;
    }
  }
}

function logoutFromHome() {
  if (confirm("هل تريد تسجيل الخروج؟")) {
    localStorage.removeItem("abaqera_logged_in");
    showToast("تم تسجيل الخروج بنجاح.");
    renderNavbarAuthState();
  }
}

// Direct Checkout redirection replacing the old form modal
function goToCheckout(courseTitle, coursePrice) {
  const encTitle = encodeURIComponent(courseTitle);
  const encPrice = encodeURIComponent(coursePrice);
  window.location.href = `checkout.html?course=${encTitle}&price=${encPrice}`;
}

// Render Courses (Synchronized with Admin customizations)
function renderCourses() {
  const container = document.getElementById("courses-grid");
  if (!container) return;

  let allCourses = coursesData;
  const stored = localStorage.getItem("abaqera_courses");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge or replace
        allCourses = parsed.map(c => {
          const original = coursesData.find(o => o.id === c.id) || {};
          return {
            id: c.id,
            grade: c.grade || original.grade || "grade3",
            gradeName: c.gradeName || original.gradeName || "الصف الثالث الثانوي",
            title: c.title || original.title,
            description: c.description || original.description || "شرح مفصل وتدريبات عملية على نواتج التعلم.",
            badge: c.badge || original.badge || "كورس متميز ⭐",
            badgeColor: c.badgeColor || original.badgeColor || "bg-red-500/20 text-red-300 border-red-500/30",
            lecturesCount: c.lecturesCount || original.lecturesCount || 20,
            hours: c.hours || original.hours || 40,
            price: c.price || original.price || "250 ج.م / شهر",
            topics: c.topics || original.topics || ["شرح تفصيلي للمنهج", "تدريبات وتطبيقات عملية", "حل نماذج امتحانات الوزارة"],
            icon: c.icon || original.icon || "fa-flask-vial",
            color: c.color || original.color || "from-red-600 to-rose-900",
            image: c.image || original.image || "assets/logo.png",
            youtubeUrl: c.youtubeUrl || original.youtubeUrl || ""
          };
        });
      }
    } catch(e) {}
  }

  const filtered = currentFilter === "all" 
    ? allCourses 
    : allCourses.filter(c => c.grade === currentFilter);

  container.innerHTML = filtered.map(course => `
    <div class="glass-card rounded-2xl overflow-hidden flex flex-col justify-between relative border border-red-900/40 transition-all duration-300 group">
      <div>
        <!-- Course Thumbnail Banner -->
        ${course.image ? `
          <div class="h-40 w-full overflow-hidden relative bg-black/60">
            <img src="${course.image}" onerror="this.src='assets/logo.png'" alt="${course.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-[#140609] via-transparent to-black/20"></div>
            <span class="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border ${course.badgeColor} backdrop-blur-md">
              ${course.badge}
            </span>
            <span class="absolute top-3 left-3 text-xs text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-red-900/50">
              <i class="fa-solid fa-graduation-cap text-red-400 ml-1"></i>
              ${course.gradeName}
            </span>
          </div>
        ` : ''}

        <div class="p-6">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white text-lg shadow-lg shadow-red-900/40 shrink-0">
              <i class="fa-solid ${course.icon}"></i>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-white hover:text-red-400 transition-colors leading-snug">
              ${course.title}
            </h3>
          </div>

          <p class="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
            ${course.description}
          </p>

          <div class="bg-red-950/30 rounded-xl p-3 mb-2 border border-red-900/40">
            <span class="text-xs text-red-300 block mb-1.5 font-semibold">أبرز المحتويات:</span>
            <ul class="space-y-1 text-xs text-slate-300">
              ${(course.topics || []).slice(0, 3).map(t => `
                <li class="flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-check text-red-400 text-[10px]"></i>
                  <span>${t}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      </div>

      <div class="p-6 pt-0">
        <div class="flex items-center justify-between py-3 border-t border-red-950 text-xs text-slate-400 mb-4">
          <span><i class="fa-solid fa-video ml-1 text-red-400"></i> ${course.lecturesCount} محاضرة</span>
          <span><i class="fa-solid fa-clock ml-1 text-amber-400"></i> ${course.hours || 35} ساعة</span>
          <span class="text-emerald-400 font-bold font-mono text-sm">${course.price}</span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <!-- Direct to Payment Gateway -->
          <button onclick="goToCheckout('${course.title}', '${course.price}')" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30">
            <i class="fa-solid fa-credit-card"></i>
            <span>حجز ودفع</span>
          </button>
          <button onclick="openVideoModal('${course.title}', '${course.gradeName}')" class="w-full bg-[#1e0d12] hover:bg-red-950/70 border border-red-900/50 text-slate-200 font-bold py-2.5 px-3 rounded-xl text-xs transition duration-200 flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-play text-red-400"></i>
            <span>معاينة حصة</span>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// Filter Tabs
function initFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => {
        b.classList.remove("bg-red-600", "text-white");
        b.classList.add("bg-[#1a0a0f]", "text-slate-300");
      });
      btn.classList.add("bg-red-600", "text-white");
      btn.classList.remove("bg-[#1a0a0f]", "text-slate-300");
      currentFilter = btn.getAttribute("data-filter");
      renderCourses();
    });
  });
}

// Render Interactive Quiz
function renderQuizQuestion() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  const q = quizQuestions[currentQuizIndex];
  const total = quizQuestions.length;
  const currentAnswer = userAnswers[q.id];

  let optionsHtml = q.options.map((opt, idx) => {
    let classes = "quiz-option p-4 rounded-xl border border-red-950/80 bg-[#16080b]/80 text-slate-200 text-sm font-medium flex items-center justify-between";
    if (quizSubmitted) {
      if (idx === q.correctAnswer) {
        classes += " correct";
      } else if (currentAnswer === idx && idx !== q.correctAnswer) {
        classes += " incorrect";
      }
    } else if (currentAnswer === idx) {
      classes += " selected";
    }

    return `
      <div class="${classes}" onclick="selectQuizOption(${q.id}, ${idx})">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-red-950/80 border border-red-800/40 flex items-center justify-center text-xs font-bold text-red-300">
            ${['أ', 'ب', 'ج', 'د'][idx]}
          </span>
          <span>${opt}</span>
        </div>
        ${quizSubmitted && idx === q.correctAnswer ? '<i class="fa-solid fa-check text-emerald-400 text-base"></i>' : ''}
        ${quizSubmitted && currentAnswer === idx && idx !== q.correctAnswer ? '<i class="fa-solid fa-xmark text-red-400 text-base"></i>' : ''}
      </div>
    `;
  }).join("");

  let explanationHtml = "";
  if (quizSubmitted) {
    explanationHtml = `
      <div class="mt-5 p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-xs leading-relaxed text-red-200">
        <div class="font-bold text-red-300 mb-1 flex items-center gap-2">
          <i class="fa-solid fa-lightbulb text-amber-400"></i>
          <span>التفسير العلمي المعتمد لوزارة التربية والتعليم:</span>
        </div>
        ${q.explanation}
      </div>
    `;
  }

  container.innerHTML = `
    <div>
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs text-red-300 font-bold bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
          السؤال ${currentQuizIndex + 1} من ${total}
        </span>
        <div class="flex items-center gap-1">
          ${quizQuestions.map((_, i) => `
            <span class="w-2.5 h-2.5 rounded-full ${i === currentQuizIndex ? 'bg-red-500 ring-2 ring-red-400/50' : (userAnswers[quizQuestions[i].id] !== undefined ? 'bg-emerald-500' : 'bg-red-950')}"></span>
          `).join("")}
        </div>
      </div>

      <h4 class="text-base md:text-lg font-bold text-white mb-5 leading-relaxed">
        ${q.question}
      </h4>

      <div class="space-y-2.5">
        ${optionsHtml}
      </div>

      ${explanationHtml}

      <div class="flex items-center justify-between mt-6 pt-4 border-t border-red-950">
        <button onclick="prevQuizQuestion()" ${currentQuizIndex === 0 ? 'disabled' : ''} class="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-[#1c0c11] hover:bg-red-950/60 disabled:opacity-40 disabled:cursor-not-allowed transition border border-red-900/30">
          <i class="fa-solid fa-arrow-right ml-1"></i> السابق
        </button>

        ${currentQuizIndex < total - 1 ? `
          <button onclick="nextQuizQuestion()" class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition flex items-center gap-1 shadow-md shadow-red-600/30">
            <span>التالي</span>
            <i class="fa-solid fa-arrow-left mr-1"></i>
          </button>
        ` : `
          ${!quizSubmitted ? `
            <button onclick="submitQuiz()" class="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition flex items-center gap-1.5 shadow-lg shadow-red-600/40">
              <i class="fa-solid fa-flag-checkered"></i>
              <span>تسليم الاختبار وحساب النتيجة</span>
            </button>
          ` : `
            <button onclick="resetQuiz()" class="px-5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-[#1c0c11] hover:bg-red-950/60 border border-red-900/40 transition flex items-center gap-1">
              <i class="fa-solid fa-rotate-right ml-1"></i>
              <span>إعادة الاختبار</span>
            </button>
          `}
        `}
      </div>
    </div>
  `;
}

function selectQuizOption(qId, optionIdx) {
  if (quizSubmitted) return;
  userAnswers[qId] = optionIdx;
  renderQuizQuestion();
}

function nextQuizQuestion() {
  if (currentQuizIndex < quizQuestions.length - 1) {
    currentQuizIndex++;
    renderQuizQuestion();
  }
}

function prevQuizQuestion() {
  if (currentQuizIndex > 0) {
    currentQuizIndex--;
    renderQuizQuestion();
  }
}

function submitQuiz() {
  const answeredCount = Object.keys(userAnswers).length;
  if (answeredCount < quizQuestions.length) {
    if (!confirm(`لقد أجبت عن ${answeredCount} من ${quizQuestions.length} أسئلة فقط. هل تريد تسليم الامتحان الآن؟`)) {
      return;
    }
  }

  quizSubmitted = true;
  let correctCount = 0;
  quizQuestions.forEach(q => {
    if (userAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / quizQuestions.length) * 100);
  showToast(`🎉 أحسنت! درجتك هي: ${correctCount} من ${quizQuestions.length} (${percentage}%)`);
  renderQuizQuestion();

  // Show score alert banner
  const scoreBanner = document.getElementById("quiz-score-banner");
  if (scoreBanner) {
    scoreBanner.classList.remove("hidden");
    scoreBanner.innerHTML = `
      <div class="glass-panel p-4 rounded-xl border border-red-500/40 bg-red-950/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
        <div>
          <h5 class="text-red-300 font-bold text-sm">نتيجة الاختبار: ${correctCount} / ${quizQuestions.length} (${percentage}%)</h5>
          <p class="text-xs text-slate-300 mt-0.5">${percentage >= 80 ? 'مستوى عبقري! أنت جاهز للحصول على الدرجة النهائية 60/60 في الكيمياء' : 'مجهود ممتاز! راجع التفسيرات بالأسفل لتقوية نقاط ضعفك.'}</p>
        </div>
        <button onclick="goToCheckout('كورس مراجعة بنك الأسئلة الشامل', '200 ج.م')" class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shrink-0 shadow-md shadow-red-600/30">
          تفعيل باقي بنك الأسئلة الوزارية
        </button>
      </div>
    `;
  }
}

function resetQuiz() {
  userAnswers = {};
  quizSubmitted = false;
  currentQuizIndex = 0;
  const scoreBanner = document.getElementById("quiz-score-banner");
  if (scoreBanner) scoreBanner.classList.add("hidden");
  renderQuizQuestion();
  showToast("تم إعادة بدء الاختبار.");
}

// Render Flashcards
function renderElementsCards() {
  const container = document.getElementById("elements-grid");
  if (!container) return;

  container.innerHTML = elementsData.map(elem => `
    <div class="p-4 rounded-2xl bg-[#180a0e] border border-red-950/80 hover:border-red-500/50 transition group cursor-pointer" onclick="showToast('عنصر ${elem.name} (${elem.symbol}) - العدد الذري ${elem.atomicNumber}')">
      <div class="flex items-center justify-between mb-2">
        <span class="text-2xl font-black text-red-400 font-mono">${elem.symbol}</span>
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30">${elem.atomicNumber}</span>
      </div>
      <h4 class="font-bold text-white text-sm mb-1">${elem.name}</h4>
      <p class="text-slate-400 text-xs leading-relaxed line-clamp-2">${elem.note}</p>
    </div>
  `).join("");
}

// Video Preview Modal
function openVideoModal(title, grade) {
  const modal = document.getElementById("video-modal");
  const titleElem = document.getElementById("video-modal-title");
  if (titleElem) titleElem.innerText = `${title} (${grade})`;

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Contact form
function initContactForms() {
  const quickForm = document.getElementById("quick-contact-form");
  if (quickForm) {
    quickForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("quick-name")?.value;
      const phone = document.getElementById("quick-phone")?.value;
      const grade = document.getElementById("quick-grade")?.value;
      const message = `مرحبا منصة العباقرة، أنا ${name} (${phone}) - في ${grade} وأرغب في الاستفسار عن مواعيد الحصص والاشتراك في مادة الكيمياء.`;
      const url = `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      showToast("تم فتح واتساب للتواصل المباشر مع إدارة المنصة.");
    });
  }
}

// Toast notification helper
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-red-400 text-lg"></i>
    <span class="text-sm font-semibold">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Copy phone number
function copyPhoneNumber() {
  navigator.clipboard.writeText(PLATFORM_PHONE).then(() => {
    showToast(`تم نسخ رقم الهاتف: ${PLATFORM_PHONE}`);
  }).catch(() => {
    showToast(`رقم الهاتف: ${PLATFORM_PHONE}`);
  });
}

// Scrollspy for smooth navigation
function initScrollSpy() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
