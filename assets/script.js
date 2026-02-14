// ============================================
// ULTRA-PREMIUM BLACK PORTFOLIO - SCRIPT
// karandeven - DevOps & Cloud
// Minimal JavaScript for subtle animations
// ============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
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

// Observe sections for fade-in effect
document.querySelectorAll('.about, .stack-category, .experience-item, .contact-grid').forEach(el => {
  observer.observe(el);
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.style.color = 'var(--white)';
        } else {
          link.style.color = 'var(--gray-400)';
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Console message (subtle branding)
console.log('%ckarandeven', 'font-size: 16px; font-weight: 600; color: #ffffff;');
console.log('%cDevOps & Cloud', 'font-size: 12px; color: #a3a3a3;');
