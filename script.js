// Lightweight navigation, scroll effects, and progressive reveals.
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".primary-nav");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

const closeMenu = () => {
  document.body.classList.remove("nav-open");
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("nav-open", !isOpen);
  nav.classList.toggle("open", !isOpen);
  navToggle.setAttribute("aria-expanded", String(!isOpen));
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (nav.classList.contains("open") && !nav.contains(e.target) && !navToggle.contains(e.target)) {
    closeMenu();
  }
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
