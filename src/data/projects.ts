import { Project, StudioInfo } from '../types';

export const studioInfo: StudioInfo = {
  name: "CHAJ Group",
  taglineEn: "An architectural practice dedicated to the exploration of space, light, and materiality.",
  taglineFa: "دفتر معماری چاج؛ پژوهش و کاوش در ماهیت فضا، نور و ماده.",
  aboutEn: "Chaj Architecture Group was founded in 2016 in Babolsar, Iran, by brothers Sadegh Laghaei Firouzjaei and Valiollah Laghaei Firouzjaei, with a focus on architectural design, project development, and construction.At Chaj, we see architecture as a process of discovering and creating new qualities in space. Our approach begins with understanding the context, needs, and underlying ideas of each project, and continues through architectural and interior design, detailing, 3D modeling, architectural visualization, and ultimately, project execution.We seek to establish a meaningful relationship between concept, function, form, light, material, and context in every project. The result is not simply a building, but a space shaped around people, place, and the way they live.For us, every project is an opportunity to redefine the relationship between people and space, from the initial idea to the final architectural experience.",
  aboutFa: "گروه معماری چاج در سال ۱۳۹۵ در شهر بابلسر، توسط برادران صادق لاغری فیروزجایی و ولی‌الله لاغری فیروزجایی تأسیس شد و فعالیت خود را با تمرکز بر طراحی، توسعه و اجرای پروژه‌های معماری آغاز کرد.در چاج، معماری فرآیندی برای کشف و خلق کیفیت‌های تازه در فضاست؛ فرآیندی که از شناخت بستر، نیازها و ایده آغاز می‌شود و تا طراحی معماری و داخلی، توسعه جزئیات، مدل‌سازی و شبیه‌سازی سه‌بعدی و در نهایت اجرای پروژه ادامه پیدا می‌کند.ما تلاش می‌کنیم در هر پروژه، میان ایده، عملکرد، فرم، نور، متریال و زمینه، ارتباطی معنادار ایجاد کنیم؛ تا نتیجه تنها یک بنا نباشد، بلکه فضایی متناسب با انسان، بستر و شیوه زندگی شکل بگیرد.برای ما، هر پروژه فرصتی است برای بازتعریف رابطه میان انسان و فضا؛ از نخستین ایده تا تجربه نهایی معماری.",
  principals: [
    {
      name: "Valiallah lagharei firozjaei",
      role: "Bachelor of Architecture",
      roleFa: "کارشناسی معماری",
      bioEn: "Specialist in architectural design and administrative protocols",
      bioFa: "متخصص در طراحی معماری وپروتکلهای اداری",
      image: "/images/vali.png"
    },
    {
      name: "Sadegh lagharei firozjaei",
      role: "Bachelor of Architecture",
      roleFa: "کارشناسی معماری",
      bioEn: "Specialist in architectural design and executive details",
      bioFa: "متخصص در طراحی معماری و دیتیل های اجرایی",
      image: "/images/sadegh.png"
    }
  ],
  services: [
    {
      id: "arch",
      titleEn: "Architectural Design",
      titleFa: "طراحی معماری",
      descEn: "Comprehensive conceptual and detailed architectural development for residential, cultural, and public spaces.",
      descFa: "توسعه کامل مفهومی و اجرایی معماری برای فضاهای مسکونی، فرهنگی و عمومی.",
      iconName: "Building2"
    },
    {
      id: "interior",
      titleEn: "Interior Architecture",
      titleFa: "معماری داخلی",
      descEn: "Custom materiality, bespoke furniture design, and spatial choreography tailored to human experience.",
      descFa: "متریال‌شناسی اختصاصی، طراحی مبلمان سفارشی و چیدمان فضایی منطبق بر تجربه انسانی.",
      iconName: "Compass"
    },
    {
      id: "research",
      titleEn: "Climatic & Material Research",
      titleFa: "پژوهش اقلیمی و متریال",
      descEn: "In-depth thermal analysis, traditional masonry reinvention, and low-carbon tectonic solutions.",
      descFa: "تحلیل حرارتی عمیق، بازآفرینی بنایی سنتی و راهکارهای تکتونیکی کم‌کربن.",
      iconName: "Maximize2"
    },
    {
      id: "master",
      titleEn: "Masterplanning",
      titleFa: "طراحی شهری و مسترپلن",
      descEn: "Contextual urban integration, landscape continuity, and ecological site strategies.",
      descFa: "یکپارچه‌سازی زمینه‌ای شهری، تداوم چشم‌انداز و راهبردهای بوم‌شناختی سایت.",
      iconName: "Layers"
    }
  ],
  offices: [
    {
      cityEn: "Babolsar Studio",
      cityFa: "دفتر بابلسر",
      addressEn: "No. 47, Royal Mall Complex, Fereydounkenar to Babolsar road, Mazandaran, Iran",
      addressFa: "مازندران، جاده فریدونکنار به بابلسر مجتمع رویال مال ، پلاک 47",
      phone: "+98 9001112478",
      email: "sadeghlagharei@gmail.com"
    }
  ]
};

