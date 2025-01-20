// Mobile menu handling
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
        navLinks?.classList.remove('active');
        menuToggle?.classList.remove('active');
    }
});

// Typing animation texts
const typingTexts = [
    'Software Developer',
    'iOS Development Enthusiast',
    'AI & ML Explorer',
    'Cloud Computing Passionate'
];

// Floating icons setup
const techIcons = [
    'fab fa-swift', 'fab fa-android', 'fab fa-flutter',
    'fab fa-html5', 'fab fa-css3', 'fab fa-js',
    'fab fa-php', 'fab fa-laravel', 'fab fa-python',
    'fab fa-git-alt', 'fab fa-github', 'fab fa-docker',
    'fab fa-aws', 'fab fa-apple', 'fab fa-linux',
    'fab fa-react', 'fab fa-angular', 'fab fa-vuejs',
    'fab fa-node', 'fab fa-npm', 'fab fa-sass',
    'fab fa-bootstrap', 'fab fa-figma', 'fab fa-unity'
];

class FloatingIcon {
    constructor(icon, index, total) {
        this.element = document.createElement('i');
        this.element.className = icon;
        
        // Calculate initial position on a circle
        const angle = (index / total) * Math.PI * 2;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        // Make the radius relative to the hero content size
        const heroContent = document.querySelector('.hero-content');
        const heroSize = heroContent ? heroContent.offsetWidth : 500;
        this.radius = (heroSize * 0.75); // Slightly larger than the hero content
        this.angle = angle;
        this.angleSpeed = 0.0005 + (Math.random() * 0.0005); // Slower, more elegant movement
        this.size = Math.random() * (35 - 25) + 25; // Slightly larger icons
        
        this.element.style.position = 'absolute';
        this.element.style.fontSize = `${this.size}px`;
        this.element.style.opacity = '0.4';
        this.element.style.willChange = 'transform';
        this.element.style.zIndex = '1';
        
        // Add hover effect
        this.element.addEventListener('mouseenter', () => {
            this.element.style.opacity = '1';
            this.angleSpeed = 0.0001; // Slow down when hovered
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.style.opacity = '0.4';
            this.angleSpeed = 0.0005 + (Math.random() * 0.0005); // Resume normal speed
        });
    }

    update() {
        // Update angle for circular motion
        this.angle += this.angleSpeed;
        
        // Calculate new position
        this.x = this.centerX + Math.cos(this.angle) * this.radius;
        this.y = this.centerY + Math.sin(this.angle) * this.radius;
        
        // Add slight floating effect
        const floatY = Math.sin(Date.now() * 0.001 + this.angle) * 10;
        const floatX = Math.cos(Date.now() * 0.001 + this.angle) * 10;
        
        // Apply position with smooth animation
        this.element.style.transform = `translate(${this.x + floatX}px, ${this.y + floatY}px) rotate(${this.angle * 57.2958}deg)`;
    }
}

// Initialize floating icons
function initFloatingIcons() {
    console.log('Initializing floating icons...');
    const container = document.getElementById('floatingIcons');
    if (!container) {
        console.error('Floating icons container not found!');
        return;
    }

    const icons = [];
    const totalIcons = techIcons.length;

    techIcons.forEach((icon, index) => {
        const floatingIcon = new FloatingIcon(icon, index, totalIcons);
        container.appendChild(floatingIcon.element);
        icons.push(floatingIcon);
    });

    function animate() {
        icons.forEach(icon => icon.update());
        requestAnimationFrame(animate);
    }

    animate();

    // Update positions on window resize
    window.addEventListener('resize', () => {
        const heroContent = document.querySelector('.hero-content');
        const heroSize = heroContent ? heroContent.offsetWidth : 500;
        
        icons.forEach((icon) => {
            icon.centerX = window.innerWidth / 2;
            icon.centerY = window.innerHeight / 2;
            icon.radius = (heroSize * 0.75);
        });
    });
}

// Typing animation
function initTypingAnimation() {
    console.log('Initializing typing animation...');
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');

    if (!typingElement) {
        console.error('Typing element not found!');
        return;
    }

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
            setTimeout(typeText, 2000);
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeText, 500);
        } else {
            setTimeout(typeText, isDeleting ? 100 : 150);
        }
    }

    typeText();
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const animatedElements = entry.target.querySelectorAll('.tech-item, .project-card');
            if (animatedElements.length) {
                animatedElements.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Update footer year
function updateFooterYear() {
    console.log('Updating footer year...');
    const yearElement = document.querySelector('.footer-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    } else {
        console.error('Footer year element not found!');
    }
}

// Add mouse aura effect
function initMouseAura() {
    const hero = document.querySelector('.hero');
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / hero.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / hero.offsetHeight) * 100;
        
        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
    });
    
    hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--mouse-x', '50%');
        hero.style.setProperty('--mouse-y', '50%');
    });
}

// Update particles configuration for a more subtle effect
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#007AFF', '#5856D6', '#BF5AF2', '#FF2D55']
            },
            shape: {
                type: ['circle', 'triangle'],
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.25,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.15,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#5856D6',
                opacity: 0.2,
                width: 1.2
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: ['grab', 'bubble']
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.4
                    }
                },
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 2,
                    opacity: 0.3,
                    speed: 3
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    });
}

// First-time animation
function firstTimeAnimation() {
    console.log('Running first-time animation...');
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transition = 'opacity 2s ease';
        setTimeout(() => {
            heroSection.style.opacity = '1';
            console.log('First-time animation completed.');
        }, 500);
    } else {
        console.error('Hero section not found!');
    }
}

// Make sure particles are initialized
window.addEventListener('load', () => {
    console.log('Window loaded, initializing particles...');
    if (typeof particlesJS !== 'undefined') {
        initParticles();
        console.log('Particles initialized');
    } else {
        console.error('Particles.js not loaded');
    }
    firstTimeAnimation();
});

// Add bottom fade effect based on mouse position
function initBottomFade() {
    const hero = document.querySelector('.hero');
    const fadeThreshold = 200; // Distance from bottom to start fade

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const distanceFromBottom = rect.bottom - e.clientY;
        
        if (distanceFromBottom < fadeThreshold) {
            const opacity = (distanceFromBottom / fadeThreshold);
            hero.style.setProperty('--fade-opacity', `${1 - opacity}`);
        } else {
            hero.style.setProperty('--fade-opacity', '0');
        }
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--fade-opacity', '0');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Start animations
    initTypingAnimation();
    updateFooterYear();
    initFloatingIcons();
    initMouseAura();
    initBottomFade();
    
    // Initialize observers
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize stagger animations
    document.querySelectorAll('.tech-item, .project-card').forEach(item => {
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
            nav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}); 