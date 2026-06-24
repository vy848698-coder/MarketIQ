/* ============================================
   Market IQ — Shared JavaScript
   Mobile menu · scroll reveal · contact form
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- AOS (Animate On Scroll) library ---- */
  if (window.AOS) {
    AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ---- Theme switcher ---- */
  (function () {
    var fab = document.querySelector('.theme-fab');
    var panel = document.querySelector('.theme-panel');
    if (!fab || !panel) return;
    var opts = panel.querySelectorAll('.theme-opt');

    function setActive(theme) {
      opts.forEach(function (o) {
        o.classList.toggle('active', o.getAttribute('data-theme') === theme);
      });
    }
    function applyTheme(theme) {
      if (theme && theme !== 'crimson') {
        document.documentElement.setAttribute('data-theme', theme);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      try { localStorage.setItem('miq-theme', theme); } catch (e) {}
      setActive(theme);
    }

    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && e.target !== fab) panel.classList.remove('open');
    });
    opts.forEach(function (o) {
      o.addEventListener('click', function () {
        applyTheme(o.getAttribute('data-theme'));
        panel.classList.remove('open');
      });
    });

    // reflect the theme applied by the no-flash head script
    setActive(document.documentElement.getAttribute('data-theme') || 'crimson');
  })();

  /* ---- Mobile menu toggle ---- */
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    // close when a link is tapped
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal animation ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // fallback: just show everything
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Highlight current nav link ---- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Swiper (testimonial slider) ---- */
  if (window.Swiper && document.querySelector('.testimonial-swiper')) {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 22,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        980: { slidesPerView: 3 }
      }
    });
  }

  /* ---- GLightbox (images / video) ---- */
  // Add class="glightbox" to any <a> wrapping an image/video to enable it.
  if (window.GLightbox) {
    GLightbox({ selector: '.glightbox' });
  }

  /* ---- Animated counters for stats ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animate = function (el) {
      const target = parseFloat(el.getAttribute('data-count'));
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400;
      const start = performance.now();
      const tick = function (now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const val = (target * eased).toFixed(decimals);
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const co = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animate(entry.target); co.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    } else {
      counters.forEach(animate);
    }
  }

  /* ---- Contact form (client-side demo) ---- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = form.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      // NOTE: wire this to a backend / email service (Formspree, EmailJS, etc.)
    });
  }

});
