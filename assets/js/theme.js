/* Set the saved theme before the first paint. Storage may be unavailable. */
try {
  if (localStorage.getItem('samuel-portfolio-theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  }
} catch (_) { /* The default light theme remains usable. */ }
