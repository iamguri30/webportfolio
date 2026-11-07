// Gurleen Kaur Portfolio interactions
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('gurleen-theme');

if (savedTheme === 'light') body.classList.add('light-theme');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  localStorage.setItem('gurleen-theme', body.classList.contains('light-theme') ? 'light' : 'dark');
  updateThemeIcon();
});

function updateThemeIcon() {
  const isLight = body.classList.contains('light-theme');
  themeToggle.innerHTML = isLight
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

document.getElementById('year').textContent = new Date().getFullYear();

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Active navigation link while scrolling
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav .nav-link');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

// Subtle 3D tilt on pointer devices; disabled for touch and reduced-motion users
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.matchMedia('(pointer:fine)').matches && !reduceMotion) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Static-site contact form: opens the visitor's email app with a pre-filled message.
// No backend, database, or automatic email sending is used.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const bodyText = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:kaur.gurleen.6810@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  document.getElementById('formNote').textContent = 'Opening your email app…';
  window.location.href = mailto;
});

// Close mobile navigation after selecting a link (Bootstrap also handles data-bs-dismiss)
document.querySelectorAll('#mobileNav a').forEach(link => {
  link.addEventListener('click', () => {
    const offcanvasEl = document.getElementById('mobileNav');
    const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (instance) instance.hide();
  });
});

document.querySelectorAll('.project-art').forEach(project => {
    const img = project.querySelector('img');

    function setScroll() {
        const scrollHeight = img.offsetHeight - project.clientHeight;

        img.style.setProperty('--scroll-distance', `-${Math.max(0, scrollHeight)}px`);
    }

    img.addEventListener('load', setScroll);

    if (img.complete) {
        setScroll();
    }

    project.addEventListener('mouseenter', () => {
        setScroll();
        img.style.top = `var(--scroll-distance)`;
    });

    project.addEventListener('mouseleave', () => {
        img.style.top = '0px';
    });
});