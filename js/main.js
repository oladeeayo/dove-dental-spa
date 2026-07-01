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
    window.addEventListener('scroll', () => {
      header.classList.toggle('header-scrolled', window.scrollY > 50);
    }, { passive: true });
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
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.service-row-item, .feature, .testimonial-row-item, .team-card, .blog-card, .split, .gallery-strip-item, .gal-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 100);
});
