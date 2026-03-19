'use strict';

// 1. Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// 2. Petals
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

// 5. Attire tab toggle
(function initAttireTabs() {
  const tabs = document.querySelectorAll('.attire-tab');
  const panels = document.querySelectorAll('.attire-panel');
  if (!tabs.length || !panels.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.add('hidden'));
      tab.classList.add('active');
      const targetPanel = document.getElementById(`tab-${tab.dataset.tab}`);
      if (targetPanel) targetPanel.classList.remove('hidden');
    });
  });
})();

// 6. Lightbox
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbClose = document.getElementById('lightbox-close');
  if (!lightbox) return;

  function openLightbox(src, caption) {
    lbImg.src = src;
    lbCaption.textContent = caption;
    lightbox.classList.add('active');
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => { lbImg.src = ''; lbCaption.textContent = ''; }, 300);
  }

  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      openLightbox(thumb.dataset.img, thumb.dataset.caption);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
})();

// 7. Hamburger Menu
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    hamburger.innerHTML = isExpanded ? '&#9776;' : '&#10005;';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
      hamburger.innerHTML = '&#9776;';
    });
  });
})();

// 8. Calendar Render
(function initCalendar() {
  const grid = document.querySelector('.cal-grid');
  if (!grid) return;
  const WEDDING = { year: 2026, month: 11, day: 25 }; 
  const daysInMonth = new Date(WEDDING.year, WEDDING.month + 1, 0).getDate();
  const firstDay = new Date(WEDDING.year, WEDDING.month, 1).getDay();

  for (let i = 0; i < firstDay; i++) {
    const emptyObj = document.createElement('div');
    emptyObj.className = 'cal-day empty';
    grid.appendChild(emptyObj);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day';
    const dayOfWeek = new Date(WEDDING.year, WEDDING.month, d).getDay();
    if (dayOfWeek === 0) cell.classList.add('sunday');
    if (d === WEDDING.day) {
      cell.classList.add('wedding-day');
      cell.title = 'The Wedding Day';
      cell.textContent = d;
    } else {
      cell.textContent = d;
    }
    grid.appendChild(cell);
  }
})();

// 9. ADD TO CALENDAR (.ics download)
(function initAddToCalendar() {
  const icsBtn = document.getElementById('ics-download-btn');
  if (icsBtn) {
    icsBtn.addEventListener('click', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Maria & Juan Wedding//EN',
        'BEGIN:VEVENT',
        'UID:mariaandjuan-wedding-20261225@wedding',
        'DTSTART:20261225T080000Z',
        'DTEND:20261225T150000Z',
        'SUMMARY:Maria & Juan Wedding',
        'DESCRIPTION:Wedding ceremony at Manila Cathedral (4:00 PM)\\nReception at Manila Hotel Grand Ballroom (7:00 PM)\\nDress code: Formal – Blush & Gold',
        'LOCATION:Manila Cathedral\\, Intramuros\\, Manila\\, Philippines',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n');

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'Maria-Juan-Wedding.ics';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
})();

// 10. RSVP MODAL
(function initRsvpModal() {
  const modal = document.getElementById('rsvp-modal');
  const openBtn = document.getElementById('rsvp-open-btn');
  const closeBtn = document.getElementById('rsvp-modal-close');
  const form = document.getElementById('rsvp-form');
  const successMsg = document.getElementById('rsvp-success');
  if (!modal || !openBtn || !closeBtn || !form) return;

  function openModal() {
    modal.classList.add('active');
    successMsg.classList.add('hidden');
    form.classList.remove('hidden');
    form.reset();
  }
  function closeModal() { modal.classList.remove('active'); }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const rsvpData = {
      name: document.getElementById('rsvp-name').value,
      email: document.getElementById('rsvp-email').value,
      attending: document.querySelector('input[name="attending"]:checked').value,
      guests: document.getElementById('rsvp-guests').value,
      note: document.getElementById('rsvp-note').value,
      timestamp: Date.now()
    };
    let rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
    rsvps.push(rsvpData);
    localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
    setTimeout(closeModal, 3000);
  });
})();

// 11. GUEST MESSAGES
(function initMessages() {
  const form = document.getElementById('msg-form');
  const wall = document.getElementById('msg-wall');
  if (!form || !wall) return;

  function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function formatTime(timestamp) {
    const d = new Date(timestamp);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  }

  function renderMessages() {
    wall.innerHTML = '';
    const messages = JSON.parse(localStorage.getItem('weddingMessages') || '[]');
    if (messages.length === 0) {
      wall.innerHTML = '<p style="color:var(--blush); grid-column:1/-1; text-align:center;">Be the first to leave a message!</p>';
      return;
    }
    messages.forEach((m, idx) => {
      const card = document.createElement('div');
      card.className = 'msg-card';
      card.style.animationDelay = `${idx * 0.05}s`;
      card.innerHTML = `
        <div class="msg-card-header">
          <span class="msg-card-name">${escapeHtml(m.name)}</span>
          <span class="msg-card-time">${formatTime(m.time)}</span>
        </div>
        <p class="msg-card-text">${escapeHtml(m.text)}</p>
      `;
      wall.appendChild(card);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const nameInput = document.getElementById('msg-name');
    const textInput = document.getElementById('msg-text');
    const newMsg = { name: nameInput.value.trim(), text: textInput.value.trim(), time: Date.now() };
    const messages = JSON.parse(localStorage.getItem('weddingMessages') || '[]');
    messages.unshift(newMsg);
    localStorage.setItem('weddingMessages', JSON.stringify(messages));
    form.reset();
    renderMessages();
  });

  renderMessages();
  setInterval(() => {
    const prevCount = wall.children.length;
    const currentList = JSON.parse(localStorage.getItem('weddingMessages') || '[]');
    if (currentList.length > prevCount || (prevCount === 1 && wall.innerText.includes('Be the first'))) {
      renderMessages();
    }
  }, 2000);
})();

// 12. ATTIRE SLIDESHOW
(function initAttireSlideshow() {
  function buildSlideshow(slideshowEl, dotsContainerId) {
    const slides    = Array.from(slideshowEl.querySelectorAll('.slide'));
    const dotsEl    = document.getElementById(dotsContainerId);
    const prevBtn   = slideshowEl.querySelector('.slide-prev');
    const nextBtn   = slideshowEl.querySelector('.slide-next');
    let current     = 0;
    let timer;

    if (!slides.length) return;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      if (dotsEl) dotsEl.appendChild(dot);
    });

    function updateDots() {
      if (!dotsEl) return;
      dotsEl.querySelectorAll('.slide-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    }

    function goTo(idx) {
      slides[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      updateDots();
      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 4000);
    }

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));
    resetTimer();
  }

  const menSS   = document.getElementById('slideshow-men');
  const womenSS = document.getElementById('slideshow-women');
  if (menSS)   buildSlideshow(menSS,   'dots-men');
  if (womenSS) buildSlideshow(womenSS, 'dots-women');

  // Re-init when tab is switched to reset active slides
  document.querySelectorAll('.attire-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = `slideshow-${tab.dataset.tab}`;
      const ss = document.getElementById(targetId);
      if (ss) {
        const slides = ss.querySelectorAll('.slide');
        if (![...slides].some(s => s.classList.contains('active'))) {
          slides[0] && slides[0].classList.add('active');
        }
      }
    });
  });
})();
