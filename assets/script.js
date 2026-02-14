// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active Navigation on Scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .expertise-card, .project-card').forEach(el => {
  observer.observe(el);
});

// Dynamic Year in Footer
const yearElement = document.querySelector('.footer-copyright');
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.textContent = `${currentYear} karandeven. All rights reserved.`;
}

// Terminal Typing Effect
const terminalCommands = [
  'kubectl get pods',
  'docker ps -a',
  'terraform apply',
  'git push origin main',
  'npm run build',
  'systemctl status nginx'
];

let commandIndex = 0;
const commandElement = document.querySelector('.typing-cursor');

function rotateCommand() {
  if (commandElement) {
    commandElement.style.opacity = '0';
    setTimeout(() => {
      commandIndex = (commandIndex + 1) % terminalCommands.length;
      commandElement.textContent = terminalCommands[commandIndex];
      commandElement.style.opacity = '1';
    }, 300);
  }
}

setInterval(rotateCommand, 4000);

// Console Branding
console.log('%ckarandeven.dev', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cDevOps & Cloud Engineering', 'color: #8b5cf6; font-size: 14px;');
console.log('%cBuilt with modern web technologies', 'color: #10b981; font-size: 12px;');
