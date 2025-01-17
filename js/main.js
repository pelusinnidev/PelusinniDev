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
document.addEventListener('DOMContentLoaded', initializeNavigation);

// Typing animation for hero section
const typingTexts = [
    'iOS Developer',
    'Apple Ecosystem Enthusiast',
    'AI/ML Explorer',
    'Cloud Computing Enthusiast',
    'Mobile Development Lover',
    'Python Learner',
    'Creative Mind',
    'Minimalistic Design Lover',
    'Tech Explorer',
    'Robotics Enthusiast',
    'Web Development Curious',
    'Minecraft Development Enthusiast'
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

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollButton = document.querySelector('.scroll-top');
    const scrollThreshold = 400; // Show button after scrolling this many pixels

    function toggleScrollButton() {
        if (window.pageYOffset > scrollThreshold) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (scrollButton) {
        window.addEventListener('scroll', toggleScrollButton);
        scrollButton.addEventListener('click', scrollToTop);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle welcome animation
    handleWelcomeAnimation();
    
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Initialize scroll to top
    initializeScrollToTop();
    
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
const languageDropdown = document.querySelector('.language-dropdown');
const currentLangButton = document.querySelector('.current-lang');
const languageButtons = document.querySelectorAll('.lang-btn');

// Toggle language dropdown
if (currentLangButton) {
    currentLangButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });
}

function setLanguage(lang) {
    const currentLangSpan = currentLangButton.querySelector('span');
    currentLangSpan.textContent = lang.toUpperCase();
    
    // Update active state
    languageButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Close dropdown
    languageDropdown.classList.remove('active');
    
    // Store selected language
    localStorage.setItem('language', lang);
}

// Initialize language buttons
languageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setLanguage(btn.dataset.lang);
    });
});

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    // ... existing initialization code ...
});

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

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Filter items
            techItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hide');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.classList.add('hide');
                    }
                }, 300);
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