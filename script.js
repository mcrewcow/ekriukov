const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.11 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const canvas = document.getElementById('cell-field');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !reducedMotion) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let points = [];
  let mouse = { x: -1000, y: -1000 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(76, Math.max(34, Math.floor((width * height) / 26000)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .12,
      vy: (Math.random() - .5) * .12,
      r: Math.random() * 1.4 + .45,
      phase: Math.random() * Math.PI * 2
    }));
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }, { passive: true });
  window.addEventListener('pointerleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function frame(t) {
    ctx.clearRect(0, 0, width, height);

    for (const p of points) {
      const dxm = mouse.x - p.x;
      const dym = mouse.y - p.y;
      const dm = Math.hypot(dxm, dym);
      if (dm < 150) {
        p.x -= dxm * .00025;
        p.y -= dym * .00025;
      }

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
    }

    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 118) {
          ctx.strokeStyle = `rgba(154, 202, 255, ${0.055 * (1 - dist / 118)})`;
          ctx.lineWidth = .65;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const p of points) {
      const pulse = .7 + Math.sin(t * .00055 + p.phase) * .25;
      ctx.fillStyle = `rgba(178, 236, 255, ${.18 * pulse})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  resize();
  requestAnimationFrame(frame);
}

const interactiveCards = document.querySelectorAll('.interactive-card');
interactiveCards.forEach((card) => {
  const flash = () => {
    card.classList.remove('clicked');
    void card.offsetWidth;
    card.classList.add('clicked');
    clearTimeout(card._clickTimer);
    card._clickTimer = setTimeout(() => card.classList.remove('clicked'), 420);
  };

  card.addEventListener('click', flash);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flash();
    }
  });
});
