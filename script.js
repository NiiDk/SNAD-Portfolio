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
 * Handles category-based filtering with smooth animations
 */
function initGalleryFilter() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function filterGallery(category) {
        // Hide all items first
        galleryItems.forEach(item => {
            item.classList.remove('active');
        });

        // Show items matching the category
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
            // Update active tab styling
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterGallery(category);
        });
    });

    // Initial filter to show "Flyers"
    filterGallery('Flyers');
}

/**
 * Mobile Menu Toggle
 * Handles responsive navigation for mobile devices with drawer effect
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (mobileMenuBtn && mobileMenu && mobileOverlay) {
        // Open menu
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.add('open');
            mobileOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        // Close menu button
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', function () {
                closeDrawer();
            });
        }

        // Close menu when clicking overlay
        mobileOverlay.addEventListener('click', function () {
            closeDrawer();
        });

        // Close menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function () {
                closeDrawer();
            });
        });

        // Close on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeDrawer();
            }
        });

        // Close menu when window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                closeDrawer();
            }
        });
    }

    function closeDrawer() {
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Smooth Scroll Behavior
 * Already handled by CSS, but can add additional scroll behaviors here
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
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
 * Adds fade-in animations as elements come into view
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

    // Observe card elements
    document.querySelectorAll('.card-experience, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Utility: Add custom scroll listeners for advanced animations
 */
function onScrollAnimations() {
    window.addEventListener('scroll', debounce(function () {
        // Add any scroll-based animations here
    }, 100));
}

/**
 * Debounce utility for performance
 * Prevents excessive function calls during scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Dynamic theme switching (optional)
 * Can be expanded for dark mode support
 */
function initThemeSwitcher() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        // Add dark mode class if needed
    }

    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            // Switch to dark mode
        } else {
            // Switch to light mode
        }
    });
}

/**
 * Form submission handling (if contact form is added)
 */
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    }
}

// Performance monitoring
if (window.performance && window.performance.navigation.type === 1) {
    console.log('Page was reloaded');
}
