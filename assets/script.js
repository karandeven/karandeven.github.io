const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const msgs = [
  'Running CI on GitHub Actions…',
  'Provisioning VPC with Terraform…',
  'Building Docker image…',
  'Pushing to container registry…',
  'Deploying to AWS EC2…',
  'Rolling update on Kubernetes…',
  'Scanning images with Trivy…',
  'Tail -f logs | grep ERROR…',
  'IaC > manual clicks.',
];
let i = 0;
const msgEl = document.getElementById('devops-msg');
setInterval(() => {
  i = (i + 1) % msgs.length;
  if (msgEl) {
    msgEl.style.opacity = 0;
    setTimeout(() => { msgEl.textContent = msgs[i]; msgEl.style.opacity = 1; }, 250);
  }
}, 2200);
