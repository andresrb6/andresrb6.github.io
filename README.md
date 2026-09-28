# andresroldan.github.io

Web personal, CV interactiu i portafoli d'**Andrés Roldán Baldó**, màrqueting digital estratègic.
HTML, CSS i JavaScript sense dependències ni procés de build. Està pensada per a GitHub Pages gratuït i totes les rutes són relatives.

## Estructura

```
.
├── index.html               # Pàgina única (hero, sobre mi, experiència, competències, portafoli, contacte)
├── 404.html                 # Pàgina d'error
├── .nojekyll                # Serveix els fitxers tal qual (sense Jekyll)
├── assets/
│   ├── css/styles.css       # Estils (colors a :root)
│   ├── js/content.js        # Tots els textos en CA / ES / EN
│   ├── js/main.js           # Idiomes, menú mòbil, renderitzat del CV, animacions
│   ├── js/portfolio.js      # Filtres, targetes i fitxa de detall del portafoli
│   ├── docs/                # CV en PDF descarregable
│   └── img/                 # Favicon, foto personal i portades de projectes
└── data/projects.js         # Dades del portafoli (aquí s'afegeixen campanyes noves)
```

## Afegir una campanya al portafoli

1. Obre `data/projects.js`.
2. Copia un bloc `{ ... }` sencer i enganxa'l dins la llista.
3. Canvia l'`id` i omple els textos en `ca`, `es` i `en`.
4. Posa `sample: false` quan les mètriques siguin reals.
5. Opcional: afegeix una imatge a `assets/img/projects/` i indica-la a `cover: { image: "assets/img/projects/nom.webp" }`.

Els filtres es generen sols a partir de les categories que facis servir (`strategy`, `analytics`, `email`, `events`, `paid`, `content`).

> ⚠️ Les mètriques dels 3 casos inclosos són **d'exemple**. Substitueix-les per dades reals abans de difondre la web.

## Afegir la foto personal

A `index.html`, substitueix el bloc `<figure class="photo-placeholder">…</figure>` per:

```html
<img class="hero-photo" src="assets/img/andres-roldan.webp" alt="Andrés Roldán Baldó" width="760" height="950">
```

Format recomanat: vertical 4:5, 760×950 px com a mínim, WebP o JPG optimitzat (< 200 KB).

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
