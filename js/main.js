// Mobile menu handling
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate nav items
    if (navLinks.classList.contains('active')) {
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    } else {
        navItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
        });
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
        });
    }
});

// Close menu when clicking on a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Typing animation for hero section
const typingTexts = [
    'Software Developer',
    'iOS Development Enthusiast',
    'AI & ML Explorer',
    'Cloud Computing Passionate'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000); // Wait before starting to delete
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        setTimeout(typeText, 500); // Wait before typing next text
    } else {
        setTimeout(typeText, isDeleting ? 100 : 150);
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.querySelectorAll('.highlight, .expertise-card, .project-card, .tech-item').length) {
                entry.target.querySelectorAll('.highlight, .expertise-card, .project-card, .tech-item').forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    typeText();
    
    // Initialize stagger animations
    document.querySelectorAll('.highlight, .expertise-card, .project-card, .tech-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Show navigation on scroll up, hide on scroll down
    let lastScroll = 0;
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateX(-50%)';
            return;
        }
        
        if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
            nav.style.transform = 'translateX(-50%) translateY(-100%)';
            nav.style.opacity = '0';
        } else {
            nav.style.transform = 'translateX(-50%)';
            nav.style.opacity = '1';
        }
        
        lastScroll = currentScroll;
    });
}); 