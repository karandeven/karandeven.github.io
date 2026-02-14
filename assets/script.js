// =============================================
// ULTRA PREMIUM BLACK PORTFOLIO - JAVASCRIPT
// =============================================

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
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
      navLinkItems.forEach(link => link.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Terminal Typing Effect
const commands = [
  'kubectl get pods',
  'docker ps -a',
  'terraform apply',
  'git push origin main',
  'npm run build',
  'systemctl status nginx',
  'aws s3 ls',
  'helm install app ./chart'
];

let commandIndex = 0;
const typingCommand = document.getElementById('typingCommand');

function rotateCommand() {
  if (typingCommand) {
    typingCommand.style.opacity = '0';
    setTimeout(() => {
      commandIndex = (commandIndex + 1) % commands.length;
      typingCommand.textContent = commands[commandIndex];
      typingCommand.style.opacity = '1';
    }, 300);
  }
}

setInterval(rotateCommand, 4000);

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

// Observe sections and cards
document.querySelectorAll('.expertise-card, .project-card, .about-grid, .contact-card').forEach(el => {
  observer.observe(el);
});

// Parallax Effect for Gradient Orbs
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.gradient-orb');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// Console Branding
console.log(
  '%ckarandeven.dev',
  'color: #3b82f6; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(59, 130, 246, 0.5);'
);
console.log(
  '%c🚀 DevOps & Cloud Engineering Portfolio',
  'color: #8b5cf6; font-size: 16px; font-weight: bold;'
);
console.log(
  '%c⚡ Ultra Premium Design • Built with Pure HTML, CSS & JS',
  'color: #10b981; font-size: 12px;'
);
console.log(
  '%c💻 No frameworks, just clean code',
  'color: #a3a3a3; font-size: 11px;'
);

// Performance Logging
window.addEventListener('load', () => {
  setTimeout(() => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(
      `%c⏱️ Page loaded in ${pageLoadTime}ms`,
      'color: #3b82f6; font-size: 12px; font-weight: bold;'
    );
  }, 0);
});

// Prevent right-click (Optional - Remove if not needed)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Add year to footer
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = `&copy; ${currentYear} karandeven. All rights reserved.`;
}
