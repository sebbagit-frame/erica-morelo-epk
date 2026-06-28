// Menú mobile: abre/cierra el panel
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  const setOpen = (open) => {
    navLinks.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  navToggle.addEventListener("click", () =>
    setOpen(!navLinks.classList.contains("open"))
  );

  // Cierra el menú al elegir una sección
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setOpen(false))
  );
}

// Scroll fade-in: revela las secciones al entrar en viewport
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
