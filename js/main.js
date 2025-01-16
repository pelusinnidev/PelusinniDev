// Navigation initialization function
function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const currentPage = document.querySelector('.current-page');
    const languageSelector = document.querySelector('.language-selector');
    let isMenuOpen = false;

    // Set initial current page
    if (currentPage) {
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink) {
            currentPage.textContent = activeLink.textContent;
            currentPage.href = activeLink.getAttribute('href');
        }
    }

    function handleResponsiveNav() {
        const windowWidth = window.innerWidth;
        const navControls = document.querySelector('.nav-controls');
        const langSelectorClone = languageSelector?.cloneNode(true);

        if (windowWidth <= 480 && langSelectorClone && !navLinks.querySelector('.language-selector')) {
            navLinks.appendChild(langSelectorClone);
            
            // Set up language buttons in the cloned selector
            const langButtons = langSelectorClone.querySelectorAll('.lang-btn');
            langButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = e.target.dataset.lang;
                    setLanguage(lang);
                    langButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                });
            });
        } else if (windowWidth > 480) {
            const mobileSelector = navLinks.querySelector('.language-selector');
            if (mobileSelector) {
                mobileSelector.remove();
            }
        }
    }

    function toggleMenu(open) {
        isMenuOpen = open;
        menuToggle.classList.toggle('active', open);
        navLinks.classList.toggle('active', open);
        
        if (open) {
            navLinks.style.display = 'flex';
            setTimeout(() => {
                navLinks.style.opacity = '1';
                navItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }, 10);
        } else {
            navLinks.style.opacity = '0';
            navItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
            });
            setTimeout(() => {
                if (!isMenuOpen) {
                    navLinks.style.display = 'none';
                }
            }, 300);
        }
    }

    if (menuToggle && navLinks && navItems) {
        // Initial responsive setup
        handleResponsiveNav();

        // Handle window resize
        window.addEventListener('resize', handleResponsiveNav);

        // Toggle menu on button click
        menuToggle.addEventListener('click', () => {
            toggleMenu(!isMenuOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !e.target.closest('.nav')) {
                toggleMenu(false);
            }
        });

        // Handle navigation item clicks
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const newText = item.textContent;
                const newHref = item.getAttribute('href');
                
                if (currentPage) {
                    currentPage.textContent = newText;
                    currentPage.href = newHref;
                }
                
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                item.classList.add('active');
                
                toggleMenu(false);
            });
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavigation);

// Typing animation for hero section
const typingTexts = [
    'iOS Developer',
    'Creative Problem Solver',
    'AI & ML Enthusiast',
    'Cloud Architecture Expert',
    'Game Development Lover'
];

let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before starting new word
    }
    
    setTimeout(typeText, typeSpeed);
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

// Welcome animation handling
function handleWelcomeAnimation() {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    const welcomeOverlay = document.querySelector('.welcome-overlay');
    
    if (!hasSeenWelcome && welcomeOverlay) {
        welcomeOverlay.style.display = 'flex';
        sessionStorage.setItem('hasSeenWelcome', 'true');
        
        setTimeout(() => {
            welcomeOverlay.style.animation = 'fadeOut 0.5s ease-in-out forwards';
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 500);
        }, 2500);
    } else if (welcomeOverlay) {
        welcomeOverlay.style.display = 'none';
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Handle welcome animation
    handleWelcomeAnimation();
    
    // Start typing animation
    setTimeout(typeText, 1000);
    
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
    const currentPage = document.querySelector('.current-page');
    const activeLink = document.querySelector('.nav-links a.active');
    
    if (currentPage && activeLink) {
        const key = activeLink.getAttribute('data-key') || 'home';
        currentPage.textContent = translations[lang][key];
    }
    
    // Update active state
    languageButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Store selected language
    localStorage.setItem('language', lang);
}

// Initialize language buttons
languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    // ... existing initialization code ...
}); 