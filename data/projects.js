/*
 * PORTAFOLI — afegeix aquí les teves campanyes i casos.
 * Cada projecte és un objecte. Per afegir-ne un de nou, copia un bloc sencer,
 * canvia l'"id" (únic, sense espais) i omple els textos als tres idiomes.
 *
 * Camps:
 *   id          identificador únic
 *   year        any o període ("2025", "2024–2025")
 *   client      empresa o marca
 *   categories  una o més de: strategy, analytics, email, events, paid, content
 *   sample      true = mostra l'etiqueta "Mètriques d'exemple". Posa-ho a false
 *               quan hi posis dades reals.
 *   cover       { image: "assets/img/projects/nom.webp" } (opcional) o
 *               { icon: "funnel" | "chart" | "event" | "target" | "mail" | "spark", tone: "blue" | "lime" | "coral" }
 *   tools       llista d'eines
 *   metrics     [{ value: "+35%", label: { ca, es, en } }]  (recomanat: 3)
 *   link        URL externa opcional (post de LinkedIn, landing...)
 *   title, summary, context, challenge: { ca, es, en }
 *   actions     { ca: [...], es: [...], en: [...] }
 */
window.PROJECTS = [
  {
    id: "funnel-b2b",
    year: "2025",
    client: "Tecnotrip, S.A.",
    categories: ["strategy", "analytics"],
    sample: true,
    cover: { icon: "funnel", tone: "blue" },
    tools: ["Google Analytics 4", "Looker Studio", "Google Tag Manager", "WordPress", "Brevo"],
    metrics: [
      { value: "+40%", label: { ca: "Leads qualificats", es: "Leads cualificados", en: "Qualified leads" } },
      { value: "2,8%", label: { ca: "Taxa de conversió web", es: "Tasa de conversión web", en: "Web conversion rate" } },
      { value: "100%", label: { ca: "Conversions mesurades", es: "Conversiones medidas", en: "Conversions tracked" } }
    ],
    link: null,
    title: {
      ca: "Redisseny del funnel de conversió B2B",
      es: "Rediseño del funnel de conversión B2B",
      en: "B2B conversion funnel redesign"
    },
    summary: {
      ca: "De visites sense rastre a un funnel mesurable: captació, nurturing i conversió de leads amb un model de mesura a GA4.",
      es: "De visitas sin rastro a un funnel medible: captación, nurturing y conversión de leads con un modelo de medición en GA4.",
      en: "From untracked visits to a measurable funnel: lead acquisition, nurturing and conversion with a GA4 measurement model."
    },
    context: {
      ca: "Empresa industrial en plena transformació digital, amb una web que rebia trànsit però no generava oportunitats comercials identificables.",
      es: "Empresa industrial en plena transformación digital, con una web que recibía tráfico pero no generaba oportunidades comerciales identificables.",
      en: "Industrial company in the middle of its digital transformation, with a website that got traffic but produced no identifiable sales opportunities."
    },
    challenge: {
      ca: "Saber d'on venien els contactes, quins continguts funcionaven i on es perdien els usuaris abans de convertir.",
      es: "Saber de dónde venían los contactos, qué contenidos funcionaban y dónde se perdían los usuarios antes de convertir.",
      en: "Understand where contacts came from, which content worked and where users dropped off before converting."
    },
    actions: {
      ca: [
        "Pla de mesura amb esdeveniments de conversió, key events i convenció d'UTMs per a tots els canals.",
        "Quadre de comandament a Looker Studio per al reporting mensual a Direcció.",
        "Formularis i continguts de valor per etapa del funnel, connectats a automatitzacions de nurturing."
      ],
      es: [
        "Plan de medición con eventos de conversión, key events y convención de UTMs para todos los canales.",
        "Cuadro de mando en Looker Studio para el reporting mensual a Dirección.",
        "Formularios y contenidos de valor por etapa del funnel, conectados a automatizaciones de nurturing."
      ],
      en: [
        "Measurement plan with conversion events, key events and a UTM convention across all channels.",
        "Looker Studio dashboard for monthly reporting to management.",
        "Forms and value content for each funnel stage, connected to nurturing automations."
      ]
    }
  },
  {
    id: "fira-leads",
    year: "2025",
    client: "Tecnotrip, S.A.",
    categories: ["events", "content"],
    sample: true,
    cover: { icon: "event", tone: "lime" },
    tools: ["Canva", "Affinity Designer", "DaVinci Resolve", "Brevo", "LinkedIn", "Instagram"],
    metrics: [
      { value: "350+", label: { ca: "Contactes captats", es: "Contactos captados", en: "Leads captured" } },
      { value: "45%", label: { ca: "Obertura invitacions", es: "Apertura invitaciones", en: "Invitation open rate" } },
      { value: "30", label: { ca: "Peces de contingut", es: "Piezas de contenido", en: "Content pieces" } }
    ],
    link: null,
    title: {
      ca: "Fira sectorial: de l'estand al lead",
      es: "Feria sectorial: del stand al lead",
      en: "Trade fair: from booth to lead"
    },
    summary: {
      ca: "Màrqueting 360º d'una fira: espai i gràfica, campanya d'invitació, contingut en directe i captació de leads.",
      es: "Marketing 360º de una feria: espacio y gráfica, campaña de invitación, contenido en directo y captación de leads.",
      en: "360º trade-fair marketing: booth and graphics, invitation campaign, live content and lead capture."
    },
    context: {
      ca: "Les fires eren el principal punt de contacte comercial, però els contactes no s'integraven al circuit digital posterior.",
      es: "Las ferias eran el principal punto de contacto comercial, pero los contactos no se integraban en el circuito digital posterior.",
      en: "Trade fairs were the main sales touchpoint, but contacts weren't fed into any digital follow-up."
    },
    challenge: {
      ca: "Maximitzar les visites a l'estand i convertir cada conversa en un lead amb seguiment.",
      es: "Maximizar las visitas al stand y convertir cada conversación en un lead con seguimiento.",
      en: "Maximise booth visits and turn every conversation into a lead with follow-up."
    },
    actions: {
      ca: [
        "Disseny de l'espai i de la gràfica alineats amb la marca.",
        "Campanya d'email d'invitació segmentada per tipus de client.",
        "Cobertura en directe a LinkedIn i Instagram i seqüència de seguiment post-fira."
      ],
      es: [
        "Diseño del espacio y de la gráfica alineados con la marca.",
        "Campaña de email de invitación segmentada por tipo de cliente.",
        "Cobertura en directo en LinkedIn e Instagram y secuencia de seguimiento post-feria."
      ],
      en: [
        "Booth space and graphics designed in line with the brand.",
        "Invitation email campaign segmented by customer type.",
        "Live coverage on LinkedIn and Instagram plus a post-fair follow-up sequence."
      ]
    }
  },
  {
    id: "sem-nautic",
    year: "2022–2024",
    client: "GoSailingBCN",
    categories: ["paid", "content"],
    sample: true,
    cover: { icon: "target", tone: "coral" },
    tools: ["Google Ads", "Instagram", "Canva"],
    metrics: [
      { value: "-25%", label: { ca: "Cost per reserva", es: "Coste por reserva", en: "Cost per booking" } },
      { value: "x2", label: { ca: "Engagement orgànic", es: "Engagement orgánico", en: "Organic engagement" } },
      { value: "+60%", label: { ca: "Comunitat a xarxes", es: "Comunidad en redes", en: "Social community" } }
    ],
    link: null,
    title: {
      ca: "Captació SEM i comunitat al sector nàutic",
      es: "Captación SEM y comunidad en el sector náutico",
      en: "SEM acquisition & community in the nautical sector"
    },
    summary: {
      ca: "Campanyes de cerca per captar reserves i gestió autònoma de xarxes socials en un entorn B2C estacional.",
      es: "Campañas de búsqueda para captar reservas y gestión autónoma de redes sociales en un entorno B2C estacional.",
      en: "Search campaigns to drive bookings and hands-on social media management in a seasonal B2C business."
    },
    context: {
      ca: "Empresa d'experiències nàutiques a Barcelona amb forta estacionalitat i molta competència en cerca.",
      es: "Empresa de experiencias náuticas en Barcelona con fuerte estacionalidad y mucha competencia en búsqueda.",
      en: "Barcelona sailing-experience company with strong seasonality and heavy search competition."
    },
    challenge: {
      ca: "Captar clients amb un pressupost ajustat i fer créixer una comunitat pròpia.",
      es: "Captar clientes con un presupuesto ajustado y hacer crecer una comunidad propia.",
      en: "Win customers on a tight budget and grow an owned community."
    },
    actions: {
      ca: [
        "Estructura de campanyes de cerca per intenció i temporada.",
        "Seguiment i optimització periòdica de paraules clau i anuncis.",
        "Calendari editorial i contingut visual per a xarxes socials."
      ],
      es: [
        "Estructura de campañas de búsqueda por intención y temporada.",
        "Seguimiento y optimización periódica de palabras clave y anuncios.",
        "Calendario editorial y contenido visual para redes sociales."
      ],
      en: [
        "Search campaign structure by intent and season.",
        "Regular keyword and ad monitoring and optimisation.",
        "Editorial calendar and visual content for social media."
      ]
    }
  }
];
