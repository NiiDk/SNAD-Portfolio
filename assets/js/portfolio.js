'use strict';

const themeButton = document.querySelector('.theme-toggle');
function reflectTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = dark ? '#191a18' : '#f6f5f1';
}
reflectTheme();
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('samuel-portfolio-theme', theme); } catch (_) { /* Optional persistence. */ }
  reflectTheme();
});

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  mobileNav.classList.toggle('is-open', expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    mobileNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) {
    mobileNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

const filterBar = document.querySelector('.filter-bar');
if (filterBar) {
  filterBar.hidden = false;
  const cards = [...document.querySelectorAll('.work-card')];
  const buttons = [...filterBar.querySelectorAll('button')];
  function filter(category) {
    const selected = buttons.some(button => button.dataset.filter === category) ? category : 'All';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    cards.forEach(card => { card.hidden = selected !== 'All' && card.dataset.category !== selected; });
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('.filter-status').textContent = `${count} ${selected === 'All' ? '' : selected.toLowerCase() + ' '}projects shown.`;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filter(category);
    try { history.replaceState(null, '', category === 'All' ? location.pathname : `#${category.toLowerCase()}`); } catch (_) { /* Filtering also works from a local file. */ }
  }));
  function readHash() {
    const match = buttons.find(button => button.dataset.filter.toLowerCase() === location.hash.slice(1));
    filter(match ? match.dataset.filter : 'All');
  }
  readHash();
  window.addEventListener('hashchange', readHash);
}

const copyButton = document.querySelector('.copy-email');
if (copyButton) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('darkosammy2@gmail.com');
      status.textContent = 'Email address copied.';
    } catch (_) {
      status.textContent = 'Copy unavailable here. Select the email address above, or click it to open your email app.';
    }
  });
}
const printButton = document.querySelector('.print-button');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}
