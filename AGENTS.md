## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


# Erica Morelo — EPK Landing Page

Sitio web tipo Electronic Press Kit (EPK) para la cantante Erica Morelo. Landing page profesional con información artística, sección del dúo MARCALOLO (Erica & Marcos), música, videos, prensa, fotos, shows y contacto.

---

## Instrucciones para Claude

- Todo el código, comentarios y nombres van en **español**
- Usar componentes `.astro` — NO usar frameworks de UI (React, Vue, etc.)
- Mantener el sitio 100% estático — sin SSR, sin API calls en runtime
- Al implementar algo nuevo, actualizar la tabla de Estado actual
- No commitear credenciales, API keys ni tokens
- Respetar la paleta pastel definida en `styles/global.css`

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 5 (static site generator) |
| Lenguaje | TypeScript 5, HTML, CSS |
| Estilos | CSS custom properties (variables), sin Tailwind |
| Scripts | Vanilla JS (`src/scripts/main.js`) |
| Fuentes | Google Fonts: DM Serif Display, DM Sans |
| Deploy | Netlify (conectado a GitHub) |
| Dominio | Pendiente configuración |

---

## Arquitectura

```
PROYECTOEM/
└── site-new/
    ├── public/              → Assets estáticos (favicon, imágenes, EPK PDF)
    ├── src/
    │   ├── components/      → Componentes .astro reutilizables
    │   │   ├── Nav.astro
    │   │   ├── Hero.astro
    │   │   ├── Bio.astro
    │   │   ├── Musica.astro
    │   │   ├── Videos.astro
    │   │   ├── Prensa.astro
    │   │   ├── Fotos.astro
    │   │   ├── Shows.astro
    │   │   ├── Marcalolo.astro
    │   │   ├── Contacto.astro
    │   │   └── Footer.astro
    │   ├── layouts/
    │   │   └── Base.astro   → Layout principal (head, meta, fonts, body)
    │   ├── pages/
    │   │   └── index.astro  → Página principal que ensambla todos los componentes
    │   ├── scripts/
    │   │   └── main.js      → JS vanilla (scroll animations, mobile menu, etc.)
    │   └── styles/
    │       └── global.css   → Variables CSS, reset, tipografía, estilos globales
    ├── astro.config.mjs     → Configuración de Astro
    ├── tsconfig.json        → Configuración TypeScript
    ├── package.json         → Dependencias y scripts
    ├── CLAUDE.md            → Este archivo
    └── AGENTS.md            → Instrucciones para agentes de IA
```

### Principios de estructura

- **Un componente por sección:** cada sección del EPK es un componente `.astro` independiente
- **Layout único:** `Base.astro` contiene `<html>`, `<head>`, meta tags, fonts y el `<slot />`
- **`index.astro` es solo ensamblaje:** importa componentes y los ordena, sin lógica
- **CSS variables centralizadas:** toda la paleta en `global.css`, los componentes usan `var(--nombre)`
- **JS mínimo:** solo para animaciones de scroll y menú mobile

---

## Comandos

```bash
# Desde la carpeta site-new/
cd site-new

npm run dev              # Dev server en http://localhost:4321 (hot reload)
npm run build            # Build de producción → dist/
npm run preview          # Preview del build de producción
```

---

## Paleta de colores (pastel femenino/profesional)

```css
--bg:           #fef9f7;      /* Fondo principal — crema rosado */
--bg-2:         #fdf0ec;      /* Fondo secciones alternas */
--bg-3:         #f7e2dc;      /* Fondo hover / cards */
--border:       rgba(190,110,110,0.13);
--border-mid:   rgba(190,110,110,0.22);
--accent:       #d4849a;      /* Rosa empolvado principal */
--accent-light: #e8a8ba;      /* Rosa claro */
--accent-glow:  rgba(212,132,154,0.18);
--text-1:       #3a1e26;      /* Texto principal — marrón oscuro */
--text-2:       #7d5560;      /* Texto secundario */
--text-3:       #b89098;      /* Texto terciario / labels */
```

**Regla:** nunca usar colores hardcodeados en componentes. Siempre referenciar con `var(--nombre)`.

---

## Tipografía

| Uso | Font | Peso |
|-----|------|------|
| Títulos, nombre artístico | DM Serif Display | 400 (regular + italic) |
| Cuerpo, UI, labels | DM Sans | 300, 400, 500 |

---

## Secciones del EPK

