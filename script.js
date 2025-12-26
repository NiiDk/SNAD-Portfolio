/**
 * Samuel Nii Amu Darko - Portfolio
 * Modern, interactive portfolio with smooth animations and gallery filtering
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initGalleryFilter();
    initMobileMenu();
    initSmoothScroll();
    initObserver();
});

/**
 * Gallery Filter Functionality
 */
function initGalleryFilter() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function filterGallery(category) {
        galleryItems.forEach(item => {
            item.classList.remove('active');
        });

        if (category === 'All') {
            galleryItems.forEach(item => {
                item.classList.add('active');
            });
        } else {
            document.querySelectorAll(`.gallery-item[data-category="${category}"]`).forEach(item => {
                item.classList.add('active');
            });
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterGallery(category);
        });
    });

    // Initial filter to show "WebApps" as requested
    filterGallery('WebApps');
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (mobileMenuBtn && mobileMenu && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.add('open');
            mobileOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeDrawer);
        }

        mobileOverlay.addEventListener('click', closeDrawer);

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeDrawer();
            }
        });
    }

    function closeDrawer() {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Smooth Scroll Behavior
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Intersection Observer for Scroll Animations
 */
function initObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-experience, .gallery-item, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
