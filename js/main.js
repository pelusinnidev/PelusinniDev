import i18n from './i18n.js';

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
            currentPage.textContent = i18n.t(`nav.${activeLink.dataset.key}`);
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
                    i18n.setLanguage(lang);
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
                const key = item.dataset.key;
                const newText = i18n.t(`nav.${key}`);
                const newHref = item.getAttribute('href');
                const newIcon = item.getAttribute('data-icon');
                
                if (currentPage) {
                    currentPage.innerHTML = `
                        <i class="fas ${newIcon} current-icon"></i>
                        <span>${newText}</span>
                    `;
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
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    i18n.translatePage();
});

// Typing animation for hero section
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentText = window.typingTexts[currentTextIndex];
    
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
        currentTextIndex = (currentTextIndex + 1) % window.typingTexts.length;
        typeSpeed = 500; // Pause before starting new word
    }
    
    setTimeout(typeText, typeSpeed);
}

// Start typing animation if element exists
if (typingElement) {
    typeText();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
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

// Observe all sections
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
            welcomeOverlay.style.animation = 'fadeOut 0.125s ease-in-out forwards';
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 125);
        }, 625);
    } else if (welcomeOverlay) {
        welcomeOverlay.style.display = 'none';
    }
}

// Initialize welcome animation
handleWelcomeAnimation();

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollButton = document.querySelector('.scroll-top');
    const scrollThreshold = 400;

    function toggleScrollButton() {
        if (window.pageYOffset > scrollThreshold) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }

    if (scrollButton) {
        window.addEventListener('scroll', toggleScrollButton);
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize scroll to top
initializeScrollToTop();

// Set initial theme
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme
setInitialTheme();

// Projects Slider functionality
function initializeProjectsSlider() {
    const slider = document.querySelector('.projects-slider');
    const slides = document.querySelectorAll('.project-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');

    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next');
            }
        });

        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Initialize first state
    updateSlides();

    // Auto-advance every 5 seconds
    let autoAdvance = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });

    slider.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(nextSlide, 5000);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initialization code ...
    
    // Initialize projects slider
    initializeProjectsSlider();
});

// Tech Stack Filter functionality
function initializeTechStackFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techItems = document.querySelectorAll('.tech-item');

    // Initial visibility
    techItems.forEach(item => {
        item.classList.add('visible');
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Simple filter
            techItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('filtered-out');
                } else {
                    item.classList.add('filtered-out');
                }
            });
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initialization code ...
    
    // Initialize tech stack filter
    initializeTechStackFilter();
});

// Initialize tech stack grid
function initializeTechStack() {
    const techGrid = document.querySelector('.tech-grid');
    if (!techGrid) return;

    const techStack = {
        mobile: [
            { name: 'Swift', icon: 'fab fa-swift' },
            { name: 'SwiftUI', icon: 'fab fa-apple' },
            { name: 'Kotlin', icon: 'fab fa-android' },
            { name: 'Android', icon: 'fab fa-android' }
        ],
        web: [
            { name: 'HTML5', icon: 'fab fa-html5' },
            { name: 'CSS3', icon: 'fab fa-css3-alt' },
            { name: 'JavaScript', icon: 'fab fa-js' },
            { name: 'PHP', icon: 'fab fa-php' },
            { name: 'Laravel', icon: 'fab fa-laravel' }
        ],
        python: [
            { name: 'Python', icon: 'fab fa-python' },
            { name: 'MongoDB', icon: 'fas fa-database' },
            { name: 'MySQL', icon: 'fas fa-database' }
        ],
        tools: [
            { name: 'Git', icon: 'fab fa-git-alt' },
            { name: 'Docker', icon: 'fab fa-docker' }
        ]
    };

    // Limpiar el grid existente
    techGrid.innerHTML = '';

    // Create and place tech items
    Object.entries(techStack).forEach(([category, items]) => {
        items.forEach(tech => {
            const techItem = document.createElement('div');
            techItem.className = 'tech-item visible';
            techItem.dataset.category = category;
            techItem.innerHTML = `
                <i class="${tech.icon}"></i>
                <span>${tech.name}</span>
            `;
            techGrid.appendChild(techItem);
        });
    });

    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter tech items
            const techItems = document.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.classList.remove('filtered-out');
                    item.classList.add('visible');
                } else {
                    item.classList.add('filtered-out');
                    item.classList.remove('visible');
                }
            });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeTechStack();
    i18n.translatePage();
}); 