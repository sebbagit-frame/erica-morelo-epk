# Erica Morello — Electronic Press Kit (EPK)

Sitio web promocional oficial de **Erica Morello** — cantante profesional, maestra vocal e integrante del dúo MARCALOLO (Lanús, Buenos Aires).

Sitio tipo portafolio/EPK pensado para prensa, contratación de shows y difusión de su música.

🔗 **Producción:** _(pendiente — URL de Vercel)_

---

## 🛠️ Stack

- **[Astro](https://astro.build/)** — framework orientado a contenido (0 JS por defecto)
- **CSS propio** — `src/styles/style.css`
- **[Vercel](https://vercel.com/)** — hosting + CI/CD

---

## 📁 Estructura

```
public/                Assets servidos sin procesar (URL estable)
├── audio/             Tracks / previews (.mp3)
├── video/             Clips de video
├── images/press/      Fotos de prensa
└── docs/              epk-erica-morelo.pdf (EPK descargable)

src/
├── components/        Secciones de UI (Nav, Hero, Bio, Music, Videos,
│                      Press, Photos, Shows, Marcalolo, Contact, Footer)
├── layouts/           BaseLayout.astro — <head>, fuentes, CSS y script de cliente
├── pages/             index.astro — compone los componentes (file-based routing)
├── scripts/           main.js — animación fade-in al hacer scroll
└── styles/            style.css — estilos globales
```

---

## 🚀 Desarrollo local

Requisitos: **Node.js 22+**

```bash
npm install        # instalar dependencias
npm run dev        # servidor local en http://localhost:4321
npm run build      # compilar a ./dist/
npm run preview    # previsualizar el build de producción
```

© Erica Morello. Todos los derechos reservados.
