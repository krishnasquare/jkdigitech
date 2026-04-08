/* ════════════════════════════════════════════════
   JK DIGI TECH — MAIN JAVASCRIPT
   js/main.js
   ════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════
     SMOOTH SCROLL
     ══════════════════════════════════ */
  window.smoothScroll = function (id) {
    const el = document.getElementById(id);
    if (!el) return;

    const navHeight = 70;
    const top       = el.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  /* ══════════════════════════════════
     MOBILE MENU
     ══════════════════════════════════ */
  window.toggleMenu = function () {
    const menu   = document.getElementById('mobileMenu');
    const toggle = document.getElementById('mobileToggle');
    if (!menu || !toggle) return;

    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);

    /* Prevent body scroll when menu is open */
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  window.closeMenu = function () {
    const menu   = document.getElementById('mobileMenu');
    const toggle = document.getElementById('mobileToggle');
    if (!menu || !toggle) return;

    menu.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  /* Close menu on outside click */
  document.addEventListener('click', (e) => {
    const menu   = document.getElementById('mobileMenu');
    const toggle = document.getElementById('mobileToggle');
    if (
      menu &&
      menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      window.closeMenu();
    }
  });

  /* Close menu on escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeMenu();
  });

  /* ══════════════════════════════════
     CONTACT FORM
     ══════════════════════════════════ */
  window.submitForm = function () {
    const name    = document.getElementById('fname');
    const email   = document.getElementById('femail');
    const phone   = document.getElementById('fphone');
    const service = document.getElementById('fservice');
    const msg     = document.getElementById('fmsg');
    const form    = document.getElementById('contactForm');

    if (!name || !email || !phone || !form) return;

    /* Basic validation */
    const errors = [];
    if (!name.value.trim())        errors.push('Please enter your name.');
    if (!isValidEmail(email.value))errors.push('Please enter a valid email address.');
    if (!phone.value.trim())       errors.push('Please enter your phone number.');

    if (errors.length > 0) {
      showFormError(errors[0]);
      return;
    }

    /* Show loading state */
    const btn      = form.querySelector('.btn-submit');
    if (btn) {
      btn.textContent = '⏳ Sending...';
      btn.disabled    = true;
    }

    /* Simulate async submit (replace with real fetch/API call) */
    setTimeout(() => {
      const clientName = name.value.trim();
      const clientSvc  = service && service.value ? service.value : 'digital marketing';

      form.innerHTML = `
        <div class="success-msg">
          <div class="success-icon">✅</div>
          <h3>Message Sent!</h3>
          <p>Thank you <strong style="color:#22D3EE;">${escapeHtml(clientName)}</strong>! Your interest in <em>${escapeHtml(clientSvc)}</em> has been noted.</p>
          <p style="margin-top:8px;font-size:13px;color:rgba(255,255,255,0.4);">We'll get back to you within 2 hours during business hours.</p>
          <p style="margin-top:14px;font-size:13px;">
            📞 Or call us directly: 
            <a href="tel:+919701477827" style="color:#22D3EE;font-weight:700;">+91 9701477827</a>
          </p>
          <button 
            onclick="resetForm()" 
            style="margin-top:22px;padding:10px 24px;background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.35);border-radius:8px;color:#22D3EE;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.3s;"
            onmouseover="this.style.background='rgba(6,182,212,0.22)'"
            onmouseout="this.style.background='rgba(6,182,212,0.12)'">
            ← Send Another Message
          </button>
        </div>
      `;
    }, 900);
  };

  /* Reset form back to original */
  window.resetForm = function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.innerHTML = `
      <h3 class="form-title">Request Free Consultation</h3>
      <input class="form-input" type="text" id="fname" placeholder="Your Full Name" required />
      <input class="form-input" type="email" id="femail" placeholder="Email Address" required />
      <input class="form-input" type="tel" id="fphone" placeholder="Phone Number" required />
      <select class="form-input form-select" id="fservice">
        <option value="">Select Service</option>
        <option>SEO Optimization</option>
        <option>Social Media Marketing</option>
        <option>Web Development</option>
        <option>Pay-Per-Click Ads</option>
        <option>Content Marketing</option>
        <option>Analytics &amp; Reporting</option>
      </select>
      <textarea class="form-input form-textarea" id="fmsg" placeholder="Tell us about your project..." rows="4"></textarea>
      <button class="btn-submit" onclick="submitForm()">🚀 Send Free Consultation Request</button>
    `;
  };

  /* Show inline form error */
  function showFormError(msg) {
    /* Remove existing error */
    const existing = document.querySelector('.form-error');
    if (existing) existing.remove();

    const err = document.createElement('div');
    err.className  = 'form-error';
    err.textContent = msg;
    err.style.cssText = `
      background: rgba(239,68,68,0.1);
      border: 1px solid rgba(239,68,68,0.35);
      border-radius: 8px;
      padding: 10px 14px;
      color: #FCA5A5;
      font-size: 13px;
      margin-bottom: 12px;
      animation: fadeInDown 0.3s ease;
    `;

    const form = document.getElementById('contactForm');
    if (form) form.insertBefore(err, form.querySelector('.btn-submit'));

    /* Auto remove after 4s */
    setTimeout(() => err.remove(), 4000);
  }

  /* ══════════════════════════════════
     HELPERS
     ══════════════════════════════════ */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function escapeHtml(str) {
    const map = { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' };
    return str.replace(/[&<>"']/g, (c) => map[c]);
  }

  /* ══════════════════════════════════
     CURSOR GLOW EFFECT (Desktop)
     ══════════════════════════════════ */
  function initCursorGlow() {
    if (window.matchMedia('(hover: none)').matches) return; /* skip touch devices */

    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: left 0.12s ease, top 0.12s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

  /* ══════════════════════════════════
     WHATSAPP FLOAT BUTTON
     ══════════════════════════════════ */
  function initWhatsApp() {
    const btn = document.createElement('a');
    btn.href   = 'https://wa.me/919701477827?text=Hi%20JK%20Digi%20Tech!%20I%20am%20interested%20in%20your%20digital%20marketing%20services.';
    btn.target = '_blank';
    btn.rel    = 'noopener noreferrer';
    btn.title  = 'Chat on WhatsApp';
    btn.innerHTML = `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    `;
    btn.style.cssText = `
      position: fixed;
      bottom: 82px;
      right: 28px;
      width: 50px;
      height: 50px;
      background: #25D366;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 24px rgba(37,211,102,0.45);
      z-index: 500;
      transition: all 0.35s ease;
    `;

    btn.addEventListener('mouseenter', () => {
      btn.style.transform  = 'scale(1.12) translateY(-3px)';
      btn.style.boxShadow  = '0 10px 36px rgba(37,211,102,0.65)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1) translateY(0)';
      btn.style.boxShadow = '0 6px 24px rgba(37,211,102,0.45)';
    });

    document.body.appendChild(btn);
  }

  /* ══════════════════════════════════
     INIT
     ══════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initWhatsApp();
  });

})();
