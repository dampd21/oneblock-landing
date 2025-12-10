// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDropdowns();
    initScrollAnimations();
    initFAQ();
});

// ===== Mobile Menu =====
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// ===== Dropdowns (Mobile) =====
function initDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        // On mobile, toggle dropdown on click
        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                item.classList.toggle('active');
            });
        }
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up');
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// ===== FAQ Accordion =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Nav Background on Scroll =====
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});
