/*
 * Textos de la web en Català (ca), Castellà (es) i Anglès (en).
 * Per editar un text, canvia'l als tres idiomes mantenint la mateixa clau.
 * Les claus s'usen a l'HTML amb data-i18n="seccio.clau".
 */
window.CONTENT = {
  ca: {
    meta: {
      title: "Andrés Roldán Baldó · Màrqueting Digital",
      description: "Andrés Roldán Baldó — Responsable de Màrqueting Digital. Estratègia, analítica, email marketing, continguts i funnel de conversió en entorns B2B i B2C."
    },
    ui: {
      skip: "Salta al contingut",
      navLabel: "Navegació principal",
      langLabel: "Idioma",
      openMenu: "Obrir menú",
      closeMenu: "Tancar menú",
      close: "Tancar",
      downloadCv: "Descarregar CV",
      downloadCvLong: "Descarregar CV (PDF, castellà)",
      footer: "Fet a mida · Allotjat a GitHub Pages",
      toTop: "Tornar a dalt ↑",
      present: "Actualitat"
    },
    nav: { about: "Sobre mi", experience: "Experiència", skills: "Competències", portfolio: "Portafoli", contact: "Contacte" },
    hero: {
      eyebrow: "Màrqueting digital estratègic",
      title: "Converteixo dades en <em>decisions</em> que fan créixer el negoci.",
      lead: "Sóc l'Andrés Roldán, Responsable de Màrqueting Digital. Estratègia, analítica, email marketing, continguts i funnel de conversió en entorns B2B i B2C.",
      ctaPortfolio: "Veure portafoli",
      ctaContact: "Parlem",
      photoAlt: "Espai reservat per a la foto de l'Andrés Roldán",
      photoPending: "Foto properament",
      float1: "Data-driven",
      float2: "Funnel & leads",
      facts: [
        { value: "ADE + MKT", label: "Doble grau · UPC" },
        { value: "B2B · B2C", label: "Experiència en tots dos" },
        { value: "CA · ES · EN", label: "Idiomes de treball" }
      ]
    },
    about: {
      kicker: "Sobre mi",
      title: "Analitzar, detectar, prioritzar i executar.",
      p1: "Sóc professional del màrqueting digital amb doble grau en ADE i Màrqueting i Comunicació Digital (Euncet, UPC). Actualment lidero de forma autònoma el màrqueting d'una empresa en plena transformació digital: estratègia, analítica, email marketing, continguts, funnel de conversió i fires.",
      p2: "Perfil analític i orientat a resultats, amb experiència en entorns B2B i B2C i capacitat per traduir les dades en decisions i presentar-les a Direcció.",
      method: [
        { title: "Analitzar", text: "Dades de web, email i xarxes com a punt de partida." },
        { title: "Detectar", text: "Identificar què falla i on hi ha oportunitat." },
        { title: "Prioritzar", text: "Ordenar les accions segons l'impacte esperat." },
        { title: "Executar", text: "Implementar, mesurar i reportar amb KPIs clars." }
      ]
    },
    experience: {
      kicker: "Trajectòria",
      title: "Experiència professional",
      items: [
        {
          role: "Responsable de Màrqueting Digital",
          company: "Tecnotrip, S.A.",
          place: "Terrassa, Barcelona",
          start: "Juny 2025",
          end: null,
          bullets: [
            "Disseny i posada en marxa del pla estratègic de màrqueting digital i del full de ruta operatiu, amb objectius, KPIs i reporting periòdic a Direcció.",
            "Anàlisi del rendiment dels canals digitals (web, email i xarxes socials) per detectar oportunitats de millora i prioritzar accions segons el seu impacte.",
            "Redisseny del funnel de conversió: captació, nurturing i conversió de leads amb contingut de valor, formularis i automatitzacions.",
            "Definició del model de mesura: esdeveniments de conversió, UTMs i quadres de comandament a Google Analytics 4 i Looker Studio.",
            "Gestió i optimització de l'email marketing: qualitat i segmentació de la base de dades, automatitzacions, lliurabilitat i compliment del RGPD.",
            "Planificació i execució del màrqueting de fires: disseny de l'espai i la gràfica, campanyes d'invitació, contingut en directe i captació de leads.",
            "Creació de continguts: newsletters, articles de blog SEO, publicacions i vídeo per a LinkedIn i Instagram, material gràfic i de marca.",
            "Suport en la prospecció de mercats internacionals."
          ],
          tags: ["Estratègia", "GA4", "Looker Studio", "Email", "Fires"]
        },
        {
          role: "Becari de Màrqueting Digital",
          company: "Grifoll Print Solutions",
          place: "Rubí, Barcelona",
          start: "Gener 2025",
          end: "Juny 2025",
          bullets: [
            "Participació en la integració del CRM HubSpot, amb suport en la configuració i la gestió de comandes amb WordPress.",
            "Anàlisi de mercat i benchmarking competitiu en sectors industrials com a suport a la presa de decisions.",
            "Optimització de marketplaces digitals i campanyes de performance B2B."
          ],
          tags: ["HubSpot", "WordPress", "Benchmarking", "B2B"]
        },
        {
          role: "Tècnic de Màrqueting i Administració",
          company: "GoSailingBCN",
          place: "Barcelona",
          start: "2022",
          end: "2024",
          bullets: [
            "Gestió autònoma de les xarxes socials de la marca, amb creixement de la comunitat i de l'engagement orgànic.",
            "Disseny i seguiment de campanyes SEM de captació de clients al sector nàutic.",
            "Coordinació de proveïdors, reserves, pressupostos i documentació comercial en entorn B2C."
          ],
          tags: ["Social Media", "SEM", "B2C"]
        }
      ]
    },
    education: {
      kicker: "Formació",
      degree: "Doble Grau en ADE i Màrqueting i Comunicació Digital",
      langsTitle: "Idiomes",
      langs: [
        { name: "Català", level: "Natiu", pct: 100 },
        { name: "Castellà", level: "Natiu", pct: 100 },
        { name: "Anglès", level: "B2 · ús professional", pct: 70 }
      ]
    },
    skills: {
      kicker: "Competències",
      title: "Eines i especialitats",
      softTitle: "Soft skills",
      groups: [
        { icon: "target", title: "Estratègia digital", items: ["Planificació estratègica", "Funnel i lead generation", "Growth marketing", "Màrqueting de continguts", "B2B i B2C"] },
        { icon: "mail", title: "Email marketing i CRM", items: ["Mailchimp", "Brevo", "HubSpot", "Segmentació", "Automatitzacions", "Nurturing", "Lliurabilitat", "RGPD"] },
        { icon: "chart", title: "Analítica i dades", items: ["Google Analytics 4", "Search Console", "Looker Studio", "Tableau", "Power BI", "Pla de mesura", "Key events", "UTMs"] },
        { icon: "funnel", title: "SEO i paid", items: ["SEO on-page", "SEO de continguts", "Google Ads (cerca)", "Google Tag Manager"] },
        { icon: "spark", title: "Contingut i disseny", items: ["Canva", "Affinity Designer", "Affinity Publisher", "DaVinci Resolve", "Vídeo per a xarxes"] },
        { icon: "event", title: "Web i ofimàtica", items: ["WordPress", "Excel avançat", "PowerPoint", "Word", "Microsoft 365"] }
      ],
      soft: ["Pensament analític", "Autonomia", "Orientació a resultats", "Comunicació amb Direcció", "Adaptabilitat", "Gestió del temps"]
    },
    portfolio: {
      kicker: "Portafoli",
      title: "Casos i campanyes",
      intro: "Una selecció de projectes: el repte, què vaig fer i com ho vaig mesurar.",
      filtersLabel: "Filtrar projectes",
      all: "Tots",
      viewCase: "Veure el cas",
      sample: "Mètriques d'exemple",
      sampleNote: "Les xifres d'aquest cas són il·lustratives i estan pendents de substituir per dades reals.",
      context: "Context",
      challenge: "Repte",
      actions: "Què vaig fer",
      results: "Resultats",
      tools: "Eines",
      empty: "Encara no hi ha projectes en aquesta categoria.",
      categories: { strategy: "Estratègia", analytics: "Analítica", email: "Email & CRM", events: "Fires i esdeveniments", paid: "SEM / Paid", content: "Contingut" }
    },
    contact: {
      kicker: "Contacte",
      title: "Parlem del teu proper projecte?",
      text: "Estic obert a noves oportunitats i col·laboracions en màrqueting digital estratègic. Escriu-me i et respondré ben aviat.",
      email: "Escriu-me"
    }
  },

  es: {
    meta: {
      title: "Andrés Roldán Baldó · Marketing Digital",
      description: "Andrés Roldán Baldó — Responsable de Marketing Digital. Estrategia, analítica, email marketing, contenidos y funnel de conversión en entornos B2B y B2C."
    },
    ui: {
      skip: "Saltar al contenido",
      navLabel: "Navegación principal",
      langLabel: "Idioma",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      close: "Cerrar",
      downloadCv: "Descargar CV",
      downloadCvLong: "Descargar CV (PDF)",
      footer: "Hecho a medida · Alojado en GitHub Pages",
      toTop: "Volver arriba ↑",
      present: "Actualidad"
    },
    nav: { about: "Sobre mí", experience: "Experiencia", skills: "Competencias", portfolio: "Portafolio", contact: "Contacto" },
    hero: {
      eyebrow: "Marketing digital estratégico",
      title: "Convierto datos en <em>decisiones</em> que hacen crecer el negocio.",
      lead: "Soy Andrés Roldán, Responsable de Marketing Digital. Estrategia, analítica, email marketing, contenidos y funnel de conversión en entornos B2B y B2C.",
      ctaPortfolio: "Ver portafolio",
      ctaContact: "Hablemos",
      photoAlt: "Espacio reservado para la foto de Andrés Roldán",
      photoPending: "Foto próximamente",
      float1: "Data-driven",
      float2: "Funnel & leads",
      facts: [
        { value: "ADE + MKT", label: "Doble grado · UPC" },
        { value: "B2B · B2C", label: "Experiencia en ambos" },
        { value: "CA · ES · EN", label: "Idiomas de trabajo" }
      ]
    },
    about: {
      kicker: "Sobre mí",
      title: "Analizar, detectar, priorizar y ejecutar.",
      p1: "Soy profesional del marketing digital con doble grado en ADE y Marketing y Comunicación Digital (Euncet, UPC). Actualmente lidero de forma autónoma el marketing de una empresa en plena transformación digital: estrategia, analítica, email marketing, contenidos, funnel de conversión y ferias.",
      p2: "Perfil analítico y orientado a resultados, con experiencia en entornos B2B y B2C y capacidad para traducir los datos en decisiones y presentarlas a Dirección.",
      method: [
        { title: "Analizar", text: "Datos de web, email y redes como punto de partida." },
        { title: "Detectar", text: "Identificar qué falla y dónde hay oportunidad." },
        { title: "Priorizar", text: "Ordenar las acciones según su impacto esperado." },
        { title: "Ejecutar", text: "Implementar, medir y reportar con KPIs claros." }
      ]
    },
    experience: {
      kicker: "Trayectoria",
      title: "Experiencia profesional",
      items: [
        {
          role: "Responsable de Marketing Digital",
          company: "Tecnotrip, S.A.",
          place: "Terrassa, Barcelona",
          start: "Jun. 2025",
          end: null,
          bullets: [
            "Diseño y puesta en marcha del plan estratégico de marketing digital y de su hoja de ruta operativa, con objetivos, KPIs y reporting periódico a Dirección.",
            "Análisis del rendimiento de los canales digitales (web, email y redes sociales) para detectar oportunidades de mejora y priorizar acciones según su impacto.",
            "Rediseño del funnel de conversión: captación, nurturing y conversión de leads mediante contenido de valor, formularios y automatizaciones.",
            "Definición del modelo de medición: eventos de conversión, UTMs y cuadros de mando en Google Analytics 4 y Looker Studio.",
            "Gestión y optimización del email marketing: calidad y segmentación de la base de datos, automatizaciones, entregabilidad y cumplimiento del RGPD.",
            "Planificación y ejecución del marketing de ferias: diseño del espacio y la gráfica, campañas de invitación, contenido en directo y captación de leads.",
            "Creación de contenidos: newsletters, artículos de blog SEO, publicaciones y vídeo para LinkedIn e Instagram, material gráfico y de marca.",
            "Apoyo en la prospección de mercados internacionales."
          ],
          tags: ["Estrategia", "GA4", "Looker Studio", "Email", "Ferias"]
        },
        {
          role: "Becario de Marketing Digital",
          company: "Grifoll Print Solutions",
          place: "Rubí, Barcelona",
          start: "Ene. 2025",
          end: "Jun. 2025",
          bullets: [
            "Participación en la integración del CRM HubSpot, con apoyo en la configuración y la gestión de pedidos con WordPress.",
            "Análisis de mercado y benchmarking competitivo en sectores industriales como apoyo a la toma de decisiones.",
            "Optimización de marketplaces digitales y campañas de performance B2B."
          ],
          tags: ["HubSpot", "WordPress", "Benchmarking", "B2B"]
        },
        {
          role: "Técnico de Marketing y Administración",
          company: "GoSailingBCN",
          place: "Barcelona",
          start: "2022",
          end: "2024",
          bullets: [
            "Gestión autónoma de las redes sociales de la marca, con crecimiento de la comunidad y del engagement orgánico.",
            "Diseño y seguimiento de campañas SEM de captación de clientes en el sector náutico.",
            "Coordinación de proveedores, reservas, presupuestos y documentación comercial en entorno B2C."
          ],
          tags: ["Social Media", "SEM", "B2C"]
        }
      ]
    },
    education: {
      kicker: "Formación",
      degree: "Doble Grado en ADE y Marketing y Comunicación Digital",
      langsTitle: "Idiomas",
      langs: [
        { name: "Catalán", level: "Nativo", pct: 100 },
        { name: "Español", level: "Nativo", pct: 100 },
        { name: "Inglés", level: "B2 · uso profesional", pct: 70 }
      ]
    },
    skills: {
      kicker: "Competencias",
      title: "Herramientas y especialidades",
      softTitle: "Soft skills",
      groups: [
        { icon: "target", title: "Estrategia digital", items: ["Planificación estratégica", "Funnel y lead generation", "Growth marketing", "Marketing de contenidos", "B2B y B2C"] },
        { icon: "mail", title: "Email marketing y CRM", items: ["Mailchimp", "Brevo", "HubSpot", "Segmentación", "Automatizaciones", "Nurturing", "Entregabilidad", "RGPD"] },
        { icon: "chart", title: "Analítica y datos", items: ["Google Analytics 4", "Search Console", "Looker Studio", "Tableau", "Power BI", "Plan de medición", "Key events", "UTMs"] },
        { icon: "funnel", title: "SEO y paid", items: ["SEO on-page", "SEO de contenidos", "Google Ads (búsqueda)", "Google Tag Manager"] },
        { icon: "spark", title: "Contenido y diseño", items: ["Canva", "Affinity Designer", "Affinity Publisher", "DaVinci Resolve", "Vídeo para redes"] },
        { icon: "event", title: "Web y ofimática", items: ["WordPress", "Excel avanzado", "PowerPoint", "Word", "Microsoft 365"] }
      ],
      soft: ["Pensamiento analítico", "Autonomía", "Orientación a resultados", "Comunicación con Dirección", "Adaptabilidad", "Gestión del tiempo"]
    },
    portfolio: {
      kicker: "Portafolio",
      title: "Casos y campañas",
      intro: "Una selección de proyectos: el reto, qué hice y cómo lo medí.",
      filtersLabel: "Filtrar proyectos",
      all: "Todos",
      viewCase: "Ver el caso",
      sample: "Métricas de ejemplo",
      sampleNote: "Las cifras de este caso son ilustrativas y están pendientes de sustituir por datos reales.",
      context: "Contexto",
      challenge: "Reto",
      actions: "Qué hice",
      results: "Resultados",
      tools: "Herramientas",
      empty: "Todavía no hay proyectos en esta categoría.",
      categories: { strategy: "Estrategia", analytics: "Analítica", email: "Email & CRM", events: "Ferias y eventos", paid: "SEM / Paid", content: "Contenido" }
    },
    contact: {
      kicker: "Contacto",
      title: "¿Hablamos de tu próximo proyecto?",
      text: "Estoy abierto a nuevas oportunidades y colaboraciones en marketing digital estratégico. Escríbeme y te responderé muy pronto.",
      email: "Escríbeme"
    }
  },

  en: {
    meta: {
      title: "Andrés Roldán Baldó · Digital Marketing",
      description: "Andrés Roldán Baldó — Digital Marketing Manager. Strategy, analytics, email marketing, content and conversion funnels in B2B and B2C environments."
    },
    ui: {
      skip: "Skip to content",
      navLabel: "Main navigation",
      langLabel: "Language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      close: "Close",
      downloadCv: "Download CV",
      downloadCvLong: "Download CV (PDF, Spanish)",
      footer: "Custom-built · Hosted on GitHub Pages",
      toTop: "Back to top ↑",
      present: "Present"
    },
    nav: { about: "About", experience: "Experience", skills: "Skills", portfolio: "Portfolio", contact: "Contact" },
    hero: {
      eyebrow: "Strategic digital marketing",
      title: "I turn data into <em>decisions</em> that grow the business.",
      lead: "I'm Andrés Roldán, Digital Marketing Manager. Strategy, analytics, email marketing, content and conversion funnels across B2B and B2C.",
      ctaPortfolio: "See portfolio",
      ctaContact: "Let's talk",
      photoAlt: "Placeholder for Andrés Roldán's photo",
      photoPending: "Photo coming soon",
      float1: "Data-driven",
      float2: "Funnel & leads",
      facts: [
        { value: "BA + MKT", label: "Double degree · UPC" },
        { value: "B2B · B2C", label: "Experience in both" },
        { value: "CA · ES · EN", label: "Working languages" }
      ]
    },
    about: {
      kicker: "About",
      title: "Analyse, detect, prioritise, execute.",
      p1: "I'm a digital marketing professional with a double degree in Business Administration and Digital Marketing & Communication (Euncet, UPC). I currently lead marketing autonomously at a company undergoing digital transformation: strategy, analytics, email marketing, content, conversion funnel and trade fairs.",
      p2: "Analytical and results-driven, with B2B and B2C experience and the ability to turn data into decisions and present them to senior management.",
      method: [
        { title: "Analyse", text: "Web, email and social data as the starting point." },
        { title: "Detect", text: "Find what's not working and where the opportunity is." },
        { title: "Prioritise", text: "Rank actions by expected impact." },
        { title: "Execute", text: "Implement, measure and report with clear KPIs." }
      ]
    },
    experience: {
      kicker: "Career",
      title: "Professional experience",
      items: [
        {
          role: "Digital Marketing Manager",
          company: "Tecnotrip, S.A.",
          place: "Terrassa, Barcelona",
          start: "Jun 2025",
          end: null,
          bullets: [
            "Designed and launched the digital marketing strategic plan and operational roadmap, with goals, KPIs and regular reporting to management.",
            "Analysed digital channel performance (web, email and social) to spot improvement opportunities and prioritise actions by impact.",
            "Redesigned the conversion funnel: lead acquisition, nurturing and conversion through valuable content, forms and automation.",
            "Defined the measurement model: conversion events, UTMs and dashboards in Google Analytics 4 and Looker Studio.",
            "Managed and optimised email marketing: database quality and segmentation, automation, deliverability and GDPR compliance.",
            "Planned and ran trade-fair marketing: booth space and graphics, invitation campaigns, live social content and lead capture.",
            "Created content: newsletters, SEO blog posts, LinkedIn and Instagram posts and video, graphic and brand assets.",
            "Supported international market prospecting."
          ],
          tags: ["Strategy", "GA4", "Looker Studio", "Email", "Trade fairs"]
        },
        {
          role: "Digital Marketing Intern",
          company: "Grifoll Print Solutions",
          place: "Rubí, Barcelona",
          start: "Jan 2025",
          end: "Jun 2025",
          bullets: [
            "Took part in the HubSpot CRM rollout, supporting setup and order management with WordPress.",
            "Market analysis and competitive benchmarking in industrial sectors to support decision-making.",
            "Optimised digital marketplaces and B2B performance campaigns."
          ],
          tags: ["HubSpot", "WordPress", "Benchmarking", "B2B"]
        },
        {
          role: "Marketing & Administration Specialist",
          company: "GoSailingBCN",
          place: "Barcelona",
          start: "2022",
          end: "2024",
          bullets: [
            "Managed the brand's social media autonomously, growing the community and organic engagement.",
            "Designed and monitored SEM campaigns to acquire customers in the nautical sector.",
            "Coordinated suppliers, bookings, quotes and sales documentation in a B2C environment."
          ],
          tags: ["Social Media", "SEM", "B2C"]
        }
      ]
    },
    education: {
      kicker: "Education",
      degree: "Double Degree in Business Administration and Digital Marketing & Communication",
      langsTitle: "Languages",
      langs: [
        { name: "Catalan", level: "Native", pct: 100 },
        { name: "Spanish", level: "Native", pct: 100 },
        { name: "English", level: "B2 · professional use", pct: 70 }
      ]
    },
    skills: {
      kicker: "Skills",
      title: "Tools and specialties",
      softTitle: "Soft skills",
      groups: [
        { icon: "target", title: "Digital strategy", items: ["Strategic planning", "Funnel & lead generation", "Growth marketing", "Content marketing", "B2B & B2C"] },
        { icon: "mail", title: "Email marketing & CRM", items: ["Mailchimp", "Brevo", "HubSpot", "Segmentation", "Automation", "Nurturing", "Deliverability", "GDPR"] },
        { icon: "chart", title: "Analytics & data", items: ["Google Analytics 4", "Search Console", "Looker Studio", "Tableau", "Power BI", "Measurement plan", "Key events", "UTMs"] },
        { icon: "funnel", title: "SEO & paid", items: ["On-page SEO", "Content SEO", "Google Ads (search)", "Google Tag Manager"] },
        { icon: "spark", title: "Content & design", items: ["Canva", "Affinity Designer", "Affinity Publisher", "DaVinci Resolve", "Social video"] },
        { icon: "event", title: "Web & office", items: ["WordPress", "Advanced Excel", "PowerPoint", "Word", "Microsoft 365"] }
      ],
      soft: ["Analytical thinking", "Autonomy", "Results orientation", "Communicating with management", "Adaptability", "Time management"]
    },
    portfolio: {
      kicker: "Portfolio",
      title: "Cases & campaigns",
      intro: "A selection of projects: the challenge, what I did and how I measured it.",
      filtersLabel: "Filter projects",
      all: "All",
      viewCase: "View case",
      sample: "Sample metrics",
      sampleNote: "The figures in this case are illustrative and still need to be replaced with real data.",
      context: "Context",
      challenge: "Challenge",
      actions: "What I did",
      results: "Results",
      tools: "Tools",
      empty: "No projects in this category yet.",
      categories: { strategy: "Strategy", analytics: "Analytics", email: "Email & CRM", events: "Trade fairs & events", paid: "SEM / Paid", content: "Content" }
    },
    contact: {
      kicker: "Contact",
      title: "Shall we talk about your next project?",
      text: "I'm open to new opportunities and collaborations in strategic digital marketing. Drop me a line and I'll get back to you soon.",
      email: "Email me"
    }
  }
};
