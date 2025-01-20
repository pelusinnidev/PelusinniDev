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
    constructor(icon) {
        this.element = document.createElement('i');
        this.element.className = icon;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speedX = (Math.random() - 0.5) * 1; // Slower movement
        this.speedY = (Math.random() - 0.5) * 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1;
        this.size = Math.random() * (40 - 25) + 25; // Bigger icons
        this.element.style.position = 'absolute';
        this.element.style.fontSize = `${this.size}px`;
        this.element.style.opacity = '0.15'; // More subtle
        this.element.style.color = '#ffffff';
        this.element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        this.element.style.zIndex = '1';
        
        // Add hover effect
        this.element.addEventListener('mouseenter', () => {
            this.element.style.opacity = '0.8';
            this.element.style.transform = `scale(1.2) translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.style.opacity = '0.15';
            this.element.style.transform = `scale(1) translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
        });
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Bounce off edges
        if (this.x <= 0 || this.x >= window.innerWidth) this.speedX *= -1;
        if (this.y <= 0 || this.y >= window.innerHeight) this.speedY *= -1;

        // Apply position
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
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

    techIcons.forEach(icon => {
        const floatingIcon = new FloatingIcon(icon);
        container.appendChild(floatingIcon.element);
        icons.push(floatingIcon);
    });

    function animate() {
        icons.forEach(icon => icon.update());
        requestAnimationFrame(animate);
    }

    animate();

    // Mouse interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        icons.forEach(icon => {
            const dx = mouseX - icon.x;
            const dy = mouseY - icon.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                icon.speedX -= Math.cos(angle) * 0.5;
                icon.speedY -= Math.sin(angle) * 0.5;
            }
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

// Initialize particles
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
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.1,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.05,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
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
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.4
                    }
                },
                push: {
                    particles_nb: 4
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Start other animations
    initTypingAnimation();
    updateFooterYear();
    initFloatingIcons();
    
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