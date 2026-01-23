// ===== Mobile nav toggle =====
const header = document.querySelector("header");
const navToggle = document.querySelector(".nav-toggle");
const body = document.body;

navToggle.addEventListener("click", () => {
  body.classList.toggle("nav-open");
});

// Close nav on link click (mobile)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
  });
});

// ===== Smooth scrolling =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId !== "#") {
      e.preventDefault();
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNav() {
  let currentId = "top";
  const scrollPos = window.scrollY + 80; // offset for sticky header

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

window.addEventListener("scroll", setActiveNav);

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealEls.forEach((el) => observer.observe(el));

// ===== Testimonials slider =====
const testimonials = Array.from(document.querySelectorAll(".testimonial"));
const dotsContainer = document.getElementById("testimonial-dots");
const prevBtn = document.getElementById("testimonial-prev");
const nextBtn = document.getElementById("testimonial-next");
let currentTestimonial = 0;
let autoplayId;

function createDots() {
  testimonials.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("testimonial-dot");
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });
}

function updateTestimonials(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });

  const dots = dotsContainer.querySelectorAll(".testimonial-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function showNextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonials(currentTestimonial);
}

function showPrevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  updateTestimonials(currentTestimonial);
}

function startAutoplay() {
  autoplayId = setInterval(showNextTestimonial, 6000);
}

function stopAutoplay() {
  clearInterval(autoplayId);
}

createDots();
startAutoplay();

nextBtn.addEventListener("click", () => {
  stopAutoplay();
  showNextTestimonial();
  startAutoplay();
});

prevBtn.addEventListener("click", () => {
  stopAutoplay();
  showPrevTestimonial();
  startAutoplay();
});

dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("testimonial-dot")) {
    stopAutoplay();
    currentTestimonial = parseInt(e.target.dataset.index, 10);
    updateTestimonials(currentTestimonial);
    startAutoplay();
  }
});

// ===== Project click hint (example JS hook) =====
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector(".project-title").textContent.trim();
    console.log("Project clicked:", title);
    // You could replace this console.log with opening a case study page or modal.
  });

  const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const enquiryForm = document.getElementById("enquiry-form");
const formMessage = document.getElementById("form-message");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = enquiryForm.elements["name"].value.trim();
    const email = enquiryForm.elements["email"].value.trim();
    const projectType = enquiryForm.elements["projectType"].value.trim();
    const message = enquiryForm.elements["message"].value.trim();

    // Simple front-end validation
    if (!name || !email || !projectType || !message) {
      formMessage.textContent = "Please fill in all required fields before sending.";
      formMessage.classList.remove("form-message--success");
      formMessage.classList.add("form-message--error");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.classList.remove("form-message--success");
      formMessage.classList.add("form-message--error");
      return;
    }

    // At this point, you would normally send the data to a backend or service.
    // For now, we just show a success message and clear the form.
    formMessage.textContent = "Thank you — your enquiry has been recorded. I’ll be in touch soon.";
    formMessage.classList.remove("form-message--error");
    formMessage.classList.add("form-message--success");

    console.log("Enquiry submitted:", {
      name,
      email,
      social: enquiryForm.elements["social"].value.trim(),
      projectType,
      budget: enquiryForm.elements["budget"].value.trim(),
      timeline: enquiryForm.elements["timeline"].value.trim(),
      message,
    });

    enquiryForm.reset();

    // Remove the message after a while (optional)
    setTimeout(() => {
      formMessage.textContent = "";
      formMessage.classList.remove("form-message--success");
    }, 6000);
  });
}

});

// ===== Dynamic year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();
