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
  function toSlug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
  const slugMap = {};
  buttons.forEach(b => { slugMap[toSlug(b.dataset.filter)] = b.dataset.filter; });
  slugMap['design'] = 'Brand & design';
  slugMap['software'] = 'Web apps & SaaS';
  slugMap['websites'] = 'E-commerce';
  slugMap['media'] = 'Video & social';
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
    try { history.replaceState(null, '', category === 'All' ? location.pathname : '#' + toSlug(category)); } catch (_) {}
  }));
  function readHash() {
    const hash = decodeURIComponent(location.hash.slice(1)).toLowerCase();
    const resolved = slugMap[hash] || slugMap[toSlug(hash)];
    filter(resolved || 'All');
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

const galleryFilters = document.querySelector('.gallery-filters');
if (galleryFilters) {
  const tiles = [...document.querySelectorAll('.gallery-tile')];
  const gButtons = [...galleryFilters.querySelectorAll('button')];
  const moreButton = document.querySelector('.gallery-more');
  const previewCount = 12;
  let category = 'all';
  let expanded = false;
  function applyGallery() {
    let shown = 0;
    tiles.forEach(tile => {
      const match = category === 'all' || tile.dataset.galleryCat === category;
      const visible = match && (expanded || category !== 'all' || shown < previewCount);
      if (visible) shown++;
      tile.classList.toggle('is-match', match);
      tile.hidden = !visible;
    });
    moreButton.hidden = expanded || category !== 'all' || tiles.length <= previewCount;
  }
  moreButton.textContent = `Show all ${tiles.length} pieces`;
  moreButton.addEventListener('click', () => {
    expanded = true;
    applyGallery();
    tiles[previewCount].focus();
  });
  gButtons.forEach(btn => btn.addEventListener('click', () => {
    category = btn.dataset.galleryFilter;
    gButtons.forEach(b => b.classList.toggle('active', b === btn));
    applyGallery();
  }));
  applyGallery();
}

const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbVideo = lightbox.querySelector('.lightbox-video');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  let items = [];
  let current = 0;
  function getVisibleTiles() { return [...document.querySelectorAll('.gallery-tile.is-match')]; }
  function showItem(index) {
    items = getVisibleTiles();
    if (!items.length) return;
    current = index;
    const tile = items[current];
    const label = tile.dataset.label || '';
    const videoSrc = tile.dataset.video;
    if (videoSrc) {
      lbImg.hidden = true;
      lbVideo.hidden = false;
      lbVideo.src = videoSrc;
      lbVideo.play().catch(() => {});
    } else {
      lbVideo.hidden = true;
      lbVideo.pause();
      lbVideo.removeAttribute('src');
      lbImg.hidden = false;
      lbImg.src = tile.dataset.full || tile.querySelector('img').src;
      lbImg.alt = label;
    }
    lbCaption.textContent = label;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    document.body.style.overflow = '';
  }
  function navigate(dir) {
    items = getVisibleTiles();
    if (!items.length) return;
    current = (current + dir + items.length) % items.length;
    showItem(current);
  }
  document.querySelectorAll('.gallery-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      items = getVisibleTiles();
      current = items.indexOf(tile);
      if (current < 0) current = 0;
      showItem(current);
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}
