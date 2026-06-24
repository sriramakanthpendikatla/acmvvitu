/* ACM VVITU — Site interactions */

(function () {
  'use strict';

  // ── Navbar scroll + mobile menu ──
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    if (toggle) {
      toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }
  }

  // Mark active nav link
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a[data-nav]').forEach(link => {
    if (link.dataset.nav === page) link.classList.add('active');
  });

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Stats count-up ──
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const duration = 1800;
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) run();
    }, { threshold: 0.5 }).observe(el);
  });

  // ── FAQ accordion ──
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  // ── Testimonials carousel ──
  const track = document.querySelector('.testi-track');
  const dots = document.querySelectorAll('.testi-dot');
  if (track && dots.length) {
    let idx = 0;
    let timer;

    const go = i => {
      idx = i;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    };

    const next = () => go((idx + 1) % dots.length);
    const start = () => { timer = setInterval(next, 5000); };
    const stop = () => clearInterval(timer);

    dots.forEach((d, i) => d.addEventListener('click', () => { stop(); go(i); start(); }));
    const carousel = document.querySelector('.testi-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stop);
      carousel.addEventListener('mouseleave', start);
    }
    start();
  }

  // ── Filter pills (members / events) ──
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const pills = group.querySelectorAll('.filter-pill');
    const targetSel = group.dataset.filterTarget;
    const items = document.querySelectorAll(targetSel);

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.dataset.filter;
        items.forEach(item => {
          const cats = (item.dataset.category || '').split(/\s+/);
          const show = filter === 'all' || cats.includes(filter);
          item.style.display = show ? '' : 'none';
        });
      });
    });
  });

  // ── Toast helper ──
  window.showToast = function (msg) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
  };

  // ── Form handlers ──
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const type = form.dataset.form;
      if (type === 'contact') {
        showToast('Message sent! We\'ll get back to you within 48 hours.');
      } else if (type === 'register') {
        showToast('Registration submitted! Check your email for confirmation.');
      } else if (type === 'login') {
        showToast('Admin panel coming soon — connect Supabase + NextAuth per system design.');
      }
      form.reset();
    });
  });

  // ── Hero scroll cue ──
  const scrollCue = document.querySelector('.scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const target = document.querySelector('#main-content') || document.querySelector('#stats');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Hero intro complete → show CTAs ──
  document.addEventListener('heroIntroComplete', () => {
    const overlay = document.querySelector('.hero-overlay');
    if (overlay) overlay.classList.add('show-ctas');
  });

  // ── Mini calendar (calendar page) ──
  const calGrid = document.getElementById('miniCalDays');
  if (calGrid) {
    const monthLabel = document.getElementById('calMonthLabel');
    let viewDate = new Date(2025, 7, 1); // Aug 2025
    const eventDays = [12, 24, 5]; // demo event days

    function renderCal() {
      const y = viewDate.getFullYear();
      const m = viewDate.getMonth();
      monthLabel.textContent = viewDate.toLocaleString('en', { month: 'long', year: 'numeric' });

      const first = new Date(y, m, 1).getDay();
      const days = new Date(y, m + 1, 0).getDate();
      const today = new Date();
      let html = ['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => `<div class="dow">${d}</div>`).join('');

      for (let i = 0; i < first; i++) html += '<div class="day"></div>';
      for (let d = 1; d <= days; d++) {
        const cls = ['day'];
        if (eventDays.includes(d)) cls.push('has-event');
        if (today.getFullYear() === y && today.getMonth() === m && today.getDate() === d) cls.push('today');
        html += `<div class="${cls.join(' ')}">${d}</div>`;
      }
      calGrid.innerHTML = html;
    }

    document.getElementById('calPrev')?.addEventListener('click', () => {
      viewDate.setMonth(viewDate.getMonth() - 1);
      renderCal();
    });
    document.getElementById('calNext')?.addEventListener('click', () => {
      viewDate.setMonth(viewDate.getMonth() + 1);
      renderCal();
    });
    renderCal();
  }

  // ── Countdown labels ──
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const target = new Date(el.dataset.countdown);
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { el.textContent = 'Happening now'; return; }
      const days = Math.ceil(diff / 86400000);
      el.textContent = `${days} day${days !== 1 ? 's' : ''} away`;
    };
    tick();
    setInterval(tick, 3600000);
  });
})();
