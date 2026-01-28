// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Contact form → open default mail app (no backend)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get('name'));
    const email = encodeURIComponent(data.get('email'));
    const message = encodeURIComponent(data.get('message'));
    const to = 'karandeven@proton.me';
    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
