// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Enable Retro from modern page
const enableRetro = document.getElementById('enableRetro');
if (enableRetro) {
  enableRetro.addEventListener('click', (e) => {
    e.preventDefault();
    try { localStorage.setItem('retro', 'on'); } catch (_) {}
    window.location.href = './retro.html';
  });
}

/*
  Typewriter (word-by-word) — DevOps rules & tools.
  Shows a static "∞ " prefix that never erases.
*/
(function typewriter(){
  const el = document.getElementById('typeTarget');
  if (!el) return;

  const lines = [
    "Linux Rule: everything is a file; build simple tools; connect with pipes.",
    "Kubernetes Rule: declarative desired state; controllers continuously reconcile.",
    "DevOps Rule: CI before CD; test early; shift-left; automate repeatables.",
    "Git Practice: small commits; feature branches; reviews; meaningful messages.",
    "Observability: logs • metrics • traces; latency, traffic, errors, saturation.",
    "IaC: version everything; idempotent applies; immutable infra over pets.",
    "Security: least privilege; secrets out of code; signed artifacts & SBOM.",
    "Tools: Docker · Kubernetes · Helm · Kustomize · GitHub Actions · ArgoCD · Terraform · Ansible · Prometheus · Grafana · Loki · ELK · Nginx · Traefik · PostgreSQL · Redis · Vault · OIDC"
  ];

  let i = 0;  // line index
  let words = [];
  let w = 0;  // word index
  let writing = true;

  function setLine(idx){
    words = lines[idx].split(' ');
    w = 0;
    el.textContent = '';
    writing = true;
  }
  setLine(0);

  function tick(){
    if (writing){
      if (w < words.length){
        el.textContent = (el.textContent ? el.textContent + ' ' : '') + words[w];
        w++;
        setTimeout(tick, 120);  // typing speed per word
      } else {
        writing = false;
        setTimeout(tick, 1100); // hold after full line
      }
    } else {
      if (w > 0){
        const current = el.textContent.trim().split(' ');
        current.pop();
        el.textContent = current.join(' ');
        w--;
        setTimeout(tick, 70);    // deleting speed per word
      } else {
        i = (i + 1) % lines.length;
        setLine(i);
        setTimeout(tick, 250);
      }
    }
  }
  tick();
})();

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