| Sección | Componente | Descripción |
|---------|-----------|-------------|
| Navegación | `Nav.astro` | Fija, links a secciones, botón "Descargar EPK" |
| Hero | `Hero.astro` | Nombre, tagline, CTA principal |
| Biografía | `Bio.astro` | Texto bio + grid de estadísticas |
| Música | `Musica.astro` | Tracklist + links a plataformas |
| Videos | `Videos.astro` | Grid de video cards con thumbnails |
| Prensa | `Prensa.astro` | Citas de medios en cards |
| Fotos | `Fotos.astro` | Galería de prensa + botón descargar ZIP |
| Shows | `Shows.astro` | Lista de próximas fechas con links a entradas |
| MARCALOLO | `Marcalolo.astro` | Sección del dúo: descripción + cards de miembros |
| Contacto | `Contacto.astro` | Cards con booking, prensa, web, redes |
| Footer | `Footer.astro` | Logo, copyright, links a redes |

---

## Contenido real de Erica Morelo

### Datos verificados
- **Nombre completo:** Erica Morelo
- **Origen:** Lanús, Buenos Aires, Argentina
- **Profesión:** Cantante profesional, maestra vocal, profesora de canto
- **Familia musical:** Hermana menor de Marcela Morelo (cantautora argentina)
- **Rol en banda:** Corista estable en los shows en vivo de Marcela Morelo
- **Formación vocal:** Boby Mac Ferry, Wendy Parr, Graca Coceri
- **Dúo:** MARCALOLO (con Marcos)
- **Otras actividades:** Profesora de gimnasia, profesora de yoga
- **Personal:** Madre de dos hijas

### MARCALOLO
- **Integrantes:** Erica Morelo (voz, arreglos vocales) + Marcos (voz, guitarra)
- **Género:** Pop vocal, soul, folclore
- **Nombre mencionado por:** Marcela Morelo en entrevista con Ser Argentino (2021)

### Pendiente de confirmar con la clienta
- [ ] Canciones propias / repertorio específico
- [ ] Links a plataformas (Spotify, YouTube, etc.)
- [ ] Fechas de shows reales
- [ ] Fotos profesionales para la galería
- [ ] Emails de contacto reales
- [ ] Redes sociales activas
- [ ] Logo o identidad visual

---

## Convenciones de código

### Astro / HTML
- Componentes en PascalCase: `Hero.astro`, `SalesForm.astro`
- IDs de sección en minúsculas: `id="musica"`, `id="contacto"`
- Atributos `aria-*` en elementos interactivos
- Imágenes con `alt` descriptivo siempre
- Links externos con `target="_blank" rel="noopener"`

### CSS
- Variables globales en `styles/global.css`
- Estilos de componente dentro de `<style>` en cada `.astro`
- Mobile-first: estilos base para mobile, `@media (min-width: 768px)` para desktop
- Animaciones con `prefers-reduced-motion` respetado
- Sin `!important` — resolver especificidad correctamente

### JavaScript
- Vanilla JS puro en `scripts/main.js`
- `IntersectionObserver` para animaciones de scroll
- Sin dependencias de terceros para interactividad

### Git
- Conventional Commits en español: `feat(hero): agregar efecto parallax`
- Ramas: `main` (producción), `dev` (desarrollo)
- No commitear `dist/`, `node_modules/`, `.astro/`

---

## Deploy

### Flujo previsto
1. Push a `main` en GitHub
2. Netlify detecta el push automáticamente
3. Ejecuta `npm run build`
4. Deploya contenido de `dist/`

### Configuración Netlify
```
Build command:    npm run build
Publish directory: dist/
Node version:     22
```

### Dominio
- Pendiente: registrar dominio para la clienta
- Netlify provee subdominio gratuito: `ericamorelo.netlify.app`

---

## Estado actual del proyecto

| Funcionalidad | Estado |
|--------------|--------|
| Diseño HTML/CSS completo (archivo único) | ✅ Completo |
| Paleta pastel femenina/profesional | ✅ Completo |
| Contenido bio con info real | ✅ Completo |
| Sección MARCALOLO | ✅ Completo |
| Migración a componentes Astro | ⏳ Pendiente |
| Layout Base.astro | ⏳ Pendiente |
| CSS variables en global.css | ⏳ Pendiente |
| Animaciones scroll (IntersectionObserver) | ⏳ Pendiente |
| Menú mobile (hamburguesa) | ⏳ Pendiente |
| Imágenes / fotos reales | ⏳ Esperando clienta |
| Canciones / links plataformas | ⏳ Esperando clienta |
| Shows / fechas reales | ⏳ Esperando clienta |
| Deploy Netlify | ⏳ Pendiente |
| Dominio personalizado | ⏳ Pendiente |
| SEO meta tags (Open Graph, Twitter) | ⏳ Pendiente |
| Favicon personalizado | ⏳ Pendiente |

---

## Notas para mantenimiento futuro

- Para actualizar shows: editar `Shows.astro` → array de objetos con fecha, venue, ciudad, link
- Para agregar fotos: colocar en `public/fotos/` y referenciar en `Fotos.astro`
- Para cambiar paleta: solo tocar variables en `global.css`
- Para agregar página (ej: /marcalolo): crear `src/pages/marcalolo.astro`