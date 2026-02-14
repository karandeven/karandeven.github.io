// Minimal, premium scroll animation
// Samsung-style: subtle, calm, non-distracting

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll(
    '.section, .card, .hero-inner'
  ).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
