document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');
      item.closest('.faq-list')?.querySelectorAll('.faq-item.active').forEach(el => {
        el.classList.remove('active');
      });
      if (!isActive) item.classList.add('active');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .service-card, .team-card, .testimonial-card, .blog-card, .gallery-item, .gallery-page-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  document.addEventListener('scroll', () => {
    document.querySelectorAll('.visible').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, { once: false });

  setTimeout(() => {
    document.querySelectorAll('.card, .service-card, .team-card, .testimonial-card, .blog-card, .gallery-item, .gallery-page-item').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 100);
});
