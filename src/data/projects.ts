import { Project, StudioInfo } from '../types';

export const studioInfo: StudioInfo = {
  name: "CHAJ Group",

  taglineEn:
    "An architectural practice dedicated to the exploration of space, light, and materiality.",

  taglineFa:
    "گروه معماری چاج؛ پژوهش و کاوش در ماهیت فضا، نور و ماده.",

  aboutEn:
    "Chaj Architecture Group was founded in 2016 in Babolsar, Iran, by brothers Sadegh Laghaei Firouzjaei and Valiollah Laghaei Firouzjaei, with a focus on architectural design, project development, and construction. At Chaj, we see architecture as a process of discovering and creating new qualities in space. Our approach begins with understanding the context, needs, and underlying ideas of each project, and continues through architectural and interior design, detailing, 3D modeling, architectural visualization, and ultimately, project execution. We seek to establish a meaningful relationship between concept, function, form, light, material, and context in every project. The result is not simply a building, but a space shaped around people, place, and the way they live. For us, every project is an opportunity to redefine the relationship between people and space, from the initial idea to the final architectural experience.",

  aboutFa:
    "گروه معماری چاج در سال ۱۳۹۵ در شهر بابلسر، توسط برادران صادق لاغری فیروزجایی و ولی‌الله لاغری فیروزجایی تأسیس شد و فعالیت خود را با تمرکز بر طراحی، توسعه و اجرای پروژه‌های معماری آغاز کرد. در چاج، معماری فرآیندی برای کشف و خلق کیفیت‌های تازه در فضاست؛ فرآیندی که از شناخت بستر، نیازها و ایده آغاز می‌شود و تا طراحی معماری و داخلی، توسعه جزئیات، مدل‌سازی و شبیه‌سازی سه‌بعدی و در نهایت اجرای پروژه ادامه پیدا می‌کند. ما تلاش می‌کنیم در هر پروژه، میان ایده، عملکرد، فرم، نور، متریال و زمینه، ارتباطی معنادار ایجاد کنیم؛ تا نتیجه تنها یک بنا نباشد، بلکه فضایی متناسب با انسان، بستر و شیوه زندگی شکل بگیرد. برای ما، هر پروژه فرصتی است برای بازتعریف رابطه میان انسان و فضا؛ از نخستین ایده تا تجربه نهایی معماری.",

  principals: [
    {
      name: "Valiallah lagharei firozjaei",
      role: "Bachelor of Architecture",
      roleFa: "کارشناسی معماری",
      bioEn:
        "Specialist in architectural design and administrative protocols",
      bioFa:
        "متخصص طراحی معماری و فرآیندهای اجرایی و اداری",
      image: "/images/vali.png"
    },

    {
      name: "Sadegh lagharei firozjaei",
      role: "Bachelor of Architecture",
      roleFa: "کارشناسی معماری",
      bioEn:
        "Specialist in architectural design and executive details",
      bioFa:
        "متخصص در طراحی معماری و دیتیل های اجرایی",
      image: "/images/sadegh.png"
    },

    {
      name: "Hossein Mohseni",
      role: "CG Artist & BIM Modeler",
      roleFa: "متخصص سی‌جی آرت و بیم مدلینگ",
      bioEn:
        "Specialist in 3D visualization, CG rendering, and BIM modeling.",
      bioFa:
        "متخصص در بصری‌سازی سه‌بعدی، رندرینگ سی‌جی و مدل‌سازی بیم.",
      image: "/images/hossein.png"
    }
  ],

  services: [
    {
      id: "arch",
      titleEn: "Architectural Design",
      titleFa: "طراحی معماری",
      descEn:
        "Comprehensive conceptual and detailed architectural development for residential, cultural, and public spaces.",
      descFa:
        "توسعه کامل مفهومی و اجرایی معماری برای فضاهای مسکونی، فرهنگی و عمومی.",
      iconName: "Building2"
    },

    {
      id: "interior",
      titleEn: "Interior Architecture",
      titleFa: "معماری داخلی",
      descEn:
        "Custom materiality, bespoke furniture design, and spatial choreography tailored to human experience.",
      descFa:
        "متریال‌شناسی اختصاصی، طراحی مبلمان سفارشی و چیدمان فضایی منطبق بر تجربه انسانی.",
      iconName: "Compass"
    },

    {
      id: "research",
      titleEn: "Climatic & Material Research",
      titleFa: "پژوهش اقلیمی و متریال",
      descEn:
        "In-depth thermal analysis, traditional masonry reinvention, and low-carbon tectonic solutions.",
      descFa:
        "تحلیل حرارتی عمیق، بازآفرینی بنایی سنتی و راهکارهای تکتونیکی کم‌کربن.",
      iconName: "Maximize2"
    },

    {
      id: "master",
      titleEn: "Masterplanning",
      titleFa: "طراحی شهری و مسترپلن",
      descEn:
        "Contextual urban integration, landscape continuity, and ecological site strategies.",
      descFa:
        "یکپارچه‌سازی زمینه‌ای شهری، تداوم چشم‌انداز و راهبردهای بوم‌شناختی سایت.",
      iconName: "Layers"
    }
  ],

  offices: [
    {
      cityEn: "Babolsar Studio",
      cityFa: "دفتر بابلسر",
      addressEn:
        "No. 47, Royal Mall Complex, Fereydounkenar to Babolsar road, Mazandaran, Iran",
      addressFa:
        "مازندران، جاده فریدونکنار به بابلسر مجتمع رویال مال ، پلاک 47",
      phone: "+98 9001112478",
      email: "sadeghlagharei@gmail.com",
      latitude: 36.692692425588945,
      longitude: 52.59098739143947
    }
  ]
};


