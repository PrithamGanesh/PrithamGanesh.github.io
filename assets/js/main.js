(function () {
  "use strict";

  /* ─── Utilities ──────────────────────────────────────── */

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function isTouch() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  /* ─── #12: Page Load Curtain ─────────────────────────── */

  function liftCurtain() {
    var curtain = document.querySelector(".load-curtain");
    if (curtain) {
      curtain.classList.add("lifted");
      curtain.addEventListener("transitionend", function () {
        curtain.remove();
      });
    }
  }

  /* ─── #11: Dark / Light Theme Toggle ─────────────────── */

  function initThemeToggle() {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    var saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    }

    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      toggle.setAttribute(
        "aria-label",
        next === "light" ? "Switch to dark mode" : "Switch to light mode"
      );
    });
  }

  /* ─── #1: Scroll-Triggered Reveal ────────────────────── */

  function initScrollReveals() {
    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    if (prefersReducedMotion.matches) {
      reveals.forEach(function (el) {
        el.classList.add("revealed");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = el.dataset.revealDelay || 0;
            setTimeout(function () {
              el.classList.add("revealed");
            }, Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── #2: Animated Metric Counters ───────────────────── */

  function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      if (!startTime) startTime = now;
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var value = Math.round(easeOutCubic(progress) * target);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function initMetricCounters() {
    var metricValues = document.querySelectorAll(".metric-value[data-count]");
    if (!metricValues.length) return;

    if (prefersReducedMotion.matches) return; // keep static numbers

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.dataset.count, 10);
            if (!isNaN(target)) {
              el.textContent = "0";
              animateCounter(el, target, 1000);
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    metricValues.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── #3: Sticky Header + Active Section Nav ─────────── */

  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    var navLinks = document.querySelectorAll(".site-nav a[href^='#']");
    if (!header || !navLinks.length) return;

    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });

    function onScroll() {
      // Sticky glass effect
      if (window.scrollY > 60) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      // Active section highlighting
      var scrollPos = window.scrollY + window.innerHeight * 0.35;
      var activeLink = null;

      for (var i = sections.length - 1; i >= 0; i--) {
        if (sections[i].section.offsetTop <= scrollPos) {
          activeLink = sections[i].link;
          break;
        }
      }

      navLinks.forEach(function (link) {
        link.classList.remove("nav-active");
      });

      if (activeLink) {
        activeLink.classList.add("nav-active");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ─── #4: Scroll Progress Bar ────────────────────────── */

  function initScrollProgress() {
    var bar = document.querySelector(".scroll-progress");
    if (!bar) return;

    function update() {
      var scrollTop = window.scrollY;
      var docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = percent + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ─── #5: Ambient Glow Parallax ──────────────────────── */

  function initAmbientParallax() {
    if (isTouch() || prefersReducedMotion.matches) return;

    var left = document.querySelector(".ambient-left");
    var right = document.querySelector(".ambient-right");
    if (!left && !right) return;

    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;

    window.addEventListener("resize", function () {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    });

    document.addEventListener("mousemove", function (e) {
      var dx = ((e.clientX - cx) / cx) * -12;
      var dy = ((e.clientY - cy) / cy) * -12;

      if (left) left.style.transform = "translate(" + dx + "px, " + dy + "px)";
      if (right)
        right.style.transform =
          "translate(" + -dx * 0.7 + "px, " + -dy * 0.7 + "px)";
    });
  }

  /* ─── #7: Magnetic CTA ───────────────────────────────── */

  function initMagneticCTA() {
    if (isTouch() || prefersReducedMotion.matches) return;

    var cta = document.querySelector(".button-primary");
    if (!cta) return;

    cta.addEventListener("mousemove", function (e) {
      var rect = cta.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      cta.style.transform =
        "translateY(-2px) translate(" + x * 0.15 + "px, " + y * 0.15 + "px)";
    });

    cta.addEventListener("mouseleave", function () {
      cta.style.transform = "";
    });
  }

  /* ─── #8: Hero Panel Tilt ────────────────────────────── */

  function initHeroPanelTilt() {
    if (isTouch() || prefersReducedMotion.matches) return;

    var panel = document.querySelector(".hero-panel");
    if (!panel) return;

    panel.addEventListener("mousemove", function (e) {
      var rect = panel.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      panel.style.transform =
        "rotateY(" + x * 6 + "deg) rotateX(" + -y * 4 + "deg)";
    });

    panel.addEventListener("mouseleave", function () {
      panel.style.transform = "";
    });
  }

  /* ─── #9: Scroll-Driven Background Gradient ──────────── */

  function initScrollGradient() {
    if (prefersReducedMotion.matches) return;

    function update() {
      var scrollTop = window.scrollY;
      var docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      var t = docHeight > 0 ? scrollTop / docHeight : 0;
      document.documentElement.style.setProperty("--scroll", t.toFixed(3));

      var tealOpacity = (0.18 * (1 - t)).toFixed(3);
      var goldOpacity = (0.16 * t * 1.5).toFixed(3);

      document.body.style.background =
        "radial-gradient(circle at top left, rgba(111, 241, 214, " +
        tealOpacity +
        "), transparent 34%), " +
        "radial-gradient(circle at 85% 18%, rgba(246, 194, 107, " +
        goldOpacity +
        "), transparent 28%), " +
        "linear-gradient(160deg, #07111f 0%, #091729 42%, #0d1321 100%)";
    }

    window.addEventListener("scroll", update, { passive: true });
  }

  /* ─── #10: Typing Headline Effect ────────────────────── */

  function initTypingHeadline() {
    var h1 = document.querySelector(".hero-copy h1");
    if (!h1 || prefersReducedMotion.matches) return;

    var fullText = h1.textContent;
    h1.textContent = "";
    h1.classList.add("typing-cursor");
    h1.style.visibility = "visible";

    var idx = 0;
    var speed = 38;

    function typeChar() {
      if (idx < fullText.length) {
        h1.textContent += fullText.charAt(idx);
        idx++;
        setTimeout(typeChar, speed);
      } else {
        setTimeout(function () {
          h1.classList.add("done");
        }, 1200);
      }
    }

    // Small delay before starting to let the curtain lift
    setTimeout(typeChar, 600);
  }

  /* ─── Dynamic Year (existing functionality) ──────────── */

  function updateYear() {
    var year = document.getElementById("year");
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }

  /* ─── Boot ───────────────────────────────────────────── */

  window.addEventListener("load", function () {
    document.body.classList.remove("is-preload");

    updateYear();
    initThemeToggle();
    liftCurtain();
    initScrollReveals();
    initMetricCounters();
    initStickyHeader();
    initScrollProgress();
    initAmbientParallax();
    initMagneticCTA();
    initHeroPanelTilt();
    initScrollGradient();
    initTypingHeadline();
  });
})();
