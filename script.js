'use strict';

// 1. Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// 2. Floating petals canvas
(function() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
  const petals = Array.from({length: 22}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    r: Math.random() * 5 + 3, speed: Math.random() * 1.2 + 0.3,
    drift: Math.random() * 0.8 - 0.4, alpha: Math.random() * 0.4 + 0.1, rot: Math.random() * Math.PI * 2
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = `rgba(232,160,176,${p.alpha})`;
      ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 1.6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      p.y += p.speed; p.x += p.drift; p.rot += 0.01;
      if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// 3. Countdown Timer
(function() {
  const target = new Date('2026-12-25T16:00:00+08:00').getTime();
  function update() {
    const diff = target - Date.now();
    if (diff <= 0) return;
    document.getElementById('days').textContent    = String(Math.floor(diff/86400000)).padStart(2,'0');
    document.getElementById('hours').textContent   = String(Math.floor(diff/3600000)%24).padStart(2,'0');
    document.getElementById('minutes').textContent = String(Math.floor(diff/60000)%60).padStart(2,'0');
    document.getElementById('seconds').textContent = String(Math.floor(diff/1000)%60).padStart(2,'0');
  }
  update(); setInterval(update, 1000);
})();

// 4. Background music toggle
(function() {
  const btn   = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  if (!btn || !audio) return;
  let playing = false;
  document.addEventListener('click', () => { if (!playing) { audio.play().catch(()=>{}); playing = true; } }, { once: true });
  btn.addEventListener('click', () => {
    if (audio.paused) { audio.play(); btn.textContent = 'Pause'; }
    else              { audio.pause(); btn.textContent = 'Music'; }
  });
})();