export const projects: Project[] = [

  // ============================================================
  // SHIRVANI VILLA
  // ============================================================

  {
    id: "SHIRVANI VILLA",

    title: "Shirvani Villa",
    titleFa: "ویلای شیروانی",

    subtitle: "A villa for spending your old age",
    subtitleFa: "ویلایی برای گذراندن دوران پیری",

    category: "Residential",

    year: "2023",

    location: "Mazandaran, Iran",
    locationFa: "مازندران، ایران",

    status: "Completed",
    statusFa: "تکمیل شده",

    area: "130 m²",
    areaFa: "130 مترمربع",

    architects:
      "Valiollah Laghaei Firouzjaei & Sadegh Laghaei Firouzjaei",

    architectsFa:
      "ولی اله لاغری فیروزجائی و صادق لاغری فیروزجائی",

    presenter: "Hossein Mohseni",
    presenterFa: "حسین محسنی",

    software: "3ds Max, Revit",

    heroImage: "/images/shirvani-render-sterit.jpg",

    heroImages: [
      "/images/shirvani-north-frount.jpg",
      "/images/shirvani-render03.png",
      "/images/shirvani-render04.jpg",
      "/images/shirvani-render05.jpg"
    ],

    narrativeEn:
      "\u201cShirvani\u201d is a reflection of living in harmony with the climate of Mazandaran, where architecture, nature, and rain become part of everyday life.",

    narrativeFa:
      "«شیروانی» روایتی از زندگی در پیوند با اقلیم مازندران است؛ جایی که معماری، طبیعت و باران را به بخشی از تجربه‌ی روزمره تبدیل می‌کند.",

    lightSectionTitleEn:
      "Architecture for Every Season of Life",

    lightSectionTitleFa:
      "معماری برای تمام فصل‌های زندگی",

    lightNarrativeEn:
      "A home designed for comfort, independence, and quality of life through every stage.",

    lightNarrativeFa:
      "خانه‌ای طراحی‌شده برای آرامش، استقلال و کیفیت زندگی در تمام مراحل عمر.",

    lightImage:
      "/images/shirvani-old-woman.jpg",

    spatialSectionTitleEn:
      "Architecture for Every Season of Life",

    spatialSectionTitleFa:
      "معماری برای تمام فصل‌های زندگی",

    spatialNarrativeEn:
      "A home designed for comfort, independence, and quality of life through every stage.",

    spatialNarrativeFa:
      "خانه‌ای طراحی‌شده برای آرامش، استقلال و کیفیت زندگی در تمام مراحل عمر.",


    // ==========================================================
    // DETAILS
    // ==========================================================

    details: [

      {
        id: "sv-d1",

        title:
          "Window to gutter connection details",

        titleFa:
          "جزئیات اتصال پنجره به گاتر",

        caption:
          "Where Details Shape the Quality of Living",

        captionFa:
          "جایی که جزئیات، کیفیت زندگی را شکل می‌دهند",

        imageUrl:
          "/images/shirvani-d1-render01.jpg",

        aspectRatio:
          "square",

        galleryImages: [
          "/images/shirvani-d1-render02.jpg",
          "/images/shirvani-d1-details01.jpg",
          "/images/shirvani-d1-details02.jpg",
          "/images/shirvani-d1-details03.jpg"
        ]
      },


      {
        id: "sv-d2",

        title:
          "Door and parking lot implementation details",

        titleFa:
          "جزئیات اجرایی درب و پارکینگ",

        caption:
          "The pitched roof edge is detailed to shed heavy seasonal rainfall away from the walls.",

        captionFa:
          "لبه سقف شیبدار به‌گونه‌ای طراحی شده که بارش‌های سنگین فصلی را از دیوارها دور کند.",

        imageUrl:
          "/images/shirvani-render-sterit.jpg",

        aspectRatio:
          "video",

        galleryImages: [
          "/images/shirvani-d2-render01.jpg",
          "/images/shirvani-d2-details01.jpg",
          "/images/shirvani-d2-details02.jpg",
          "/images/shirvani-d2-details03.jpg",
          "/images/shirvani-d2-details04.jpg",
          "/images/shirvani-d2-details05.jpg"
        ]
      },


      {
        id: "sv-d3",

        title:
          "Timber Window Frame Junction",

        titleFa:
          "جزئیات اتصال قاب چوبی پنجره",

        caption:
          "A weathered timber frame meets the rammed-earth wall through a recessed shadow gap.",

        captionFa:
          "قاب چوبی هوازده از طریق یک شکاف سایه فرورفته به دیوار خاک کوبیده متصل می‌شود.",

        imageUrl:
          "/images/shirvani-detail-03.jpg",

        aspectRatio:
          "square",

        galleryImages: [
          "/images/shirvani-detail-03a.jpg",
          "/images/shirvani-detail-03b.jpg"
        ]
      }

    ],


    // ==========================================================
    // DRAWINGS
    // ==========================================================

    drawings: [

      {
        id: "sv-plan-ground",

        title:
          "GROUND FLOOR PLAN",

        titleFa:
          "پلان طبقه همکف",

        type:
          "Plan",

        imageUrl:
          "/images/shirvani-ground-floor-plan.jpg",

        hotspots: [

          {
            id: "sv-h1",

            x: 40,
            y: 55,

            label:
              "Covered Veranda",

            labelFa:
              "ایوان سرپوشیده",

            description:
              "A sheltered transitional zone connecting the interior to the garden under the roof overhang.",

            descriptionFa:
              "فضای واسط سرپوشیده که فضای داخلی را زیر سایه‌بان سقف به باغ متصل می‌کند."
          },


          {
            id: "sv-h2",

            x: 60,
            y: 35,

            label:
              "Living & Dining",

            labelFa:
              "نشیمن و پذیرایی",

            description:
              "Open-plan gathering space oriented toward the southern garden light.",

            descriptionFa:
              "فضای باز جمع‌خانه رو به نور جنوبی باغ."
          }

        ]
      },


      {
        id: "sv-elevation-north",

        title:
          "NORTH ELEVATION",

        titleFa:
          "نمای شمالی",

        type:
          "Elevation",

        imageUrl:
          "/images/shirvani-north-view.jpg"
      },


      {
        id: "sv-elevation-south",

        title:
          "SOUTH ELEVATION",

        titleFa:
          "نمای جنوبی",

        type:
          "Elevation",

        imageUrl:
          "/images/shirvani-south-elevation.jpg"
      },


      {
        id: "sv-section-aa",

        title:
          "SECTION A-A",

        titleFa:
          "مقطع A-A",

        type:
          "Section",

        imageUrl:
          "/images/shirvani-sectionA-A.jpg",

        hotspots: [

          {
            id: "sv-hs1",

            x: 50,
            y: 25,

            label:
              "Pitched Roof Cavity",

            labelFa:
              "فضای زیرشیروانی",

            description:
              "Ventilated roof cavity that buffers the interior from seasonal temperature swings.",

            descriptionFa:
              "فضای تهویه‌شده زیر شیروانی که فضای داخلی را از نوسانات دمایی فصلی محافظت می‌کند."
          }

        ]
      }

    ],


    // ==========================================================
    // EXECUTION PHASE
    // ==========================================================

    executionSectionTitleEn:
      "Execution Phase",

    executionSectionTitleFa:
      "مراحل اجرا",

    executionNarrativeEn:
      "A look at the construction process from start to completion.",

    executionNarrativeFa:
      "نگاهی به روند اجرای پروژه از ابتدا تا تکمیل.",


    executionPhotos: [

      // --------------------------------------------------------
      // STEP 01 - FOUNDATION
      // --------------------------------------------------------

      {
        id: "sv-exec1",

        title:
          "Foundation",

        titleFa:
          "فونداسیون",

        caption:
          "The first stage of foundation implementation",

        captionFa:
          "مرحله اول اجرای فونداسیون",

        imageUrl:
          "/images/shirvani-EX-01.jpg",

        type:
          "image",

        galleryImages: [
          "/images/shirvani-EX-foundation-01.jpg",
          "/images/shirvani-EX-foundation-02.jpg",
          "/images/shirvani-EX-foundation-03.jpg",
          "/images/shirvani-EX-foundation-04.jpg"
        ]
      },


      // --------------------------------------------------------
      // STEP 02 - BEAMS & COLUMNS
      // --------------------------------------------------------

      {
        id: "sv-exec2",

        title:
          "Beams and Columns",

        titleFa:
          "تیر و ستون",

        caption:
          "The second stage of implementing beams and columns",

        captionFa:
          "مرحله دوم اجرای تیر و ستون",

        imageUrl:
          "/images/shirvani-EX-02.jpg",

        type:
          "image",

        galleryImages: [
          "/images/shirvani-EX-02-02.jpg",
          "/images/shirvani-EX-02-03.jpg",
          "/images/shirvani-EX-02-04.jpg",
          "/images/shirvani-EX-02-05.jpg"
        ]
      },


      // --------------------------------------------------------
      // STEP 03 - GABLE ROOF STRUCTURE
      // --------------------------------------------------------

      {
        id: "sv-exec3",

        title:
          "Gable Roof",

        titleFa:
          "سقف شیروانی",

        caption:
          "Implementation of metal beams for the gable roof",

        captionFa:
          "اجرای تیر فلزی سقف شیروانی",

        imageUrl:
          "/images/shirvani-EX-03.jpg",

        type:
          "image",

        galleryImages: [
          "/images/shirvani-EX-fram-roof-01.JPG",
          "/images/shirvani-EX-fram-roof-02.JPG",
          "/images/shirvani-EX-fram-roof-03.JPG",
          "/images/shirvani-EX-fram-roof-04.JPG"
        ]
      },


      // --------------------------------------------------------
      // STEP 04 - WALL CONSTRUCTION
      // --------------------------------------------------------

      {
        id: "sv-exec4",

        title:
          "Wall Construction",

        titleFa:
          "اجرای دیوار",

        caption:
          "The walls were constructed using clay blocks.",

        captionFa:
          "اجرای دیوار چینی و سیمانکاری",

        imageUrl:
          "/images/shirvani-EX-04.jpg",

        type:
          "image",

        galleryImages: [
          "/images/shirvani-EX-wall construction-01.jpg",
          "/images/shirvani-EX-04-03.jpg",
          "/images/shirvani-EX-04-04.jpg",
          "/images/shirvani-EX-04-05.jpg"
        ]
      },


      // --------------------------------------------------------
      // STEP 05 - ROOF COVERING
      // --------------------------------------------------------

      {
        id: "sv-exec5",

        title:
          "Gable Roof Covering",

        titleFa:
          "پوشش سقف شیروانی",

        caption:
          "Installation of the Pitched Roof Covering",

        captionFa:
          "اجرای پوشش سقف شیروانی",

        imageUrl:
          "/images/shirvani-EX-05.jpg",

        type:
          "image",

        galleryImages: [
          "/images/shirvani-EX-05-02.jpg",
          "/images/shirvani-EX-05-03.jpg",
          "/images/shirvani-EX-05-04.jpg",
          "/images/shirvani-EX-05-05.jpg"
        ]
      },


      // --------------------------------------------------------
      // STEP 06 - FACADE FINISHING
      // --------------------------------------------------------

      {
        id: "sv-exec6",

        title:
          "Facade Finishing",

        titleFa:
          "اجرای نهایی نما",

        caption:
          "Final facade and finishing works on site.",

        captionFa:
          "مرحله نهایی اجرای نما و کارهای تکمیلی.",

        imageUrl:
          "/images/shirvani-exec-03.jpg",

        type:
          "image",

        galleryImages: [
          "/images/shirvani-exec-03-02.jpg",
          "/images/shirvani-exec-03-03.jpg",
          "/images/shirvani-exec-03-04.jpg",
          "/images/shirvani-exec-03-05.jpg"
        ]
      }

    ],


    prevProjectId:
      "Mousavinejad MDF Trading",

    nextProjectId:
      "Mousavinejad MDF Trading"
  },


  // ============================================================
  // MOUSAVINEJAD MDF TRADING
  // ============================================================

  {
    id:
      "Mousavinejad MDF Trading",

    title:
      "Mousavinejad MDF Trading",

    titleFa:
      "بازرگانی ام دی اف موسوی نژاد",

    subtitle:
      "Commercial project",

    subtitleFa:
      "پروژه تجاری",

    category:
      "Commercial",

    year:
      "2023",

    location:
      "Mazandaran, Iran",

    locationFa:
      "مازندران، ایران",

    status:
      "Running",

    statusFa:
      "در حال اجرا",

    area:
      "500 m²",

    areaFa:
      "500 مترمربع",

    architects:
      "Valiollah Laghaei Firouzjaei & Sadegh Laghaei Firouzjaei",

    architectsFa:
      "ولی اله لاغری فیروزجائی و صادق لاغری فیروزجائی",

    presenter:
      "Hossein Mohseni",

    presenterFa:
      "حسین محسنی",

    software:
      "Revit, 3ds Max",

    heroImage:
      "/images/12.jpg",

    heroImages: [
      "/images/12.jpg",
      "/images/west-view-01.jpg",
      "/images/west-view-02.jpg"
    ],

    narrativeEn:
      "Designed for an MDF showroom, the façade draws inspiration from the vertical rhythm of stacked MDF panels, translating the essence of the product into an architectural expression.",

    narrativeFa:
      "ریتم لوورهای عمودی نما، برداشتی انتزاعی از چیدمان منظم ورق‌های MDF است؛ عنصری که به نمای ساختمان نظم، عمق و هویت می‌بخشد.",

    lightSectionTitleEn:
      "Visual Identity",

    lightSectionTitleFa:
      "هویت بصری",

    lightNarrativeEn:
      "Commercial MDF Showroom in Mazandaran; a contemporary architectural design emphasizing visual identity and the customer's spatial experience.",

    lightNarrativeFa:
      "پروژه تجاری فروشگاه MDF در مازندران؛ تجلی معماری مدرن با تأکید بر هویت بصری و تجربه فضایی مشتری.",

    lightImage:
      "/images/west-view-01.jpg",

    spatialSectionTitleEn:
      "Spatial Logic",

    spatialSectionTitleFa:
      "منطق فضایی",

    spatialNarrativeEn:
      "The plan is organized around a series of sequential voids, ensuring that every living space maintains a visual connection to the sky and the internal garden while providing absolute privacy from the street.",

    spatialNarrativeFa:
      "پلان پروژه بر حول سلسله‌مراتبی از فضاهای خالی ترتیب یافته است، به‌گونه‌ای که هر فضای زندگی ارتباط چشمی مداومی با آسمان و حیاط داخلی داشته باشد و در عین حال محرمیت مطلق را در برابر خیابان حفظ کند.",


    // ==========================================================
    // DETAILS
    // ==========================================================

    details: [

      {
        id:
          "d1",

        title:
          "Details of the implementation of the complex door",

        titleFa:
          "جزئیات: تلاقی متریال‌ها",

        caption:
          "The scratched stone is integrated with the microcement of the door.",

        captionFa:
          "سنگ اسکرچ شده با میکروسمنت درب یکی شده.",

        imageUrl:
          "/images/d1-render.jpg",

        aspectRatio:
          "square",

        galleryImages: [
          "/images/d1-details01.jpg",
          "/images/d1-details02.jpg",
          "/images/d1-image01.jpg",
          "/images/d1-image02.jpg",
          "/images/d1-image03.jpg"
        ]
      },


      {
        id:
          "d2",

        title:
          "A Distinctive Entrance, Defining Identity",

        titleFa:
          "ورودی شاخص، هویت متمایز مجموعه",

        caption:
          "The intersection of function, form and identity",

        captionFa:
          "تلاقی عملکرد، فرم و هویت",

        imageUrl:
          "/images/west-view-02.jpg",

        aspectRatio:
          "video",

        galleryImages: [
          "/images/d2-details01.jpg",
          "/images/d2-details02.jpg",
          "/images/d2-image01.jpg"
        ]
      }

    ],


    // ==========================================================
    // DRAWINGS
    // ==========================================================

    drawings: [

      {
        id:
          "plan-ground",

        title:
          "GROUND FLOOR PLAN",

        titleFa:
          "پلان طبقه همکف",

        type:
          "Plan",

        imageUrl:
          "/images/ground-floor-plan.jpg",

        hotspots: [

          {
            id:
              "h1",

            x: 35,
            y: 50,

            label:
              "Central Courtyard & Pool",

            labelFa:
              "حیاط مرکزی و حوض",

            description:
              "Microclimate thermal regulator providing convective cooling during hot afternoon hours.",

            descriptionFa:
              "تنظیم‌کننده میکروکلیما و خنک‌سازی خاستگاهی در ساعات گرم بعدازظهر."
          },


          {
            id:
              "h2",

            x: 65,
            y: 40,

            label:
              "Living Pavilion",

            labelFa:
              "تالار اصلی نشیمن",

            description:
              "Double-height space framed by monolithic concrete walls and floor-to-ceiling acoustic glass.",

            descriptionFa:
              "فضای با ارتفاع مضاعف قاب‌شده با دیوارهای بتنی و شیشه‌های آکوستیک."
          },


          {
            id:
              "h3",

            x: 20,
            y: 70,

            label:
              "Private Suite Entry",

            labelFa:
              "ورودی بخش خصوصی",

            description:
              "A recessed transitional threshold maintaining absolute privacy from communal areas.",

            descriptionFa:
              "آستانه گذار برای حفظ محرمیت کامل نسبت به فضاهای عمومی."
          }

        ]
      },


      {
        id:
          "plan-first-floor",

        title:
          "FIRST FLOOR PLAN",

        titleFa:
          "پلان طبقه اول",

        type:
          "Plan",

        imageUrl:
          "/images/first-floor-plan.jpg"
      },


      {
        id:
          "section-aa",

        title:
          "SECTION AA",

        titleFa:
          "مقطع عرضی AA",

        type:
          "Section",

        imageUrl:
          "/images/sectionA-A.jpg",

        hotspots: [

          {
            id:
              "hs1",

            x: 50,
            y: 30,

            label:
              "Light Shaft Chamber",

            labelFa:
              "نورگیر و هواکش سقفی",

            description:
              "Directs natural zenith light deep into subterranean study quarters.",

            descriptionFa:
              "هدایت مستقیم نور مستقیم آسمان به فضاهای مطالعه زیرزمین."
          }

        ]
      }

    ],


    // ==========================================================
    // EXECUTION PHASE
    // ==========================================================

    executionSectionTitleEn:
      "Execution Phase",

    executionSectionTitleFa:
      "مراحل اجرا",

    executionNarrativeEn:
      "A look at the construction process from start to completion.",

    executionNarrativeFa:
      "نگاهی به روند اجرای پروژه از ابتدا تا تکمیل.",


    executionPhotos: [

      // --------------------------------------------------------
      // STEP 01
      // --------------------------------------------------------

      {
        id:
          "exec1",

        title:
          "Construction Progress",

        titleFa:
          "روند اجرای پروژه",

        caption:
          "On-site construction phase.",

        captionFa:
          "مرحله اجرای پروژه در محل.",

        imageUrl:
          "/images/04.jpg",

        type:
          "image",

        galleryImages: [
          "/images/04-02.jpg",
          "/images/04-03.jpg",
          "/images/04-04.jpg",
          "/images/04-05.jpg"
        ]
      },


      // --------------------------------------------------------
      // STEP 02
      // --------------------------------------------------------

      {
        id:
          "exec2",

        title:
          "Construction Progress",

        titleFa:
          "روند اجرای پروژه",

        caption:
          "On-site construction phase.",

        captionFa:
          "مرحله اجرای پروژه در محل.",

        imageUrl:
          "/images/02.jpg",

        type:
          "image",

        galleryImages: [
          "/images/02-02.jpg",
          "/images/02-03.jpg",
          "/images/02-04.jpg",
          "/images/02-05.jpg"
        ]
      }

    ],


    prevProjectId:
      "SHIRVANI VILLA",

    nextProjectId:
      "SHIRVANI VILLA"
  }

];
