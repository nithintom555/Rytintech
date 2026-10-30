// RytinTech — interactive features
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Mobile navigation
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // Reveal elements when they enter the viewport
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Project category filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      projectCards.forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Package buttons prefill the contact form's service/message
  document.querySelectorAll("[data-package]").forEach(button => {
    button.addEventListener("click", () => {
      const messageField = document.getElementById("message");
      const packageName = button.dataset.package;
      if (messageField && !messageField.value.trim()) {
        messageField.value = `I'm interested in the ${packageName} package. Please share more details.`;
      }
    });
  });

  // Contact form: opens WhatsApp with a prefilled message (no database is used).
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("formStatus");

    if (!name || !email || !service || !message) {
      status.textContent = "Please fill in your name, email, service and project details.";
      return;
    }

    const text = [
      "Hello RytinTech! I'd like to enquire about a project.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Service: ${service}`,
      `Project details: ${message}`
    ].join("\n");

    // RytinTech WhatsApp contact number.
    const whatsappNumber = "919778129429";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    status.textContent = "Opening WhatsApp with your enquiry…";
    window.open(url, "_blank", "noopener,noreferrer");
  });

  // Dynamic footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Highlight current navigation section
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.querySelectorAll("a").forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }
});


// RytinTech intro loader: fade out after the page and its assets finish loading.
const introLoader = document.querySelector(".intro-loader");
if (introLoader) {
  window.addEventListener("load", () => {
    window.setTimeout(() => introLoader.classList.add("done"), 1350);
  });
  // Fallback in case the load event has already fired before this script runs.
  if (document.readyState === "complete") {
    window.setTimeout(() => introLoader.classList.add("done"), 1350);
  }
}
