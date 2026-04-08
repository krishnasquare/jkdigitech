/* ════════════════════════════════════════════════
   JK DIGI TECH — SCROLL ANIMATIONS
   js/animations.js
   ════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Intersection Observer for fade-up elements ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          /* Unobserve after trigger (fire once) */
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  /* Observe all fade-up elements */
  function initScrollReveal() {
    document.querySelectorAll('.fade-up').forEach((el) => {
      observer.observe(el);
    });
  }

  /* ── Navbar scroll effect ── */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handler = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler(); // run on load
  }

  /* ── Stat number counter animation ── */
  function animateCounter(el, target, duration = 1800) {
    const isRupee  = target.includes('₹');
    const isPlus   = target.includes('+');
    const isPercent= target.includes('%');

    /* Parse numeric value */
    let numStr = target.replace(/[₹+%Cr]/g, '').trim();
    const num  = parseFloat(numStr);
    const start     = performance.now();
    const startVal  = 0;

    function update(now) {
      const elapsed = now - start;
      const progress= Math.min(elapsed / duration, 1);
      /* Ease out cubic */
      const eased  = 1 - Math.pow(1 - progress, 3);
      const current= Math.floor(startVal + (num - startVal) * eased);

      let display = '';
      if (isRupee)   display = '₹' + current + 'Cr+';
      else if (isPlus && isPercent) display = current + '%+';
      else if (isPlus)   display = current + '+';
      else if (isPercent)display = current + '%';
      else               display = current.toString();

      el.textContent = display;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const statNums = document.querySelectorAll('.stat-num');

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el     = entry.target;
            const target = el.dataset.target || el.textContent.trim();
            el.dataset.target = target; // save original
            animateCounter(el, target);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNums.forEach((el) => counterObserver.observe(el));
  }

  /* ── Smooth hover tilt on service cards ── */
  function initCardTilt() {
    const cards = document.querySelectorAll('.svc-card, .port-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = (e.clientX - rect.left) / rect.width  - 0.5;
        const y      = (e.clientY - rect.top)  / rect.height - 0.5;
        const tiltX  = y * 6;
        const tiltY  = -x * 6;

        card.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        card.style.transition = 'transform 0.15s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        card.style.transition = 'transform 0.45s ease';
      });
    });
  }

  /* ── Typing effect on hero h1 ── */
  function initTypingCursor() {
    /* Subtle blinking cursor after hero title — optional enhancement */
    const heroH1 = document.querySelector('.hero-h1');
    if (!heroH1) return;

    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = `
      color: #22D3EE;
      font-weight: 300;
      margin-left: 4px;
      animation: pulse 1.2s ease infinite;
      display: inline-block;
      vertical-align: baseline;
      font-size: 0.7em;
      opacity: 0;
    `;

    /* Fade in cursor after hero animation completes */
    setTimeout(() => {
      cursor.style.opacity = '1';
    }, 1400);

    /* Hide after 5s */
    setTimeout(() => {
      cursor.style.transition = 'opacity 0.5s';
      cursor.style.opacity    = '0';
    }, 6000);

    heroH1.appendChild(cursor);
  }

  /* ── Active nav link highlight ── */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.remove('active');
              link.style.color = '';
              link.style.background = '';
            });
            navLinks.forEach((link) => {
              const text = link.textContent.toLowerCase();
              if (id === 'hero' && text === 'home') {
                link.style.color = '#22D3EE';
              } else if (id === text) {
                link.style.color = '#22D3EE';
              }
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => sectionObserver.observe(s));
  }

  /* ── Parallax on hero overlay ── */
  function initParallax() {
    const overlay = document.querySelector('.hero-overlay');
    if (!overlay) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        overlay.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ── Floating badge random micro-drift ── */
  function initBadgeDrift() {
    const badges = document.querySelectorAll('.floating-badge');
    badges.forEach((badge, i) => {
      const drift = Math.random() * 4 - 2;
      badge.style.animationDuration = `${2.8 + i * 0.4}s`;
      badge.style.animationDelay    = `${i * 0.35}s`;
    });
  }

  /* ── Page load progress bar ── */
  function initProgressBar() {
    const bar = document.createElement('div');
    bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #06B6D4, #22D3EE, #67E8F9);
      z-index: 9999;
      transition: width 0.3s ease;
      width: 0%;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const percent    = (scrollTop / docHeight) * 100;
      bar.style.width  = percent + '%';
    }, { passive: true });
  }

  /* ── Back to top button ── */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML   = '↑';
    btn.title       = 'Back to top';
    btn.style.cssText = `
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #06B6D4, #0891B2);
      border: none;
      border-radius: 12px;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      z-index: 500;
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.35s ease;
      box-shadow: 0 6px 24px rgba(6,182,212,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(8px) scale(1.08)';
      btn.style.boxShadow = '0 10px 36px rgba(6,182,212,0.6)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = window.scrollY > 300 ? 'translateY(0) scale(1)' : 'translateY(12px) scale(1)';
      btn.style.boxShadow = '0 6px 24px rgba(6,182,212,0.4)';
    });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.opacity   = '1';
        btn.style.transform = 'translateY(0) scale(1)';
      } else {
        btn.style.opacity   = '0';
        btn.style.transform = 'translateY(12px) scale(1)';
      }
    }, { passive: true });
  }

  /* ── Init all ── */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initCounters();
    initCardTilt();
    initTypingCursor();
    initActiveNav();
    initParallax();
    initBadgeDrift();
    initProgressBar();
    initBackToTop();
  });

})();
