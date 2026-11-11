/**
 * Al-Abaqera Chemistry Platform - Theme (Light / Dark Black) & Bilingual (AR / EN) Controller
 */
(function () {
  const THEME_KEY = 'abaqera_theme';
  const LANG_KEY = 'abaqera_lang';

  const TRANSLATIONS = {
    ar: {
      // Brand & Nav
      brand_name: 'العباقرة في الكيمياء',
      brand_sub: 'مستر أبانوب فيكتور',
      nav_home: 'الرئيسية',
      nav_stages: 'المراحل الدراسية',
      nav_courses: 'الكورسات',
      nav_videos: 'شروحات المنصة',
      nav_quiz: 'اختبر مستواك',
      nav_features: 'مميزاتنا',
      nav_pricing: 'الباقات',
      nav_reviews: 'آراء الطلاب',
      nav_contact: 'تواصل معنا',
      nav_login: 'دخول / تسجيل',
      nav_dashboard: 'لوحة الطالب',
      nav_logout: 'خروج',
      nav_subscribe: 'اشترك الآن',
      nav_back_home: 'العودة للرئيسية',
      nav_back_dash: 'العودة للوحة الطالب',
      theme_dark_label: 'الثيم الأسود',
      theme_light_label: 'الثيم الفاتح',
      lang_toggle_label: 'EN',

      // Hero
      hero_badge: 'المنصة الأقوى لتدريس الكيمياء للثانوية العامة',
      hero_title_1: 'افهم الكيمياء بعمق مع',
      hero_title_2: 'العباقرة',
      hero_teacher: 'مع مستر أبانوب فيكتور',
      hero_desc: 'نحو الدرجة النهائية في الكيمياء للمرحلة الثانوية! شرح مبسط وربط للأفكار، تدريبات مكثفة على النظام الحديث، امتحانات دورية إلكترونية، ومتابعة دقيقة لمستواك.',
      hero_cta_start: 'ابدأ رحلتك الآن',
      hero_cta_quiz: 'اختبر مستواك مجاناً',
      hero_card_badge: 'معمل التفاعلات الذكي',
      hero_card_title: 'ربط المفاهيم والمعادلات بذكاء',
      hero_card_sub: 'شرح تفاعلي يغنيك عن الحفظ ويضمن فهم كل فكرة في المنهج',
      hero_stat_students: '+15,000 طالب متفوق',
      hero_stat_hours: '+300 ساعة شرح',
      hero_stat_rating: 'تقييم 4.9 / 5',

      // Stages
      stages_badge: 'اختر صفك الدراسي',
      stages_title: 'المراحل الدراسية المتاحة',
      stages_desc: 'مناهج مصممة خصيصاً لتبسيط الكيمياء لكل صف دراسي بأحدث وسائل الشرح والتطبيق',
      stage1_badge: 'الصف الأول الثانوي',
      stage1_title: 'بناء الأساس القوي',
      stage1_desc: 'الكيمياء والقياس، النانو تكنولوجي، المول والمعادلة الكيميائية، والكيمياء الحرارية والنووية.',
      stage2_badge: 'الصف الثاني الثانوي',
      stage2_title: 'إتقان البنية والتدرج',
      stage2_desc: 'بنية الذرة، الجدول الدوري وتدرج الخواص، الروابط الكيميائية، وعناصر الفئتين s و p.',
      stage3_badge: 'الصف الثالث الثانوي',
      stage3_title: 'طريقك للدرجة النهائية',
      stage3_desc: 'العناصر الانتقالية، التحليل الكيميائي، الاتزان، الكيمياء الكهربية، والكيمياء العضوية كاملة.',
      stage_btn: 'استعرض الكورسات',

      // Courses
      courses_badge: 'أقوى الكورسات التفاعلية',
      courses_title: 'اختر الكورس المناسب لك',
      courses_desc: 'شروحات مسجلة بأعلى جودة، مذكرات PDF ملونة، وبنوك أسئلة شاملة لكل باب',
      filter_all: 'الكل',
      filter_1sec: '1 ثانوي',
      filter_2sec: '2 ثانوي',
      filter_3sec: '3 ثانوي',

      // Videos Showcase
      videos_badge: 'جولة داخل الشرح',
      videos_title: 'مقتطفات وشروحات المنصة',
      videos_desc: 'شاهد أسلوب مستر أبانوب فيكتور في تبسيط أعقد المعادلات والأفكار الكيميائية',

      // Quiz
      quiz_badge: 'تحدي الكيمياء السريع',
      quiz_title: 'اختبر مستواك الآن',
      quiz_desc: 'أسئلة منتقاة على النظام الحديث لقياس سرعة بديهتك وفهمك للمفاهيم الكيميائية',

      // Features
      features_badge: 'لماذا منصة العباقرة؟',
      features_title: 'تجربة تعليمية متكاملة تصنع الفارق',
      features_desc: 'كل الأدوات التي يحتاجها طالب الثانوية للتفوق في الكيمياء في مكان واحد',

      // Pricing
      pricing_badge: 'خطط الاشتراك المرنة',
      pricing_title: 'باقات التفوق والامتياز',
      pricing_desc: 'اختر الباقة المناسبة لك واستمتع بجميع المميزات والمتابعة المستمرة',

      // Reviews
      reviews_badge: 'قصص نجاح حقيقية',
      reviews_title: 'ماذا يقول طلاب العباقرة؟',
      reviews_desc: 'آراء طلابنا المتفوقين وتجاربهم الحقيقية في الوصول للدرجة النهائية',

      // Contact
      contact_badge: 'تواصل معنا مباشرة',
      contact_title: 'هل لديك استفسار؟ فريق الدعم معك',
      contact_desc: 'أرسل لنا استفسارك أو تواصل معنا عبر الواتساب وسنرد عليك في أسرع وقت',
      contact_name_ph: 'الاسم الكامل',
      contact_phone_ph: 'رقم الموبايل (واتساب)',
      contact_grade_1: 'الصف الأول الثانوي',
      contact_grade_2: 'الصف الثاني الثانوي',
      contact_grade_3: 'الصف الثالث الثانوي',
      contact_msg_ph: 'اكتب رسالتك أو استفسارك هنا...',
      contact_send: 'إرسال الرسالة الآن',

      // Footer
      footer_rights: '© 2026 منصة العباقرة في الكيمياء - مستر أبانوب فيكتور. جميع الحقوق محفوظة.',

      // Auth Page
      auth_subtitle: 'بوابة دخول الطلاب والمنصة التعليمية',
      auth_tab_login: 'تسجيل الدخول',
      auth_tab_register: 'حساب طالب جديد',
      auth_login_title: 'مرحباً بعودتك يا عبقري!',
      auth_login_desc: 'أدخل بريدك الإلكتروني أو رقم هاتفك مع كلمة المرور للدخول',
      auth_login_id_label: 'البريد الإلكتروني أو رقم الهاتف',
      auth_login_id_ph: 'مثال: ahmed@gmail.com أو 010...',
      auth_pass_label: 'كلمة المرور',
      auth_pass_ph: '••••••••',
      auth_login_btn: 'تسجيل الدخول للمنصة',
      auth_or_code: 'أو الدخول السريع بكود السنتر',
      auth_code_ph: 'أدخل كود السنتر (مثال: CHEM-301)',
      auth_code_btn: 'دخول',
      auth_reg_title: 'إنشاء حساب طالب جديد',
      auth_reg_desc: 'سجل بياناتك الصحيحة لتفعيل اشتراكك ومتابعة مستواك',
      auth_reg_name: 'الاسم ثلاثي أو رباعي',
      auth_reg_name_ph: 'مثال: أحمد محمد محمود',
      auth_reg_email: 'البريد الإلكتروني (أساسي للدخول)',
      auth_reg_phone: 'رقم الهاتف (يدعم الدخول أيضاً)',
      auth_reg_parent: 'رقم هاتف ولي الأمر',
      auth_reg_gov: 'المحافظة',
      auth_reg_grade: 'الصف الدراسي',
      auth_reg_pass: 'كلمة المرور',
      auth_reg_btn: 'إنشاء الحساب والدخول للمنصة',

      // Dashboard Page
      dash_panel_label: 'لوحة الطالب التعليمية',
      dash_verified: 'حساب مفعل ومؤكد',
      dash_welcome: 'أهلاً بك يا عبقري،',
      dash_ready: 'جاهز للوصول للدرجة النهائية اليوم؟',
      dash_stat_lessons: 'الدروس المكتملة',
      dash_stat_avg: 'متوسط الدرجات',
      dash_stat_rank: 'ترتيبك على الدفعة',
      dash_stat_courses: 'الكورسات المفعلة',
      dash_my_courses: 'كورساتي المشترك بها',
      dash_browse_all: 'تصفح جميع الكورسات',
      dash_exams_title: 'سجل نتائج الامتحانات الإلكترونية',
      dash_zoom_badge: 'البث المباشر التفاعلي (Zoom)',
      dash_zoom_title: 'مراجعة وحل أسئلة شاملة لايف',
      dash_zoom_desc: 'انضم لحصة المراجعة الأسبوعية مع مستر أبانوب لمناقشة أصعب أفكار الامتحانات.',
      dash_zoom_btn: 'دخول غرفة اللايف الآن',
      dash_activation_title: 'تفعيل كود أو باقة جديدة',
      dash_activation_desc: 'لديك كود تفعيل من السنتر؟ أدخله هنا لفتح الكورس فوراً',
      dash_activation_ph: 'أدخل كود التفعيل هنا...',
      dash_activation_btn: 'تفعيل الكود',
      dash_support_title: 'الدعم الفني والعلمي',
      dash_support_desc: 'واجهت مشكلة أو لديك سؤال في المنهج؟ تواصل مباشرة عبر الواتساب',
      dash_support_btn: 'تواصل عبر واتساب',
      dash_video_lessons_title: 'محتوى ودروس الكورس',

      // Checkout Page
      chk_title: 'إتمام الاشتراك وتفعيل الكورس',
      chk_subtitle: 'خطوات بسيطة وتبدأ رحلتك نحو الدرجة النهائية',
      chk_selected_course: 'الكورس المختار',
      chk_summary: 'ملخص الطلب',
      chk_total: 'الإجمالي المطلوب',
      chk_method_title: 'اختر طريقة الدفع المناسبة',
      chk_confirm_btn: 'تأكيد وإرسال طلب التفعيل'
    },
    en: {
      // Brand & Nav
      brand_name: 'Al-Abaqera Chemistry',
      brand_sub: 'Mr. Abanoub Victor',
      nav_home: 'Home',
      nav_stages: 'Grades',
      nav_courses: 'Courses',
      nav_videos: 'Lectures',
      nav_quiz: 'Quick Quiz',
      nav_features: 'Features',
      nav_pricing: 'Plans',
      nav_reviews: 'Reviews',
      nav_contact: 'Contact',
      nav_login: 'Login / Sign Up',
      nav_dashboard: 'Student Portal',
      nav_logout: 'Logout',
      nav_subscribe: 'Enroll Now',
      nav_back_home: 'Back to Home',
      nav_back_dash: 'Back to Portal',
      theme_dark_label: 'Black Theme',
      theme_light_label: 'Light Theme',
      lang_toggle_label: 'عربي',

      // Hero
      hero_badge: 'Top High School Chemistry Learning Platform',
      hero_title_1: 'Master Chemistry Deeply with',
      hero_title_2: 'Al-Abaqera',
      hero_teacher: 'With Mr. Abanoub Victor',
      hero_desc: 'Your path to a full score in high school chemistry! Clear conceptual explanations, modern-system intensive drills, online quizzes, and close progress tracking.',
      hero_cta_start: 'Start Your Journey',
      hero_cta_quiz: 'Test Your Level Free',
      hero_card_badge: 'Smart Reaction Lab',
      hero_card_title: 'Connect Concepts & Equations Smartly',
      hero_card_sub: 'Interactive teaching that replaces rote memorization with real understanding',
      hero_stat_students: '+15,000 Top Students',
      hero_stat_hours: '+300 Lecture Hours',
      hero_stat_rating: 'Rated 4.9 / 5',

      // Stages
      stages_badge: 'Choose Your Grade',
      stages_title: 'Available Academic Grades',
      stages_desc: 'Structured curricula designed to simplify chemistry for every high school year',
      stage1_badge: '1st Secondary',
      stage1_title: 'Build a Strong Foundation',
      stage1_desc: 'Chemistry & measurement, nanotechnology, mole calculations, thermochemistry & nuclear chemistry.',
      stage2_badge: '2nd Secondary',
      stage2_title: 'Master Structure & Periodicity',
      stage2_desc: 'Atomic structure, periodic table trends, chemical bonding, and s & p block elements.',
      stage3_badge: '3rd Secondary (Thanawya)',
      stage3_title: 'Your Path to 60/60',
      stage3_desc: 'Transition elements, chemical analysis, equilibrium, electrochemistry & complete organic chemistry.',
      stage_btn: 'Browse Courses',

      // Courses
      courses_badge: 'Top Interactive Courses',
      courses_title: 'Choose the Right Course for You',
      courses_desc: 'HD recorded lectures, illustrated PDF notes, and comprehensive question banks for every chapter',
      filter_all: 'All',
      filter_1sec: '1st Sec',
      filter_2sec: '2nd Sec',
      filter_3sec: '3rd Sec',

      // Videos Showcase
      videos_badge: 'Inside the Lectures',
      videos_title: 'Featured Platform Explanations',
      videos_desc: 'Watch how Mr. Abanoub Victor simplifies complex chemical equations and exam ideas',

      // Quiz
      quiz_badge: 'Quick Chemistry Challenge',
      quiz_title: 'Test Your Level Now',
      quiz_desc: 'Carefully curated modern-exam questions to measure your conceptual speed and accuracy',

      // Features
      features_badge: 'Why Al-Abaqera?',
      features_title: 'A Complete Learning Experience',
      features_desc: 'Every tool a high school student needs to excel in chemistry in one place',

      // Pricing
      pricing_badge: 'Flexible Subscription Plans',
      pricing_title: 'Excellence Packages',
      pricing_desc: 'Pick the plan that fits your study goals with continuous follow-up and support',

      // Reviews
      reviews_badge: 'Real Success Stories',
      reviews_title: 'What Our Students Say',
      reviews_desc: 'Authentic reviews from top achievers who reached full marks with us',

      // Contact
      contact_badge: 'Direct Support',
      contact_title: 'Have a Question? We Are Here',
      contact_desc: 'Send us your inquiry or reach out via WhatsApp and we will respond quickly',
      contact_name_ph: 'Full Name',
      contact_phone_ph: 'Mobile Number (WhatsApp)',
      contact_grade_1: '1st Secondary',
      contact_grade_2: '2nd Secondary',
      contact_grade_3: '3rd Secondary',
      contact_msg_ph: 'Write your message or question here...',
      contact_send: 'Send Message Now',

      // Footer
      footer_rights: '© 2026 Al-Abaqera Chemistry Platform - Mr. Abanoub Victor. All rights reserved.',

      // Auth Page
      auth_subtitle: 'Student Portal & Learning Access',
      auth_tab_login: 'Sign In',
      auth_tab_register: 'New Account',
      auth_login_title: 'Welcome Back, Genius!',
      auth_login_desc: 'Enter your email or phone number with your password to sign in',
      auth_login_id_label: 'Email Address or Phone Number',
      auth_login_id_ph: 'e.g. ahmed@gmail.com or 010...',
      auth_pass_label: 'Password',
      auth_pass_ph: '••••••••',
      auth_login_btn: 'Sign In to Platform',
      auth_or_code: 'Or quick login with Center Code',
      auth_code_ph: 'Enter Center Code (e.g. CHEM-301)',
      auth_code_btn: 'Enter',
      auth_reg_title: 'Create a New Student Account',
      auth_reg_desc: 'Enter accurate details to activate your subscription and track your progress',
      auth_reg_name: 'Full Name',
      auth_reg_name_ph: 'e.g. Ahmed Mohamed Mahmoud',
      auth_reg_email: 'Email Address (Primary Login)',
      auth_reg_phone: 'Phone Number (Also supported for login)',
      auth_reg_parent: 'Parent Phone Number',
      auth_reg_gov: 'Governorate',
      auth_reg_grade: 'Academic Grade',
      auth_reg_pass: 'Password',
      auth_reg_btn: 'Create Account & Enter Platform',

      // Dashboard Page
      dash_panel_label: 'Student Learning Portal',
      dash_verified: 'Verified Active Account',
      dash_welcome: 'Welcome back, Genius,',
      dash_ready: 'Ready to conquer Chemistry today?',
      dash_stat_lessons: 'Completed Lessons',
      dash_stat_avg: 'Average Score',
      dash_stat_rank: 'Batch Rank',
      dash_stat_courses: 'Active Courses',
      dash_my_courses: 'My Enrolled Courses',
      dash_browse_all: 'Browse All Courses',
      dash_exams_title: 'Online Exam Results History',
      dash_zoom_badge: 'Interactive Live Session (Zoom)',
      dash_zoom_title: 'Weekly Live Q&A & Revision',
      dash_zoom_desc: 'Join the weekly live class with Mr. Abanoub to tackle the toughest exam problems.',
      dash_zoom_btn: 'Join Live Room Now',
      dash_activation_title: 'Activate New Code or Plan',
      dash_activation_desc: 'Have a center activation code? Enter it here to unlock instantly',
      dash_activation_ph: 'Enter activation code...',
      dash_activation_btn: 'Activate Code',
      dash_support_title: 'Technical & Academic Support',
      dash_support_desc: 'Need help or have a curriculum question? Contact us directly on WhatsApp',
      dash_support_btn: 'Chat on WhatsApp',
      dash_video_lessons_title: 'Course Lectures & Content',

      // Checkout Page
      chk_title: 'Complete Subscription & Activation',
      chk_subtitle: 'A few simple steps to start your path to excellence',
      chk_selected_course: 'Selected Course',
      chk_summary: 'Order Summary',
      chk_total: 'Total Amount',
      chk_method_title: 'Choose Your Payment Method',
      chk_confirm_btn: 'Confirm & Submit Request'
    }
  };

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    } catch (_) {
      return 'light';
    }
  }

  function getSavedLang() {
    try {
      return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'ar';
    } catch (_) {
      return 'ar';
    }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-theme');
      if (document.body) document.body.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
      if (document.body) document.body.classList.remove('dark-theme');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
    updateToggleButtons();
  }

  function applyLanguage(lang) {
    const cleanLang = lang === 'en' ? 'en' : 'ar';
    const root = document.documentElement;
    root.lang = cleanLang;
    root.dir = cleanLang === 'en' ? 'ltr' : 'rtl';
    try {
      localStorage.setItem(LANG_KEY, cleanLang);
    } catch (_) {}

    const dict = TRANSLATIONS[cleanLang] || TRANSLATIONS.ar;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    updateToggleButtons();
    if (typeof window.onLanguageChange === 'function') {
      try {
        window.onLanguageChange(cleanLang);
      } catch (e) {
        console.warn('onLanguageChange error:', e);
      }
    }
  }

  function updateToggleButtons() {
    const theme = getSavedTheme();
    const lang = getSavedLang();
    const isDark = theme === 'dark';

    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const iconEl = btn.querySelector('.theme-icon');
      const labelEl = btn.querySelector('.theme-label');
      if (iconEl) {
        iconEl.innerHTML = isDark
          ? '<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
          : '<svg class="w-4 h-4 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
      }
      if (labelEl) {
        labelEl.textContent = isDark
          ? (lang === 'en' ? 'Light' : 'فاتح')
          : (lang === 'en' ? 'Black' : 'أسود');
      }
      btn.setAttribute('title', isDark
        ? (lang === 'en' ? 'Switch to Light White Theme' : 'التبديل للثيم الفاتح')
        : (lang === 'en' ? 'Switch to Black Theme' : 'التبديل للثيم الأسود'));
    });

    document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
      const span = btn.querySelector('.lang-label') || btn;
      span.textContent = lang === 'en' ? 'AR' : 'EN';
      btn.setAttribute('title', lang === 'en' ? 'التبديل للعربية' : 'Switch to English');
    });
  }

  function toggleTheme() {
    const next = getSavedTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    return next;
  }

  function toggleLanguage() {
    const next = getSavedLang() === 'en' ? 'ar' : 'en';
    applyLanguage(next);
    return next;
  }

  function t(key, fallback) {
    const lang = getSavedLang();
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS.ar && TRANSLATIONS.ar[key]) || fallback || key;
  }

  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-up, section');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => observer.observe(el));
  }

  // Apply immediately to <html> before paint to avoid FOUC
  applyTheme(getSavedTheme());
  document.documentElement.lang = getSavedLang();
  document.documentElement.dir = getSavedLang() === 'en' ? 'ltr' : 'rtl';

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getSavedTheme());
    applyLanguage(getSavedLang());
    initScrollReveal();
  });

  window.ThemeLang = {
    getTheme: getSavedTheme,
    getLang: getSavedLang,
    applyTheme,
    applyLanguage,
    toggleTheme,
    toggleLanguage,
    updateToggleButtons,
    t
  };
  window.toggleTheme = toggleTheme;
  window.toggleLanguage = toggleLanguage;
  window.getLang = getSavedLang;
  window.t = t;
})();
