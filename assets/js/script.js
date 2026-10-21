'use strict';

// -------------------------------------------------------------
// Utility toggle function
// -------------------------------------------------------------
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// -------------------------------------------------------------
// Toast notification helper
// -------------------------------------------------------------
const toastBox = document.getElementById("toastBox");
const toastMsg = document.getElementById("toastMsg");

function showToast(message) {
  if (!toastBox) return;
  if (toastMsg) toastMsg.textContent = message;
  toastBox.classList.add("show");
  setTimeout(() => {
    toastBox.classList.remove("show");
  }, 3200);
}

// -------------------------------------------------------------
// Sidebar variables & toggle functionality for mobile
// -------------------------------------------------------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// -------------------------------------------------------------
// Testimonials modal variables & functionality
// -------------------------------------------------------------
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (avatar && modalImg) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
    if (text && modalText) modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);

// -------------------------------------------------------------
// Project detail modal variables & functionality
// -------------------------------------------------------------
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectModalMedia = document.querySelector("[data-project-modal-media]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalDesc = document.querySelector("[data-project-modal-desc]");
const projectModalTags = document.querySelector("[data-project-modal-tags]");
const projectModalLiveBtn = document.querySelector("[data-project-modal-live]");
const projectModalCodeBtn = document.querySelector("[data-project-modal-code]");

function closeProjectModal() {
  if (projectModalContainer && overlay) {
    projectModalContainer.classList.remove("active");
    overlay.classList.remove("active");
    if (projectModalMedia) projectModalMedia.innerHTML = "";
  }
}

if (projectModalCloseBtn) projectModalCloseBtn.addEventListener("click", closeProjectModal);

// -------------------------------------------------------------
// Blog article reader modal variables & functionality
// -------------------------------------------------------------
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalCategory = document.querySelector("[data-blog-modal-category]");
const blogModalDate = document.querySelector("[data-blog-modal-date]");
const blogModalBody = document.querySelector("[data-blog-modal-body]");

function closeBlogModal() {
  if (blogModalContainer && overlay) {
    blogModalContainer.classList.remove("active");
    overlay.classList.remove("active");
  }
}

if (blogModalCloseBtn) blogModalCloseBtn.addEventListener("click", closeBlogModal);

// Global overlay click closes any active modal
if (overlay) {
  overlay.addEventListener("click", function () {
    if (modalContainer && modalContainer.classList.contains("active")) {
      testimonialsModalFunc();
    }
    if (projectModalContainer && projectModalContainer.classList.contains("active")) {
      closeProjectModal();
    }
    if (blogModalContainer && blogModalContainer.classList.contains("active")) {
      closeBlogModal();
    }
  });
}

// -------------------------------------------------------------
// Project detail modal open function
// -------------------------------------------------------------
function openProjectModal(item) {
  const title = item.dataset.title || item.querySelector(".project-title")?.innerText || "Project";
  const category = item.dataset.category || item.querySelector(".project-category")?.innerText || "Project";
  const desc = item.dataset.desc || "Detailed engineering case study and production architecture.";
  const tags = item.dataset.tags ? item.dataset.tags.split(",") : [];
  const mediaSrc = item.dataset.media || item.querySelector("img")?.src || "";
  const isVideo = mediaSrc.endsWith(".mp4") || mediaSrc.endsWith(".webm") || item.dataset.isVideo === "true";
  const liveUrl = item.dataset.live || "";
  const codeUrl = item.dataset.code || "";

  if (projectModalTitle) projectModalTitle.textContent = title;
  if (projectModalCategory) projectModalCategory.textContent = category.toUpperCase();
  if (projectModalDesc) projectModalDesc.textContent = desc;

  if (projectModalTags) {
    projectModalTags.innerHTML = tags.map(t => `<span class="tag-pill">${t.trim()}</span>`).join("");
  }

  if (projectModalMedia) {
    if (isVideo) {
      projectModalMedia.innerHTML = `<video src="${mediaSrc}" controls autoplay loop style="width:100%; border-radius:10px;"></video>`;
    } else {
      projectModalMedia.innerHTML = `<img src="${mediaSrc}" alt="${title}" style="width:100%; border-radius:10px;">`;
    }
  }

  if (projectModalLiveBtn) {
    if (liveUrl && liveUrl !== "#") {
      projectModalLiveBtn.style.display = "inline-flex";
      projectModalLiveBtn.href = liveUrl;
      projectModalLiveBtn.target = "_blank";
      const cleanUrl = liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
      projectModalLiveBtn.innerHTML = `<span class="live-beacon"></span><ion-icon name="open-outline"></ion-icon><span>Visit ${cleanUrl} ↗</span>`;
    } else {
      projectModalLiveBtn.style.display = "none";
    }
  }

  if (projectModalCodeBtn) {
    if (codeUrl && codeUrl !== "#") {
      projectModalCodeBtn.style.display = "inline-flex";
      projectModalCodeBtn.href = codeUrl;
      projectModalCodeBtn.target = "_blank";
    } else {
      projectModalCodeBtn.style.display = "none";
    }
  }

  if (projectModalContainer && overlay) {
    projectModalContainer.classList.add("active");
    overlay.classList.add("active");
  }
}

// -------------------------------------------------------------
// Project click handling (Modal triggers vs Direct Hyperlinks)
// -------------------------------------------------------------
const projectItems = document.querySelectorAll("[data-filter-item]");

projectItems.forEach(item => {
  // Elements that explicitly open the detail modal
  const openTriggers = item.querySelectorAll("[data-project-open], .project-img, .project-title");
  openTriggers.forEach(el => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openProjectModal(item);
    });
  });

  // Ensure direct external hyperlinks navigate without being blocked
  const directLinks = item.querySelectorAll(".project-direct-btn, .project-actions a");
  directLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
});

