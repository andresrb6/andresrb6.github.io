# andresroldan.github.io

Web personal, CV interactiu i portafoli d'**Andrés Roldán Baldó**, màrqueting digital estratègic.
HTML, CSS i JavaScript sense dependències ni procés de build. Està pensada per a GitHub Pages gratuït i totes les rutes són relatives.

## Estructura

```
.
├── index.html               # One-page: hero, perfil, casos, stack, trajectòria, contacte
├── casos/                   # Una pàgina per cas d'estudi (mateix layout)
│   └── seo-geo-ga4.html
├── 404.html                 # Pàgina d'error
├── .nojekyll                # Serveix els fitxers tal qual (sense Jekyll)
├── assets/
│   ├── css/styles.css       # Estils (colors a :root)
│   ├── js/content.js        # Textos de la web en CA / ES / EN
│   ├── js/main.js           # Idiomes, menú mòbil, CV, animacions
│   ├── js/cases-data.js     # Carrega data/casos.json
│   ├── js/projects-hub.js   # Targetes de "Casos" a la one-page
│   ├── js/case.js           # Plantilla de la pàgina de cas
│   ├── docs/                # CV en PDF descarregable
│   └── img/                 # Favicon i imatges de projectes
└── data/casos.json          # Contingut dels casos d'estudi
```

## Casos de estudio (`data/casos.json`)

Todo el contenido de los casos está en `data/casos.json`; para rellenar KPIs solo se edita texto.

- `null` se muestra como **[PENDIENTE]** y `"measuring"` como **En medición** (en el idioma activo).
- `status`: `audit_done` (Auditoría completada), `in_progress` (En ejecución) o `measured` (Resultados medidos).
- `published: false`: la tarjeta aparece como "Caso en preparación", sin enlace ni enlace desde el CV.
- `cv.bullet`: posición (empezando en 0) del logro de Tecnotrip en el CV que enlaza con el caso.
- Los textos van en `{ "es", "ca", "en" }`.

**Publicar un caso nuevo:** copia `casos/seo-geo-ga4.html` como `casos/<id>.html`, cambia `data-case="<id>"` y los metadatos del `<head>` (title, description, canonical, og:*; en inglés), y pon `"published": true` en su entrada de `casos.json`, y adapta el bloque `application/ld+json` del `<head>` (url, name, description, keywords).

Los datos estructurados (schema.org) de `index.html` describen a la persona (`Person`); cada caso los enlaza como `CreativeWork` con su autor. Si cambias de cargo o empresa, actualiza también ese bloque.

> ⚠️ **Confidencialidad.** Las capturas y cifras absolutas de GA4, Search Console y Brevo deben **anonimizarse o mostrarse como variaciones porcentuales** antes de publicar, y hay que **pedir el visto bueno a la dirección de Tecnotrip**.

> ℹ️ El CV en PDF (`assets/docs/`) no se actualiza solo: puede quedar desactualizado respecto a la web.

> `casos.json` se carga con `fetch()`: funciona en GitHub Pages y con un servidor local (ver abajo), no abriendo `index.html` con doble clic.

## Sistema de disseny

Dues zones, cadascuna amb el seu sistema de referència:

- **Haus Otto (zones clares: inici, perfil, trajectòria, contacte).** Blanc pur i negre, el nom com a wordmark monumental condensat que s'ajusta a l'amplada de la pantalla, titulars de secció a gran escala, l'espai buit com a separador i indicadors de secció a la dreta.
- **Factory.ai (zona fosca de dades: casos i stack).** Canvas `#101010`, dashboard tipus aplicació amb mètriques i barres (dades a `data/casos.json` → `dashboard`), targeta clara (`#eeeeee`) per al cas publicat sobre fons negre, targetes amb contorn per als pendents, marquee d'eines i etiquetes en Geist Mono.
- **Frontier AI (micro-components).** Pills, fletxes d'acció i botons precisos.

Tipografies (Google Fonts): **Archivo** condensada (wordmark i titulars), **Geist** (text) i **Geist Mono** (xifres, dates i etiquetes). Accents: `--signal` (#ee6018) per a estat i senyal, i `--metric` (#a0ca92) per a mètriques. Tots els tokens són a `:root` d'`assets/css/styles.css` i el contrast del text és AA.

## Editar textos i idiomes

Tots els textos són a `assets/js/content.js`. Cada idioma té les mateixes claus. L'idioma es tria amb el selector i es recorda al navegador. També es pot forçar per URL: `?lang=ca`, `?lang=es` o `?lang=en`.

## Provar en local

```bash
python3 -m http.server 8000
# obre http://localhost:8000
```

## Publicar a GitHub Pages (gratuït)

1. Fusiona els canvis a la branca `main`.
2. Al repositori, ves a **Settings → Pages**.
3. A **Source**, tria *Deploy from a branch*, després la branca `main` i la carpeta `/ (root)`.
4. En uns minuts la web estarà a:
   - `https://andresrb6.github.io/andresroldan.github.io/` amb el nom de repositori actual, o
   - `https://andresrb6.github.io/` si canvies el nom del repositori a `andresrb6.github.io`.

Com que les rutes són relatives, funciona en tots dos casos sense tocar res.
