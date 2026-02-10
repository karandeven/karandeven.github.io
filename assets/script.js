/**
 * Portfolio Interactive Script
 * karandeven - DevOps & Cloud Engineering
 */

// ============================================
// 1. UTILITY FUNCTIONS
// ============================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function for performance
const debounce = (func, wait = 100) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// ============================================
// 2. YEAR AUTO-UPDATE
// ============================================

const updateYear = () => {
  const yearEl = $('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

// ============================================
// 3. TERMINAL MESSAGE ROTATION
// ============================================

const terminalMessages = [
  'learn → break → fix → repeat',
  '$ sudo systemctl status nginx',
  'Running CI on GitHub Actions…',
  'Provisioning VPC with Terraform…',
  '$ docker build -t app:latest .',
  'Pushing to container registry…',
  'Deploying to AWS EC2…',
  '$ kubectl apply -f deployment.yaml',
  'Rolling update on Kubernetes…',
  'Scanning images with Trivy…',
  '$ tail -f /var/log/syslog | grep ERROR',
  'IaC > manual clicks.',
  '$ chmod +x deploy.sh && ./deploy.sh',
  'Monitoring CPU: 23% | RAM: 45%',
  '$ git push origin main --force-with-lease',
  'Health check: ✓ All systems operational',
];

class TerminalRotator {
  constructor(elementId, messages, interval = 3000) {
    this.element = $(`#${elementId}`);
    this.messages = messages;
    this.interval = interval;
    this.currentIndex = 0;
    this.isRunning = false;
  }

  rotate() {
    if (!this.element) return;

    // Fade out
    this.element.style.opacity = '0';
    this.element.style.transform = 'translateY(-5px)';

    setTimeout(() => {
      // Update message
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      this.element.textContent = this.messages[this.currentIndex];

      // Fade in
      this.element.style.opacity = '1';
      this.element.style.transform = 'translateY(0)';
    }, 300);
  }

  start() {
    if (this.isRunning || !this.element) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => this.rotate(), this.interval);
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  pause() {
    this.stop();
  }

  resume() {
    this.start();
  }
}

// Initialize terminal rotator
const terminal = new TerminalRotator('terminal-output', terminalMessages, 3000);

// ============================================
// 4. SMOOTH SCROLL WITH OFFSET
// ============================================

const initSmoothScroll = () => {
  const navHeight = 100; // Offset for fixed navigation

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Don't prevent default for # only
      if (href === '#') return;

      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = $(`#${targetId}`);

      if (targetElement) {
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, '', href);
      }
    });
  });
};

// ============================================
// 5. SCROLL ANIMATIONS (FADE IN ON SCROLL)
// ============================================

const observeElements = () => {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, options);

  // Observe all cards and sections
  $$('.card, .section, .skill-chip').forEach(el => {
    observer.observe(el);
  });
};

// ============================================
// 6. NAVIGATION HIGHLIGHT ON SCROLL
// ============================================

const highlightNavOnScroll = () => {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a');

  const onScroll = debounce(() => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && 
          window.pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, 100);

  window.addEventListener('scroll', onScroll);
};

// ============================================
// 7. TYPING EFFECT FOR HERO (OPTIONAL)
// ============================================

class TypeWriter {
  constructor(elementId, words, wait = 3000) {
    this.element = $(`#${elementId}`);
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
  }

  type() {
    if (!this.element) return;

    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.textContent = this.txt;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ============================================
// 8. THEME TOGGLE (OPTIONAL FEATURE)
// ============================================

const initThemeToggle = () => {
  const themeToggle = $('#theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
};

// ============================================
// 9. COPY EMAIL TO CLIPBOARD
// ============================================

const initCopyEmail = () => {
  const emailLinks = $$('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('dblclick', (e) => {
      e.preventDefault();
      const email = link.href.replace('mailto:', '');
      
      navigator.clipboard.writeText(email).then(() => {
        // Show temporary notification
        showNotification('Email copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy email:', err);
      });
    });
  });
};

// ============================================
// 10. NOTIFICATION SYSTEM
// ============================================

const showNotification = (message, duration = 3000) => {
  // Remove existing notification
  const existing = $('.notification');
  if (existing) existing.remove();

  // Create notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Remove after duration
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
};

// ============================================
// 11. PERFORMANCE MONITORING
// ============================================

const logPerformance = () => {
  if ('performance' in window && 'timing' in window.performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`%c⚡ Page Load Time: ${pageLoadTime}ms`, 'color: #00e5ff; font-weight: bold;');
      }, 0);
    });
  }
};

// ============================================
// 12. EASTER EGG - KONAMI CODE
// ============================================

const initEasterEgg = () => {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
};

const activateEasterEgg = () => {
  showNotification('🎮 DevOps Mode: Activated! 🚀');
  
  // Add special effect
  document.body.style.animation = 'rainbow 2s linear infinite';
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
};

// ============================================
// 13. PAUSE ANIMATIONS WHEN TAB NOT VISIBLE
// ============================================

const handleVisibilityChange = () => {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      terminal.pause();
    } else {
      terminal.resume();
    }
  });
};

// ============================================
// 14. LOADING SCREEN (OPTIONAL)
// ============================================

const hideLoader = () => {
  const loader = $('#loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 300);
    }, 500);
  }
};

// ============================================
// 15. INITIALIZE EVERYTHING
// ============================================

const init = () => {
  console.log('%ckarandeven.dev', 'color: #00e5ff; font-size: 24px; font-weight: bold;');
  console.log('%c🚀 DevOps & Cloud Engineering Portfolio', 'color: #8b5cf6; font-size: 14px;');
  console.log('%c⚡ Built with vanilla JS - No frameworks needed!', 'color: #10b981; font-size: 12px;');

  // Core functions
  updateYear();
  terminal.start();
  initSmoothScroll();
  observeElements();
  highlightNavOnScroll();
  handleVisibilityChange();
  
  // Optional features
  initCopyEmail();
  initEasterEgg();
  logPerformance();
  
  // Hide loader if exists
  hideLoader();
};

// ============================================
// 16. START WHEN DOM IS READY
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================
// 17. EXPORT FOR MODULES (OPTIONAL)
// ============================================

// If using as ES6 module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    terminal,
    showNotification,
    TypeWriter
  };
}
