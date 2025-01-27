// Handle mouse movement for hero section gradient
const projectsHero = document.querySelector('.projects-hero');
if (projectsHero) {
    projectsHero.addEventListener('mousemove', (e) => {
        const rect = projectsHero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        projectsHero.style.setProperty('--mouse-x', `${x}%`);
        projectsHero.style.setProperty('--mouse-y', `${y}%`);
    });
}

// Intersection Observer for project cards
const observeCards = () => {
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    cards.forEach(card => observer.observe(card));
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeCards();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle back navigation
const backButton = document.querySelector('.nav-back');
if (backButton) {
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
    });
}

// Add parallax effect to project images
const addParallaxToImages = () => {
    const projectImages = document.querySelectorAll('.project-image');
    
    window.addEventListener('scroll', () => {
        projectImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                const speed = 0.1;
                const yPos = -(rect.top - window.innerHeight) * speed;
                image.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    });
};

// Initialize parallax effect
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addParallaxToImages();
}

// Handle image loading
const images = document.querySelectorAll('img');
let loadedImages = 0;

const imageLoaded = () => {
    loadedImages++;
    if (loadedImages === images.length) {
        document.querySelector('.loading').classList.add('hidden');
    }
};

images.forEach(img => {
    if (img.complete) {
        imageLoaded();
    } else {
        img.addEventListener('load', imageLoaded);
        img.addEventListener('error', imageLoaded); // Handle error cases
    }
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Handle dark mode changes
const darkModeHandler = () => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkMode = (e) => {
        document.documentElement.classList.toggle('dark-mode', e.matches);
    };

    darkModeMediaQuery.addListener(handleDarkMode);
    handleDarkMode(darkModeMediaQuery);
};

darkModeHandler();
