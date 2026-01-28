// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Disable retro → remember and go modern
const fx = document.getElementById('fxToggle');
if (fx) {
  fx.addEventListener('click', (e) => {
    e.preventDefault();
    try { localStorage.setItem('retro', 'off'); } catch (_) {}
    window.location.href = './';
  });
}

// Contact mailto
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get('name'));
    const email = encodeURIComponent(data.get('email'));
    const msg = encodeURIComponent(data.get('message'));
    const to = 'karandeven@proton.me';
    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${msg}`;
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

// Ensure retro is default unless user disabled earlier
try {
  if (!localStorage.getItem('retro')) localStorage.setItem('retro', 'on');
} catch (_) {}
