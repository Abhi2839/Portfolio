(function () {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("back-to-top");
  const typingText = document.getElementById("typing-text");
  const navLinkEls = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const fadeEls = document.querySelectorAll(".fade-up");
  const counters = document.querySelectorAll(".counter");
  const skillBars = document.querySelectorAll(".skill-fill");

  // Theme
  function setTheme(theme) {
    if (theme === "light") {
      body.classList.add("light");
      themeIcon.textContent = "☀️";
    } else {
      body.classList.remove("light");
      themeIcon.textContent = "🌙";
    }
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) setTheme(savedTheme);

  themeToggle.addEventListener("click", function () {
    setTheme(body.classList.contains("light") ? "dark" : "light");
  });

  // Mobile Menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinkEls.forEach(link => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  // Typing Effect
  const phrases = [
    "Software Developer",
    "C++ Programmer",
    "ML Enthusiast",
    "Problem Solver",
    "Python Developer"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeLoop, deleting ? 45 : 85);
  }

  setTimeout(typeLoop, 500);

  // Counter animation
  let counterStarted = false;

  function animateCounters() {
    if (counterStarted) return;

    const heroSection = document.getElementById("home");
    const rect = heroSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counterStarted = true;

      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = target / 60;

        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(interval);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 25);
      });
    }
  }

  // Skill bar animation
  let skillsAnimated = false;
  function animateSkills() {
    if (skillsAnimated) return;

    const skillsSection = document.getElementById("skills");
    const rect = skillsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      skillsAnimated = true;
      skillBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.style.width = bar.getAttribute("data-width");
        }, index * 180);
      });
    }
  }

  // Scroll effects
  function handleScroll() {
    // navbar shadow
    navbar.classList.toggle("scrolled", window.scrollY > 30);

    // back to top
    backToTop.classList.toggle("show", window.scrollY > 500);

    // active nav
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinkEls.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // fade up
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("show");
      }
    });

    animateCounters();
    animateSkills();
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);
  window.addEventListener("resize", handleScroll);

  // Back to top
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
})();

var nums = document.querySelectorAll(".stat-number");
const counters = document.querySelectorAll(".stat-number");
let started = false;

function runCounters() {
  if (started) return;
  started = true;

  counters.forEach(counter => {
    const target = Number(counter.getAttribute("data-target"));
    let count = 0;
    const step = Math.ceil(target / 1);

    const update = () => {
      count += step;
      if (count >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = count;
        requestAnimationFrame(update);
      }
    };

    update();
  });
}

window.addEventListener("load", runCounters);
function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-fill");

  bars.forEach((bar) => {
    const targetWidth = bar.getAttribute("data-width");
    if (targetWidth) {
      bar.style.width = targetWidth;
    }
  });
}

window.addEventListener("load", animateSkillBars);