// -------------------------------------------------------------
// Blog item click handling (opens full article reader modal)
// -------------------------------------------------------------
const blogPostItems = document.querySelectorAll("[data-blog-item]");

blogPostItems.forEach(item => {
  const link = item.querySelector("a");
  if (!link) return;

  link.addEventListener("click", function (e) {
    e.preventDefault();

    const title = item.dataset.blogTitle || item.querySelector(".blog-item-title")?.innerText || "Blog Post";
    const category = item.dataset.blogCategory || item.querySelector(".blog-category")?.innerText || "Insight";
    const date = item.dataset.blogDate || item.querySelector("time")?.innerText || "";
    const content = item.querySelector(".blog-full-content")?.innerHTML || "<p>Coming soon.</p>";

    if (blogModalTitle) blogModalTitle.textContent = title;
    if (blogModalCategory) blogModalCategory.textContent = category;
    if (blogModalDate) blogModalDate.textContent = date;
    if (blogModalBody) blogModalBody.innerHTML = content;

    if (blogModalContainer && overlay) {
      blogModalContainer.classList.add("active");
      overlay.classList.add("active");
    }
  });
});

// -------------------------------------------------------------
// Custom Select & Filter Functionality
// -------------------------------------------------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

const filterFunc = function (selectedValue) {
  for (let i = 0; i < projectItems.length; i++) {
    const itemCat = (projectItems[i].dataset.category || "").toLowerCase();
    if (selectedValue === "all" || selectedValue === itemCat) {
      projectItems[i].classList.add("active");
    } else {
      projectItems[i].classList.remove("active");
    }
  }
}

// Mobile dropdown select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Large screen filter buttons
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// -------------------------------------------------------------
// Contact form validation & dispatch
// -------------------------------------------------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form && form.checkValidity()) {
      if (formBtn) formBtn.removeAttribute("disabled");
    } else {
      if (formBtn) formBtn.setAttribute("disabled", "");
    }
  });
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.querySelector('[name="fullname"]')?.value || "";
    const email = form.querySelector('[name="email"]')?.value || "";
    const message = form.querySelector('[name="message"]')?.value || "";

    const mailtoUrl = `mailto:darkosammy2@gmail.com?subject=${encodeURIComponent("Portfolio Inquiry from " + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    
    showToast("Launching email client with your message...");
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);

    form.reset();
    if (formBtn) formBtn.setAttribute("disabled", "");
  });
}

// -------------------------------------------------------------
// Quick action copy / triggers
// -------------------------------------------------------------
document.querySelectorAll("[data-copy-email]").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    navigator.clipboard.writeText("darkosammy2@gmail.com").then(() => {
      showToast("Email copied: darkosammy2@gmail.com");
    }).catch(() => {
      showToast("Email: darkosammy2@gmail.com");
    });
  });
});

document.querySelectorAll("[data-copy-phone]").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    navigator.clipboard.writeText("+233542232515").then(() => {
      showToast("Phone copied: +233 54 223 2515");
    }).catch(() => {
      showToast("Phone: +233 54 223 2515");
    });
  });
});

// -------------------------------------------------------------
// Page navigation (About, Resume, Portfolio, Blog, Contact)
// -------------------------------------------------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase().trim();

    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Keyboard ESC to close any modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (modalContainer && modalContainer.classList.contains("active")) testimonialsModalFunc();
    if (projectModalContainer && projectModalContainer.classList.contains("active")) closeProjectModal();
    if (blogModalContainer && blogModalContainer.classList.contains("active")) closeBlogModal();
  }
});