// NAV SCROLL
const navbar = document.getElementById('navbar');
const stickyCta = document.getElementById('stickyCta');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Nav style
  navbar.classList.toggle('scrolled', scrollY > 40);

  // Sticky CTA
  stickyCta.classList.toggle('show', scrollY > 400);

  // Active nav
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current || (current === 'home' && a.getAttribute('href') === '#'));
  });
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblings = [...el.parentElement.children];
      const idx = siblings.indexOf(el);
      el.style.animationDelay = (idx * 0.1) + 's';
      el.classList.add('visible');
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .course-card, .testimonial-card').forEach(el => observer.observe(el));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
