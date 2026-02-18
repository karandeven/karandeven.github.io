(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') {
          return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      });
    });
  }

  function initScrollReveal() {
    if (prefersReducedMotion) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => el.classList.add('active'));
      return;
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
  }

  function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) {
      return;
    }

    let lastScroll = 0;
    const scrollThreshold = 100;

    function handleScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (sections.length === 0 || navLinks.length === 0) {
      return;
    }

    function updateActiveNav() {
      const scrollPosition = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
  }

  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (!navToggle || !nav) {
      return;
    }

    navToggle.addEventListener('click', function() {
      const isOpen = nav.classList.contains('open');
      
      if (isOpen) {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        nav.classList.add('open');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initSmoothScroll();
        initScrollReveal();
        initHeaderScroll();
        initActiveNav();
        initMobileNav();
      });
    } else {
      initSmoothScroll();
      initScrollReveal();
      initHeaderScroll();
      initActiveNav();
      initMobileNav();
    }
  }

  init();
})();