export const projects: Project[] = [
  {
    id: "Mousavinejad MDF Trading",
    title: "Mousavinejad MDF Trading",
    titleFa: "بازرگانی ام دی اف موسوی نژاد",
    subtitle: "Commercial project",
    subtitleFa: "پروژه تجاری",
    category: "Commercial",
    year: "2023",
    location: "Mazandaran, Iran",
    locationFa: "مازندران، ایران",
    status: "Running",
    statusFa: "در حال اجرا",
    area: "500 m²",
    areaFa: "500 مترمربع",
    architects: "valiallah lagharei & sadegh lagharei",
    architectsFa: "ولی اله لاغری و صادق لاغری",
    presenter: "Hossein mohseni",
    presenterFa: "حسین محسنی",
    software: "Revit, 3Ds max",
    heroImage: "/images/12.jpg",
    narrativeEn: "Designed for an MDF showroom, the façade draws inspiration from the vertical rhythm of stacked MDF panels, translating the essence of the product into an architectural expression.",
    narrativeFa: "ریتم لوورهای عمودی نما، برداشتی انتزاعی از چیدمان منظم ورق‌های MDF است؛ عنصری که به نمای ساختمان نظم، عمق و هویت می‌بخشد.",
    lightSectionTitleEn: "Light as Material",
    lightSectionTitleFa: "نور به عنوان ماده",
    lightNarrativeEn: "In the arid climate of Yazd, light is both a blessing and a burden. Our design treats light not just as illumination, but as a physical material that defines the temporal experience of the house. Deep apertures and rhythmic skylights curate shadows that evolve throughout the day, animating the monolithic concrete surfaces.",
    lightNarrativeFa: "در اقلیم خشک یزد، نور هم نعمت است و هم چالش. طراحی ما با نور نه فقط به عنوان روشنایی، بلکه به عنوان یک ماده فیزیکی ملموس برخورد می‌کند که تجربه زمانی خانه را شکل می‌دهد. گشودگی‌های عمیق و نورگیرهای ریتمیک، سایه‌های متغیری ایجاد می‌کنند که در طول روز سطوح یکپارچه بتنی را زنده می‌سازند.",
    lightImage: "/images/west-view-01.jpg",
    spatialSectionTitleEn: "Spatial Logic",
    spatialSectionTitleFa: "منطق فضایی",
    spatialNarrativeEn: "The plan is organized around a series of sequential voids, ensuring that every living space maintains a visual connection to the sky and the internal garden while providing absolute privacy from the street.",
    spatialNarrativeFa: "پلان پروژه بر حول سلسله‌مراتبی از فضاهای خالی ترتیب یافته است، به‌گونه‌ای که هر فضای زندگی ارتباط چشمی مداومی با آسمان و حیاط داخلی داشته باشد و در عین حال محرمیت مطلق را در برابر خیابان حفظ کند.",
    details: [
      {
        id: "d1",
        title: "Details of the implementation of the complex door",
        titleFa: "جزئیات: تلاقی متریال‌ها",
        caption: "The scratched stone is integrated with the microcement of the door.",
        captionFa: "سنگ اسکرچ شده با میکروسمنت درب یکی شده.",
        imageUrl: "/images/d1-render.jpg",
        aspectRatio: "square",
        galleryImages: [
          "/images/d1-details01.jpg",
          "/images/d1-details02.jpg",
          "/images/d1-image01.jpg",
          "/images/d1-image02.jpg",
          "/images/d1-image03.jpg"
        ]
      },
      {
        id: "d2",
        title: "A Distinctive Entrance, Defining Identity",
        titleFa: "ورودی شاخص، هویت متمایز مجموعه",
        caption: "The intersection of function, form and identity",
        captionFa: "تلاقی عملکرد، فرم و هویت",
        imageUrl: "/images/west-view-02.jpg",
        aspectRatio: "video"
      }
    ],
    drawings: [
      {
        id: "plan-ground",
        title: "GROUND FLOOR PLAN",
        titleFa: "پلان طبقه همکف",
        type: "Plan",
        imageUrl: "/images/ground-floor-plan.jpg",
        hotspots: [
          {
            id: "h1",
            x: 35,
            y: 50,
            label: "Central Courtyard & Pool",
            labelFa: "حیاط مرکزی و حوض",
            description: "Microclimate thermal regulator providing convective cooling during hot afternoon hours.",
            descriptionFa: "تنظیم‌کننده میکروکلیما و خنک‌سازی خاستگاهی در ساعات گرم بعدازظهر."
          },
          {
            id: "h2",
            x: 65,
            y: 40,
            label: "Living Pavilion",
            labelFa: "تالار اصلی نشیمن",
            description: "Double-height space framed by monolithic concrete walls and floor-to-ceiling acoustic glass.",
            descriptionFa: "فضای با ارتفاع مضاعف قاب‌شده با دیوارهای بتنی و شیشه‌های آکوستیک."
          },
          {
            id: "h3",
            x: 20,
            y: 70,
            label: "Private Suite Entry",
            labelFa: "ورودی بخش خصوصی",
            description: "A recessed transitional threshold maintaining absolute privacy from communal areas.",
            descriptionFa: "آستانه گذار برای حفظ محرمیت کامل نسبت به فضاهای عمومی."
          }
        ]
      },
      {
        id: "plan-first-floor",
        title: "FIRST FLOOR PLAN",
        titleFa: "پلان طبقه اول",
        type: "Plan",
        imageUrl: "/images/first-floor-plan.jpg"
      },
      {
        id: "section-aa",
        title: "SECTION AA",
        titleFa: "مقطع عرضی AA",
        type: "Section",
        imageUrl: "/images/sectionA-A.jpg",
        hotspots: [
          {
            id: "hs1",
            x: 50,
            y: 30,
            label: "Light Shaft Chamber",
            labelFa: "نورگیر و هواکش سقفی",
            description: "Directs natural zenith light deep into subterranean study quarters.",
            descriptionFa: "هدایت مستقیم نور مستقیم آسمان به فضاهای مطالعه زیرزمین."
          }
        ]
      }
    ],
    executionSectionTitleEn: "Execution Phase",
    executionSectionTitleFa: "مراحل اجرا",
    executionNarrativeEn: "A look at the construction process from start to completion.",
    executionNarrativeFa: "نگاهی به روند اجرای پروژه از ابتدا تا تکمیل.",
    executionPhotos: [
      {
        id: "exec1",
        title: "Construction Progress",
        titleFa: "روند اجرای پروژه",
        caption: "On-site construction phase.",
        captionFa: "مرحله اجرای پروژه در محل.",
        imageUrl: "/images/04.jpg",
        type: "image"
      },
      {
        id: "exec2",
        title: "Construction Progress",
        titleFa: "روند اجرای پروژه",
        caption: "On-site construction phase.",
        captionFa: "مرحله اجرای پروژه در محل.",
        imageUrl: "/images/02.jpg",
        type: "image"
      }
    ],
    prevProjectId: "SHIRVANI VILLA",
    nextProjectId: "SHIRVANI VILLA"
  },
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
    architects: "Valiallah lagharei & sadegh lagharei",
    architectsFa: "ولی اله لاغری و صادق لاغری",
    presenter: "hossein mohseni",
    presenterFa: "حسین محسنی",
    software: "3Ds max-Revite",
    heroImage: "/images/shirvani-north-frount.jpg",
    narrativeEn: "\u201cShirvani\u201d is a reflection of living in harmony with the climate of Mazandaran, where architecture, nature, and rain become part of everyday life.",
    narrativeFa: "«شیروانی» روایتی از زندگی در پیوند با اقلیم مازندران است؛ جایی که معماری، طبیعت و باران را به بخشی از تجربه‌ی روزمره تبدیل می‌کند.",
    lightSectionTitleEn: "Architecture for Every Season of Life",
    lightSectionTitleFa: "معماری برای تمام فصل‌های زندگی",
    lightNarrativeEn: "A home designed for comfort, independence, and quality of life through every stage.",
    lightNarrativeFa: "خانه‌ای طراحی‌شده برای آرامش، استقلال و کیفیت زندگی در تمام مراحل عمر.",
    lightImage: "/images/shirvani-old-woman.jpg",
    spatialSectionTitleEn: "Architecture for Every Season of Life",
    spatialSectionTitleFa: "معماری برای تمام فصل‌های زندگی",
    spatialNarrativeEn: "A home designed for comfort, independence, and quality of life through every stage.",
    spatialNarrativeFa: "خانه‌ای طراحی‌شده برای آرامش، استقلال و کیفیت زندگی در تمام مراحل عمر.",
    details: [
      {
        id: "sv-d1",
        title: "Details of connecting an aluminum window to the gutter",
        titleFa: "جزئیات اتصال پنجره آلمینیومی به گاتر",
        caption: "Where Details Shape the Quality of Living",
        captionFa: "جایی که جزئیات، کیفیت زندگی را شکل می‌دهند",
        imageUrl: "/images/shirvani-d1-render01.jpg",
        aspectRatio: "square",
        galleryImages: [
          "/images/shirvani-d1-render02.jpg",
          "/images/shirvani-d1-details01.jpg",
          "/images/shirvani-d1-details02.jpg",
          "/images/shirvani-d1-details03.jpg"
        ]
      },
      {
        id: "sv-d2",
        title: "Parking implementation details",
        titleFa: "جزئیات اجرایی پارکینگ",
        caption: "The pitched roof edge is detailed to shed heavy seasonal rainfall away from the walls.",
        captionFa: "لبه سقف شیبدار به‌گونه‌ای طراحی شده که بارش‌های سنگین فصلی را از دیوارها دور کند.",
        imageUrl: "/images/shirvani-d2-render01.jpg",
        aspectRatio: "video",
        galleryImages: [
          "/images/shirvani-d2-details01.jpg",
          "/images/shirvani-d2-details02.jpg",
          "/images/shirvani-detail-02b.jpg",
          "/images/shirvani-detail-02b.jpg",
          "/images/shirvani-detail-02c.jpg"
        ]
      },
      {
        id: "sv-d3",
        title: "Timber Window Frame Junction",
        titleFa: "جزئیات اتصال قاب چوبی پنجره",
        caption: "A weathered timber frame meets the rammed-earth wall through a recessed shadow gap.",
        captionFa: "قاب چوبی هوازده از طریق یک شکاف سایه فرورفته به دیوار خاک کوبیده متصل می‌شود.",
        imageUrl: "/images/shirvani-detail-03.jpg",
        aspectRatio: "square",
        galleryImages: [
          "/images/shirvani-detail-03a.jpg",
          "/images/shirvani-detail-03b.jpg"
        ]
      }
    ],
    drawings: [
      {
        id: "sv-plan-ground",
        title: "GROUND FLOOR PLAN",
        titleFa: "پلان طبقه همکف",
        type: "Plan",
        imageUrl: "/images/shirvani-ground-floor-plan.jpg",
        hotspots: [
          {
            id: "sv-h1",
            x: 40,
            y: 55,
            label: "Covered Veranda",
            labelFa: "ایوان سرپوشیده",
            description: "A sheltered transitional zone connecting the interior to the garden under the roof overhang.",
            descriptionFa: "فضای واسط سرپوشیده که فضای داخلی را زیر سایه‌بان سقف به باغ متصل می‌کند."
          },
          {
            id: "sv-h2",
            x: 60,
            y: 35,
            label: "Living & Dining",
            labelFa: "نشیمن و پذیرایی",
            description: "Open-plan gathering space oriented toward the southern garden light.",
            descriptionFa: "فضای باز جمع‌خانه رو به نور جنوبی باغ."
          }
        ]
      },
      {
        id: "sv-elevation-north",
        title: "NORTH ELEVATION",
        titleFa: "نمای شمالی",
        type: "Elevation",
        imageUrl: "/images/shirvani-north-elevation.jpg"
      },
      {
        id: "sv-elevation-south",
        title: "SOUTH ELEVATION",
        titleFa: "نمای جنوبی",
        type: "Elevation",
        imageUrl: "/images/shirvani-south-elevation.jpg"
      },
      {
        id: "sv-section-aa",
        title: "SECTION A-A",
        titleFa: "مقطع A-A",
        type: "Section",
        imageUrl: "/images/shirvani-section-aa.jpg",
        hotspots: [
          {
            id: "sv-hs1",
            x: 50,
            y: 25,
            label: "Pitched Roof Cavity",
            labelFa: "فضای زیرشیروانی",
            description: "Ventilated roof cavity that buffers the interior from seasonal temperature swings.",
            descriptionFa: "فضای تهویه‌شده زیر شیروانی که فضای داخلی را از نوسانات دمایی فصلی محافظت می‌کند."
          }
        ]
      }
    ],
    executionSectionTitleEn: "Execution Phase",
    executionSectionTitleFa: "مراحل اجرا",
    executionNarrativeEn: "A look at the construction process from start to completion.",
    executionNarrativeFa: "نگاهی به روند اجرای پروژه از ابتدا تا تکمیل.",
    executionPhotos: [
      {
        id: "sv-exec1",
        title: "Foundation & Structure",
        titleFa: "فونداسیون و اسکلت",
        caption: "Early structural phase on site.",
        captionFa: "مرحله اولیه اجرای اسکلت در محل پروژه.",
        imageUrl: "/images/shirvani-exec-01.jpg",
        type: "image"
      },
      {
        id: "sv-exec2",
        title: "Roof Framing",
        titleFa: "اجرای سازه سقف شیروانی",
        caption: "Installation of the pitched roof framing.",
        captionFa: "نصب سازه چوبی سقف شیروانی.",
        imageUrl: "/images/shirvani-exec-02.jpg",
        type: "image"
      },
      {
        id: "sv-exec3",
        title: "Facade Finishing",
        titleFa: "اجرای نهایی نما",
        caption: "Final facade and finishing works on site.",
        captionFa: "مرحله نهایی اجرای نما و کارهای تکمیلی.",
        imageUrl: "/images/shirvani-exec-03.jpg",
        type: "image"
      }
    ],
    prevProjectId: "Mousavinejad MDF Trading",
    nextProjectId: "Mousavinejad MDF Trading"
  }
];
