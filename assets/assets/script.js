// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (dark only by default; can extend to light)
const toggle = document.getElementById('themeToggle');
toggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
});

// Contact form — opens email draft (no backend)
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = encodeURIComponent(data.get('name'));
  const email = encodeURIComponent(data.get('email'));
  const message = encodeURIComponent(data.get('message'));
  const subject = `Portfolio message from ${name}`;
  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
});
