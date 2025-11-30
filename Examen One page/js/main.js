
document.addEventListener("DOMContentLoaded", () => {
  // ---------- Variables ----------
  const navbarToggle = document.getElementById("navbarToggle");
  const navbarMenu = document.getElementById("navbarMenu");
  const scrollBtn = document.getElementById("btnScrollTop");
  const submenuParents = document.querySelectorAll(".has-submenu");
const menuToggle = document.querySelector(".nav-toggle"); 
const navLinks = document.querySelector(".nav_links");
  // ---------- Menú hamburguesa ----------
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
      const expanded = navbarToggle.classList.toggle("active");
      navbarMenu.classList.toggle("active");
      // accessibility
      navbarToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      navbarMenu.setAttribute("aria-hidden", expanded ? "false" : "true");
    });
   
    document.querySelectorAll(".navbar_link").forEach(link => {
      link.addEventListener("click", () => {
        navbarMenu.classList.remove("active");
        navbarToggle.classList.remove("active");
        navbarToggle.setAttribute("aria-expanded", "false");
        navbarMenu.setAttribute("aria-hidden", "true");
      });
    });
  }
  
  submenuParents.forEach(parent => {
    parent.addEventListener("click", (ev) => {
      
      if (window.innerWidth <= 768) {
        ev.preventDefault();
        ev.stopPropagation();
        parent.classList.toggle("active");
      }
    });
  });


  // ---------- Scroll Top ----------
  window.addEventListener("scroll", () => {
    if (!scrollBtn) return;
    if (window.scrollY > 300) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  // ---------- Animaciones on scroll ----------
  const animated = document.querySelectorAll(".animate-on-scroll");
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);
  animated.forEach(el => observer.observe(el));
  
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "" || href.startsWith("http")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const navHeight = document.querySelector(".navbar_component").offsetHeight + 12;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPos, behavior: "smooth" });
    });
  });
});