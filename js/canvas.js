/* ════════════════════════════════════════════════
   JK DIGI TECH — HERO 3D CANVAS ANIMATION
   js/canvas.js
   ════════════════════════════════════════════════ */

(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, t = 0, raf;

  /* ── Resize handler ── */
  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  /* ── Particles ── */
  const PARTICLE_COUNT = 140;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:     Math.random() * 2000,
    y:     Math.random() * 1200,
    r:     Math.random() * 2.2 + 0.4,
    vx:    (Math.random() - 0.5) * 0.36,
    vy:    (Math.random() - 0.5) * 0.36,
    alpha: Math.random() * 0.65 + 0.18,
  }));

  /* ── Orbital rings ── */
  const RING_COUNT = 8;
  const rings = Array.from({ length: RING_COUNT }, (_, i) => ({
    phase:    (i / RING_COUNT) * Math.PI * 2,
    speed:    (i % 2 === 0 ? 1 : -1) * (0.045 + i * 0.008),
    rXFactor: 105 + i * 48,
    rYFactor: 0.28 + i * 0.015,
    alpha:    0.06 + i * 0.022,
  }));

  /* ── Floating labels ── */
  const LABELS = [
    { text: 'SEO',  color: 'rgba(6,182,212,'   },
    { text: 'ADS',  color: 'rgba(34,211,238,'  },
    { text: 'SMM',  color: 'rgba(103,232,249,' },
    { text: 'WEB',  color: 'rgba(6,182,212,'   },
    { text: 'CRO',  color: 'rgba(34,211,238,'  },
    { text: 'AI',   color: 'rgba(103,232,249,' },
  ];

  /* ── Mouse interactivity ── */
  const mouse = { x: -9999, y: -9999 };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  /* ── Draw grid ── */
  function drawGrid() {
    ctx.strokeStyle = 'rgba(6,182,212,0.032)';
    ctx.lineWidth   = 1;
    const STEP = 55;
    for (let x = 0; x < W; x += STEP) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += STEP) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  /* ── Draw rings ── */
  function drawRings(cx, cy) {
    rings.forEach((ring, i) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * ring.speed);

      const rX = ring.rXFactor;
      const rY = rX * ring.rYFactor + i * 7;

      /* Ring ellipse */
      ctx.beginPath();
      ctx.ellipse(0, 0, rX, rY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(6,182,212,${ring.alpha})`;
      ctx.lineWidth   = 1.4;
      ctx.stroke();

      /* Orbiting node */
      const angle = t * (0.38 + i * 0.055) + ring.phase;
      const nx    = rX * Math.cos(angle);
      const ny    = rY * Math.sin(angle);

      const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, 9);
      const a    = 0.8 + Math.sin(t * 2 + i) * 0.18;
      glow.addColorStop(0, `rgba(34,211,238,${a})`);
      glow.addColorStop(1, 'rgba(34,211,238,0)');

      ctx.beginPath();
      ctx.arc(nx, ny, 6, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.restore();
    });
  }

  /* ── Draw particles ── */
  function drawParticles() {
    particles.forEach((p) => {
      /* Move */
      p.x += p.vx;
      p.y += p.vy;

      /* Wrap */
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      /* Mouse repulsion */
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const force = (80 - dist) / 80 * 0.8;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(103,232,249,${p.alpha})`;
      ctx.fill();
    });
  }

  /* ── Draw connections ── */
  function drawConnections() {
    const CONNECTION_DIST = 115;
    const LOOK_AHEAD = 5;

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < Math.min(i + LOOK_AHEAD, particles.length); j++) {
        const b   = particles[j];
        const dx  = a.x - b.x;
        const dy  = a.y - b.y;
        const d   = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECTION_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(6,182,212,${0.16 * (1 - d / CONNECTION_DIST)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  /* ── Draw central orb ── */
  function drawOrb(cx, cy) {
    /* Glow */
    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
    g1.addColorStop(0,   'rgba(6,182,212,0.4)');
    g1.addColorStop(0.45,'rgba(6,182,212,0.1)');
    g1.addColorStop(1,   'rgba(6,182,212,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 110, 0, Math.PI * 2);
    ctx.fillStyle = g1;
    ctx.fill();

    /* Solid core */
    const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
    g2.addColorStop(0, 'rgba(6,182,212,0.85)');
    g2.addColorStop(1, 'rgba(6,182,212,0.05)');
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fillStyle = g2;
    ctx.fill();

    /* Pulsing ring */
    const pR = 95 + Math.sin(t * 1.6) * 24;
    ctx.beginPath();
    ctx.arc(cx, cy, pR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(34,211,238,${0.14 + Math.sin(t * 1.6) * 0.1})`;
    ctx.lineWidth   = 2;
    ctx.stroke();

    /* Second outer pulse */
    const pR2 = 140 + Math.sin(t * 1.1 + 1) * 18;
    ctx.beginPath();
    ctx.arc(cx, cy, pR2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(6,182,212,${0.06 + Math.sin(t * 1.1) * 0.04})`;
    ctx.lineWidth   = 1;
    ctx.stroke();
  }

  /* ── Draw data streams ── */
  function drawStreams(cx, cy) {
    for (let i = 0; i < 4; i++) {
      const angle = t * 0.22 + (i * Math.PI * 2) / 4;
      const x1    = cx + Math.cos(angle) * 30;
      const y1    = cy + Math.sin(angle) * 30;
      const x2    = cx + Math.cos(angle) * 175;
      const y2    = cy + Math.sin(angle) * 110;

      const sG = ctx.createLinearGradient(x1, y1, x2, y2);
      sG.addColorStop(0, 'rgba(6,182,212,0.55)');
      sG.addColorStop(1, 'rgba(6,182,212,0)');

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = sG;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    }
  }

  /* ── Draw floating labels ── */
  function drawLabels(cx, cy) {
    ctx.font         = 'bold 13px monospace';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    LABELS.forEach((lbl, i) => {
      const angle = (i / LABELS.length) * Math.PI * 2 + t * 0.13;
      const lx    = cx + Math.cos(angle) * (165 + Math.sin(t + i) * 24);
      const ly    = cy + Math.sin(angle) * (112 + Math.cos(t + i) * 18);
      const a     = 0.5 + Math.sin(t * 0.9 + i) * 0.32;

      ctx.fillStyle = lbl.color + Math.max(0.1, a) + ')';
      ctx.fillText(lbl.text, lx, ly);
    });
  }

  /* ── Main draw loop ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;

    drawGrid();
    drawRings(cx, cy);
    drawParticles();
    drawConnections();
    drawOrb(cx, cy);
    drawStreams(cx, cy);
    drawLabels(cx, cy);

    t  += 0.018;
    raf = requestAnimationFrame(draw);
  }

  draw();

  /* ── Cleanup on page hide ── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      draw();
    }
  });

})();
