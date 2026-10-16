/**
 * Ronit Gupta — Portfolio Script
 * Minimalist, lightweight interaction layer.
 */

document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copyEmailLink');
  const toast = document.getElementById('toast');
  const email = 'ronitgupta138@gmail.com';

  if (!copyBtn) return;

  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  function fallbackCopy() {
    const ta = document.createElement('textarea');
    ta.value = email;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast();
    } catch (err) {
      console.warn('Fallback copy failed:', err);
    }
    document.body.removeChild(ta);
  }

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email)
        .then(showToast)
        .catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  });
});
