// ==========================================
// DOM Elements
// ==========================================
const sideNav = document.querySelector('.side-nav');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const scrollIndicator = document.querySelector('.scroll-indicator');

// ==========================================
// Mobile Menu Toggle
// ==========================================
function toggleMobileMenu() {
    sideNav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (mobileMenuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ==========================================
// Smooth Scrolling Navigation
// ==========================================
function initSmoothScrolling() {
navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
      e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop,
        behavior: 'smooth'
      });
    }
            
            // Close mobile menu if open
            if (sideNav.classList.contains('active')) {
                toggleMobileMenu();
    }
  });
});
}

// ==========================================
// Active Navigation Link
// ==========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.skill-category, .project-card, .about-content, .contact-content, .floating-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==========================================
// Scroll Indicator Hide/Show
// ==========================================
function handleScrollIndicator() {
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
}

// ==========================================
// Contact Form Handler
// ==========================================
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (name && email && subject && message) {
                // Show success message
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
  } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        maxWidth: '300px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ==========================================
// Floating Card Animation
// ==========================================
function initFloatingCard() {
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        // Add hover effect
        floatingCard.addEventListener('mouseenter', () => {
            floatingCard.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        floatingCard.addEventListener('mouseleave', () => {
            floatingCard.style.transform = 'translateY(-10px) scale(1)';
        });
    }
}

// ==========================================
// Button Hover Effects
// ==========================================
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .social-link, .project-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
});
}

// ==========================================
// Skill Items Animation
// ==========================================
function initSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        // Stagger animation delay
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// Download CV Function
// ==========================================
function initDownloadCV() {
    const downloadButtons = document.querySelectorAll('.social-link[href="#"], a[href="#"]');
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Download CV') || button.textContent.includes('CV')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('CV download functionality will be implemented with actual CV file.', 'info');
            });
        }
    });
}

// ==========================================
// Parallax Effect for Hero Background
// ==========================================
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// ==========================================
// Keyboard Navigation
// ==========================================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && sideNav.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Enter to submit contact form
        if (e.key === 'Enter' && e.ctrlKey && contactForm) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    });
}

// ==========================================
// Performance Optimizations
// ==========================================
function throttle(func, wait) {
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

// ==========================================
// Dark Mode Toggle (Future Enhancement)
// ==========================================
function initThemeToggle() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button (optional)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// ==========================================
// Initialize Everything
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initFloatingCard();
    initButtonEffects();
    initSkillItems();
    initDownloadCV();
    initParallaxEffect();
    initKeyboardNavigation();
    initThemeToggle();
    
    // Add event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Throttled scroll events
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLink();
        handleScrollIndicator();
    }, 16));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target) && 
            sideNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Resize handler
    window.addEventListener('resize', debounce(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && sideNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, 250));
});

// ==========================================
// Page Load Animations
// ==========================================
window.addEventListener('load', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.greeting, .hero-name, .hero-title, .hero-description, .hero-actions');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
  });
}); 

// ==========================================
// Utility Functions
// ==========================================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getScrollPercent() {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

// ==========================================
// Add CSS animations via JavaScript
// ==========================================
const style = document.createElement('style');
style.textContent = `
    /* Initial state for animated elements */
    .greeting, .hero-name, .hero-title, .hero-description, .hero-actions {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    /* Loading animation */
    .floating-card {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    /* Mobile menu animations */
    .side-nav {
        transition: transform 0.3s ease;
    }
    
    .mobile-menu-toggle span {
        transition: all 0.3s ease;
    }
    
    /* Skill items stagger animation */
    .skill-item {
        animation: slideInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Button hover effects */
    .btn, .social-link, .project-link {
        transition: all 0.3s ease;
    }
    
    /* Notification styles */
    .notification {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    /* Scroll indicator animation */
    .scroll-indicator {
        transition: opacity 0.3s ease;
    }
    
    /* Form focus effects */
    .form-group input:focus,
    .form-group textarea:focus {
        transform: translateY(-2px);
    }
    
    /* Project card hover effects */
    .project-card {
        transition: all 0.3s ease;
    }
    
    .project-overlay {
        transition: opacity 0.3s ease;
    }
    
    /* Category hover effects */
    .skill-category {
        transition: all 0.3s ease;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .side-nav.active {
            transform: translateX(0);
        }
    }
`;

document.head.appendChild(style); 