const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

document.body.classList.add('motion-ready');

const statusText = document.querySelector('.status-text');
const statusMessages = [
  'building AI-powered solutions',
  'engineering reliable software',
  'developing thoughtful digital products',
];

if (statusText && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let statusIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  statusText.textContent = '';

  const typeStatus = () => {
    const message = statusMessages[statusIndex];

    if (!deleting) {
      characterIndex += 1;
      statusText.textContent = message.slice(0, characterIndex);

      if (characterIndex === message.length) {
        deleting = true;
        window.setTimeout(typeStatus, 1500);
        return;
      }

      window.setTimeout(typeStatus, 65);
      return;
    }

    characterIndex -= 1;
    statusText.textContent = message.slice(0, characterIndex);

    if (characterIndex === 0) {
      deleting = false;
      statusIndex = (statusIndex + 1) % statusMessages.length;
      window.setTimeout(typeStatus, 280);
      return;
    }

    window.setTimeout(typeStatus, 35);
  };

  window.setTimeout(typeStatus, 450);
}

const setMenu = (open) => {
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.classList.toggle('open', open);
};

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) setMenu(false);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -25px' });

document.querySelectorAll('.reveal').forEach((element) => {
  if (element.getBoundingClientRect().top < window.innerHeight * 0.94) {
    element.classList.add('visible');
  } else {
    revealObserver.observe(element);
  }
});

document.querySelectorAll('.project-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.project-item');
    const shouldOpen = !item.classList.contains('open');

    document.querySelectorAll('.project-item').forEach((project) => {
      project.classList.remove('open');
      project.querySelector('.project-trigger').setAttribute('aria-expanded', 'false');
    });

    if (shouldOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const updateActiveSection = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
  const position = window.scrollY + 150;
  let activeId = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= position) activeId = section.id;
  });
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
};

window.addEventListener('scroll', updateActiveSection, { passive: true });
updateActiveSection();
