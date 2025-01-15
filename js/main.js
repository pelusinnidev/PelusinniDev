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
    'iOS Developer',
    'Creative Problem Solver',
    'AI & ML Enthusiast',
    'Cloud Architecture Expert',
    'Game Development Lover'
];

let currentTextIndex = 0;
let typingElement = document.querySelector('.typing-text');

function changeText() {
    typingElement.style.opacity = '0';
    
    setTimeout(() => {
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typingElement.textContent = typingTexts[currentTextIndex];
        typingElement.style.opacity = '0.9';
    }, 300);
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
    // Start text rotation with initial text
    typingElement.textContent = typingTexts[0];
    
    // Change text every 3 seconds
    setInterval(changeText, 3000);
    
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

// Theme handling
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Language handling
const languageButtons = document.querySelectorAll('.lang-btn');
const translations = {
    en: {
        home: 'Home',
        about: 'About',
        expertise: 'Expertise',
        projects: 'Projects',
        techStack: 'Tech Stack',
        contact: 'Contact',
        // Add more translations as needed
    },
    es: {
        home: 'Inicio',
        about: 'Sobre mí',
        expertise: 'Experiencia',
        projects: 'Proyectos',
        techStack: 'Tecnologías',
        contact: 'Contacto',
    },
    ca: {
        home: 'Inici',
        about: 'Sobre mi',
        expertise: 'Experiència',
        projects: 'Projectes',
        techStack: 'Tecnologies',
        contact: 'Contacte',
    }
};

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    
    // Update active button
    languageButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update navigation text
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const key = link.getAttribute('href').replace('#', '');
        if (translations[lang][key]) {
            link.textContent = translations[lang][key];
        }
    });
    
    // Update other text content as needed
}

// Set initial language
const savedLanguage = localStorage.getItem('language') || 'en';
setLanguage(savedLanguage);

// Language button click handlers
languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        setLanguage(lang);
    });
});

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    // ... existing initialization code ...
}); 