// Point d entree principal du site AfriTalent - initialise tous les modules au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initDarkMode();
  initNavbarScroll();
  initFadeInObserver();
  initCounters();
  initFreelanceFilter();
  initContactForm();

  function initDarkMode() {
    const btn = document.getElementById('darkModeBtn');
    if (!btn) return;
    const saved = localStorage.getItem('darkMode');
    if (saved === 'on') document.body.classList.add('dark-mode');
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'on' : 'off');
    });
  }

  function initNavbarScroll() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  function initFadeInObserver() {
    const sections = document.querySelectorAll('main section, main');
    sections.forEach(s => s.classList.add('fade-in'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.2 });
    sections.forEach(s => observer.observe(s));
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      el.textContent = current;
    }, 20);
  }

  function initFreelanceFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.freelance-card');
    if (!buttons.length) return;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        cards.forEach(card => {
          card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'flex' : 'none';
        });
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const email = document.getElementById('emailInput').value;
      const message = document.getElementById('messageInput').value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) { valid = false; alert('Adresse email invalide'); }
      if (message.trim().length < 20) { valid = false; alert('Le message doit contenir au moins 20 caracteres'); }
      if (!valid) return;
      const feedback = document.getElementById('formFeedback');
      feedback.style.display = 'block';
      form.reset();
      setTimeout(() => feedback.style.display = 'none', 4000);
    });
  }

});
