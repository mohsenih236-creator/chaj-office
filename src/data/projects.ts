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
      role: "Lead Architect & Founder",
      roleFa: "معمار ارشد و هم‌بنیان‌گذار",
      bioEn: "Specializes in tectonic structural expressions and desert climatic adaptations.",
      bioFa: "متخصص در بیان تکتونیک سازه‌ای و انطباق‌های اقلیمی مناطق کویری.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Sadegh lagharei firozjaei",
      role: "Design Director & Co-Founder",
      roleFa: "مدیر طراحی و هم‌بنیان‌گذار",
      bioEn: "Focuses on spatial sequencing, raw material research, and spatial phenomenology.",
      bioFa: "تمرکز بر توالی فضایی، پژوهش در مواد خام و پدیدارشناسی فضای معماری.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
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
    lightImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_EI2D2eLYn_dRNA83joDsKlq0bmo6vutQwhCAP1Hyg_GcPkBKid8Yt59XQZy0Qx-wN2i8VAVDv4God4GXoMWI3ZCI_L3d5ywYjn0sYxYgmDAbSMsly--hlFXv62J8hZQFF7u5PtuLE-_qgbvLfy4PDbFKz6QQCvsmXN8agmDnrgJTZBL_-jwcrtbaeAXyZbR0bYck0XXNyAiQD7WyiSeGCkf8EgDprL-JD8wt-ItQ63PEstlqYi-LKQ",
    spatialSectionTitleEn: "Spatial Logic",
    spatialSectionTitleFa: "منطق فضایی",
    spatialNarrativeEn: "The plan is organized around a series of sequential voids, ensuring that every living space maintains a visual connection to the sky and the internal garden while providing absolute privacy from the street.",
    spatialNarrativeFa: "پلان پروژه بر حول سلسله‌مراتبی از فضاهای خالی ترتیب یافته است، به‌گونه‌ای که هر فضای زندگی ارتباط چشمی مداومی با آسمان و حیاط داخلی داشته باشد و در عین حال محرمیت مطلق را در برابر خیابان حفظ کند.",
    details: [
      {
        id: "d1",
        title: "DETAIL: MATERIAL INTERSECTION",
        titleFa: "جزئیات: تلاقی متریال‌ها",
        caption: "Raw board-formed concrete meets precision-milled dark oak timber with a shadow gap.",
        captionFa: "تلاقی بتن نمایان تخته‌کوب و چوب بلوط تیره با درز سایه دقیق.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB_Q6odGEuyLmXk9S6MMfCRZ9HeWqoi7Y05uc34msm418CGAEczC4Qzl8hoB6TcxX89u2KxRZo_M5yzlWJQtBMCJU0E-bUc1DPOZzl8DPI7feO94udT_EbR7zKRl1IfYIIoYKQb-pkFqbYa_8nszBU7VXGd5XKo1yJrrsMdifLycpSHThZaC52BtNoce-NQfnOQucmZol-W8RTKoshMwEPPe-9LoYO4tHKtQx8ikmZ-BKaSRcsCaPkbg",
        aspectRatio: "square"
      },
      {
        id: "d2",
        title: "INTERNAL COURTYARD AND REFLECTING POOL",
        titleFa: "حیاط داخلی و حوض انعکاس",
        caption: "Central water basin reflecting raw concrete colonnades under the desert sun.",
        captionFa: "حوض مرکزی منعکس‌کننده ستون‌های بتنی در زیر آفتاب کویر.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA04HHV69pc68mE8N5n5vE9-W_LL2tqEgzsL6J015LloaibAeyn1ue-e_-KeCM_Y_rMyx8SMTS2IwVlLbF0E1Mpndz23XbMdhIX3CLJ-3fONtB8OaZP1wJLXfliZLtC_hGcBNsLCIxWj9XMajnOlUCPLMA0K4Tt-CaZ5DD7UH-DjS_rXcxIFnMp3I4V_k1jSMD9U6wkDTVmIqmoU1vMv-h-lkoSBCZc_GYCNz1DXCOEp8E6wgZHhe9oqw",
        aspectRatio: "video"
      }
    ],
    drawings: [
      {
        id: "plan-ground",
        title: "GROUND FLOOR PLAN",
        titleFa: "پلان طبقه همکف",
        type: "Plan",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBj-id1q-ephygUB5gA8v9jn6oaWZtu5fT4BIbkKPe3QJifj9vDoFeSwEt3wusrw6XSdDPMcnKFNCc39tFRSoPz4iLebw2Di8JY2mjTthwSHU_AfE7tSmiviLkrxyPRqsV9P-8g7YgPjMH_fJ2Tm3YWkQkduerrV3y9rCZpt5sKNpw81DFCLD2vgWLskPP-a9xMFz1zoC35mZLLbqbH-kXaIiw7c6XsU8lMRePLJdGnmTfp1ficlr0Fg",
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
        id: "section-aa",
        title: "SECTION AA",
        titleFa: "مقطع طولی AA",
        type: "Section",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4dZjBX2eKlr0cPPfy3sBcknkrDfU6hvmgorhLtx_zH3x_VfpU7AfZkaBAheTRpxTvilfMIwFOkk8h0ACf1luwnCUAqZNGoz0zL-OKrZeo4hmNkWglVC8e9DFAnfqCffTDQuazod_RNSdZVDhvuM_RP_6goCPiOdK8wdUnwmAaIj4Y7XS8wZaRjnNKrBH4__YwDZ2LZMd2oSyrHjWBwkai6nAhM7QzWwuvS7E_s_fQE4a0f0TqvG9JZw",
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
    prevProjectId: "the-void-library",
    nextProjectId: "cloud-pavilion"
  },
  {
    id: "cloud-pavilion",
    title: "Cloud Pavilion",
    titleFa: "پاویون ابر",
    subtitle: "A temporary lightweight steel and membrane installation",
    subtitleFa: "سازه‌ای سبک از فولاد و پوسته نیمه‌شفاف",
    category: "Concept",
    year: "2024",
    location: "Isfahan, Iran",
    locationFa: "اصفهان، ایران",
    status: "Completed",
    statusFa: "تکمیل شده",
    area: "280 m²",
    areaFa: "۲۸۰ مترمربع",
    architects: "H. Chaj, S. Rad",
    architectsFa: "ح. چاج، س. راد",
    presenter: "Name Surname",
    presenterFa: "نام و نام خانوادگی",
    software: "Rhino, Grasshopper, Karamba",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920",
    narrativeEn: "Cloud Pavilion explores ultra-lightweight tensile membranes suspended over a reciprocal timber structural canopy. Designed as a temporary cultural venue along the Zayandeh Riverbed, it catches wind currents and filters harsh sunlight into soft ambient illumination.",
    narrativeFa: "پاویون ابر به بررسی پوسته‌های کششی فوق سبک معلق بر روی چتر سازه‌ای چوبی می‌پردازد. این بنا به عنوان یک فضای فرهنگی موقت در کنار بستر زاینده‌رود طراحی شده است.",
    lightSectionTitleEn: "Ephemeral Light Filtration",
    lightSectionTitleFa: "فیلتراسیون نور گذرا",
    lightNarrativeEn: "The translucent PTFE membrane diffuses direct solar radiation, reducing ambient interior temperature by up to 8°C while illuminating the subterranean gathering ring.",
    lightNarrativeFa: "پوسته نیمه‌شفاف PTFE تابش مستقیم خورشید را پخش کرده و دمای داخلی را تا ۸ درجه سانتی‌گراد کاهش می‌دهد.",
    lightImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    spatialSectionTitleEn: "Tensile Geometry",
    spatialSectionTitleFa: "هندسه کششی",
    spatialNarrativeEn: "Parametrically optimized to withstand high wind loads with minimal anchor foundations.",
    spatialNarrativeFa: "بهینه‌سازی شده به صورت پارامتریک برای تحمل بارهای باد با کمترین فونداسیون.",
    details: [
      {
        id: "cp-d1",
        title: "TIMBER JOINERY DETAIL",
        titleFa: "جزئیات اتصالات چوبی",
        caption: "CNC-milled larch wood nodes joined with concealed stainless steel pins.",
        captionFa: "اتصالات چوب لارکس فرزکاری‌شده با پین‌های استیل پنهان.",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
        aspectRatio: "square"
      },
      {
        id: "cp-d2",
        title: "AMPHITHEATER CANOPY VIEW",
        titleFa: "نمای سایبان آمفی‌تئاتر",
        caption: "Curved seating steps cascading toward the central performing ring.",
        captionFa: "پله‌های نشستن منحنی متصل به رینگ اجرای مرکزی.",
        imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
        aspectRatio: "video"
      }
    ],
    drawings: [
      {
        id: "cp-plan",
        title: "CANOPY STRUCTURAL AXONOMETRIC",
        titleFa: "آکسونومتری سازه‌ای سایبان",
        type: "Axonometric",
        imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    prevProjectId: "Mousavinejad MDF Trading",
    nextProjectId: "desert-sanctuary"
  },
  {
    id: "the-void-library",
    title: "The Void Library",
    titleFa: "کتابخانه خلاء",
    subtitle: "A subterranean reading sanctuary constructed from local stone",
    subtitleFa: "پناهگاهی زیرزمینی برای مطالعه ساخته شده از سنگ بومی",
    category: "Cultural",
    year: "2022",
    location: "Shiraz, Iran",
    locationFa: "شیراز، ایران",
    status: "Completed",
    statusFa: "تکمیل شده",
    area: "820 m²",
    areaFa: "۸۲۰ مترمربع",
    architects: "H. Chaj, S. Rad",
    architectsFa: "ح. چاج، س. راد",
    presenter: "Name Surname",
    presenterFa: "نام و نام خانوادگی",
    software: "Revit, V-Ray",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1920",
    narrativeEn: "Carved into a limestone ridge outside Shiraz, The Void Library buries its primary book stacks beneath earth to preserve fragile manuscripts at constant relative humidity, while three sunken courtyards bring cool air and golden daylight.",
    narrativeFa: "کتابخانه خلاء که در صخره‌های آهکی حومه شیراز تراشیده شده است، مخازن اصلی کتاب خود را برای حفظ نسخ خطی تحت رطوبت و دمای ثابت در دل زمین قرار داده است.",
    lightSectionTitleEn: "Subterranean Chiaroscuro",
    lightSectionTitleFa: "سایه‌روشن زیرزمینی",
    lightNarrativeEn: "Sunlight is funnelled through tapered stone shafts, casting elongated beams across dark travertine reading tables.",
    lightNarrativeFa: "نور خورشید از طریق مخروط‌های سنگی هدایت شده و پرتوهای کشیده‌ای را بر روی میزهای تراورتن مطالعه می‌افکند.",
    lightImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200",
    spatialSectionTitleEn: "Carved Volumetrics",
    spatialSectionTitleFa: "احجم تراشیده شده",
    spatialNarrativeEn: "Vast double-height reading halls carved out of local quarries.",
    spatialNarrativeFa: "تالارهای مطالعه با ارتفاع مضاعف که از معادن سنگ بومی تراشیده شده‌اند.",
    details: [
      {
        id: "vl-d1",
        title: "STONE MASONRY JUNCTION",
        titleFa: "اتصال سنگ‌کاری",
        caption: "Dry-stacked limestone blocks with narrow recessed mortar lines.",
        captionFa: "بلوک‌های سنگی خشک‌چین با درزهای باریک فرو رفته.",
        imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=1000",
        aspectRatio: "square"
      }
    ],
    drawings: [
      {
        id: "vl-plan",
        title: "LONGITUDINAL SECTION",
        titleFa: "مقطع طولی کتابخانه",
        type: "Section",
        imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    prevProjectId: "desert-sanctuary",
    nextProjectId: "Mousavinejad MDF Trading"
  },
  {
    id: "desert-sanctuary",
    title: "Desert Sanctuary",
    titleFa: "خلوتگاه کویر",
    subtitle: "Rammed earth retreat integrating traditional wind catchers",
    subtitleFa: "اقامتگاه خاک کوبیده همراه با بادگیرهای مدرن بومی",
    category: "Residential",
    year: "2023",
    location: "Kashan, Iran",
    locationFa: "کاشان، ایران",
    status: "Completed",
    statusFa: "تکمیل شده",
    area: "380 m²",
    areaFa: "۳۸۰ مترمربع",
    architects: "H. Chaj, S. Rad",
    architectsFa: "ح. چاج، س. راد",
    presenter: "Name Surname",
    presenterFa: "نام و نام خانوادگی",
    software: "Rhino, ArchiCAD",
    heroImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920",
    narrativeEn: "Utilizing excavated clay directly from the construction site, Desert Sanctuary features 60cm thick monolithic rammed earth walls that absorb diurnal heat fluctuations in Kashan's high desert.",
    narrativeFa: "با استفاده از خاک رس استخراج‌شده از خود سایت، خلوتگاه کویر دارای دیوارهای ۶۰ سانتی‌متری خاک کوبیده است که نوسانات دمایی شبانه‌روز کاشان را خنثی می‌سازد.",
    lightSectionTitleEn: "Filter of Dust and Daylight",
    lightSectionTitleFa: "فیلتر گرد و غبار و نور",
    lightNarrativeEn: "Perforated brick screens reduce glare and screen out desert sandstorms while creating intricate shadow patterns.",
    lightNarrativeFa: "شبکه‌های آجری مشبک علاوه بر کاهش زنندگی نور و مهار بادهای شن، الگوهای سایه پیچیده‌ای خلق می‌کنند.",
    lightImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1200",
    spatialSectionTitleEn: "Passive Airflow Chimney",
    spatialSectionTitleFa: "دودکش جریان هوای غیرفعال",
    spatialNarrativeEn: "Reinvented wind catchers funnel cool night air into subterranean water cisterns.",
    spatialNarrativeFa: "بادگیرهای بازطراحی‌شده که هوای خنک شبانه را به آب‌انبارهای زیرزمینی هدایت می‌کنند.",
    details: [
      {
        id: "ds-d1",
        title: "RAMMED EARTH TEXTURE",
        titleFa: "بافت خاک کوبیده",
        caption: "Layered iron oxide pigment banding within rammed earth strata.",
        captionFa: "باندهای لایه‌ای اکسید آهن در طبقات خاک کوبیده شده.",
        imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1000",
        aspectRatio: "square"
      }
    ],
    drawings: [
      {
        id: "ds-plan",
        title: "GROUND SITE PLAN",
        titleFa: "پلان کلی سایت",
        type: "Plan",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    prevProjectId: "cloud-pavilion",
    nextProjectId: "tehran-courtyard-villa"
  },
  {
    id: "tehran-courtyard-villa",
    title: "Tehran Courtyard Villa",
    titleFa: "ویلای حیاط‌دار تهران",
    subtitle: "A vertical stacked courtyard house responding to urban density",
    subtitleFa: "خانه‌ای با حیاط‌های طبقاتی عمودی در پاسخ به تراکم شهری",
    category: "Residential",
    year: "2021",
    location: "Tehran, Iran",
    locationFa: "تهران، ایران",
    status: "Completed",
    statusFa: "تکمیل شده",
    area: "620 m²",
    areaFa: "۶۲۰ مترمربع",
    architects: "H. Chaj, S. Rad",
    architectsFa: "ح. چاج، س. راد",
    presenter: "Name Surname",
    presenterFa: "نام و نام خانوادگی",
    software: "Revit, Enscape",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920",
    narrativeEn: "In the dense urban fabric of northern Tehran, this villa stacks three distinct courtyard terraces vertically, bringing greenery and outdoor privacy to every level of the family residence.",
    narrativeFa: "در بافت متراکم شمال تهران، این ویلا سه حیاط تراسی را به صورت عمودی روی هم قرار داده است تا فضای سبز و محرمیت را در تمام طبقات فراهم کند.",
    lightSectionTitleEn: "Urban Reflector",
    lightSectionTitleFa: "بازتابنده شهری",
    lightNarrativeEn: "Brushed aluminum louvers tilt dynamically according to seasonal sun angles.",
    lightNarrativeFa: "لوورهای آلومینیومی مات متناسب با زاویه تابش فصل‌ها تغییر زاویه می‌دهند.",
    lightImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    spatialSectionTitleEn: "Vertical Green Core",
    spatialSectionTitleFa: "هسته سبز عمودی",
    spatialNarrativeEn: "A central atrium binds living quarters around a mature indoor cypress tree.",
    spatialNarrativeFa: "دهلیز مرکزی فضاهای زندگی را گرد یک درخت سرو کهنسال پیوند می‌دهد.",
    details: [
      {
        id: "tc-d1",
        title: "BRICK LOUVER SYSTEM",
        titleFa: "سیستم لوور آجری",
        caption: "Rotating vertical brick modules forming dynamic street privacy.",
        captionFa: "ماژول‌های آجری گردان برای تنظیم میزان محرمیت از خیابان.",
        imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=1000",
        aspectRatio: "square"
      }
    ],
    drawings: [
      {
        id: "tc-plan",
        title: "VERTICAL SECTION DIAGRAM",
        titleFa: "دیاگرام مقطع عمودی",
        type: "Section",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    prevProjectId: "desert-sanctuary",
    nextProjectId: "Mousavinejad MDF Trading"
  }
];
