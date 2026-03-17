// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

function setTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
    themeIcon.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeIcon.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) setTheme(savedTheme);


// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

// Close menu on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});


// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section");
const navLinkElements = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinkElements.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);


// ===== TYPING ANIMATION =====
const typingText = document.getElementById("typing-text");
const phrases = [
  "Software Developer",
  "ML Enthusiast",
  "Problem Solver",
  "C++ Programmer",
  "Python Developer",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 300;
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();


// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function updateCounter() {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    updateCounter();
  });
}


// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(".reveal");
let countersAnimated = false;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate skill bars
        const skillFills = entry.target.querySelectorAll(".skill-fill");
        skillFills.forEach((fill) => {
          fill.style.width = fill.getAttribute("data-width");
        });

        // Animate counters once
        if (entry.target.classList.contains("hero-stats") && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));


// ===== BACK TO TOP =====
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ===== STAGGER REVEAL DELAYS =====
document.querySelectorAll(".about-card, .tech-card, .profile-card, .project-card").forEach((card, index) => {
  card.style.transitionDelay = `${(index % 4) * 0.1}s`;
});
// ===== SKILL BAR ANIMATION =====
function animateSkillBars(container) {
  var fills = container.querySelectorAll(".skill-fill");

  for (var i = 0; i < fills.length; i++) {
    (function(fill, index) {
      var targetWidth = fill.getAttribute("data-width");

      if (!targetWidth || fill.classList.contains("animated")) return;

      // Stagger each bar slightly
      setTimeout(function() {
        // Set the width to trigger CSS transition
        fill.style.width = targetWidth;

        // Add animated class for glow + shimmer + tooltip
        fill.classList.add("animated");

        // Remove glow after animation completes
        setTimeout(function() {
          fill.style.boxShadow = "none";
        }, 2000);

      }, index * 200); // 200ms stagger between each bar

    })(fills[i], i);
  }
}