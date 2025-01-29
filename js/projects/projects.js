// DOM Elements
const projectsHero = document.querySelector('.projects-hero');
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Mouse move effect for hero section
if (projectsHero) {
    projectsHero.addEventListener('mousemove', (e) => {
        const rect = projectsHero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        projectsHero.style.setProperty('--mouse-x', `${x}%`);
        projectsHero.style.setProperty('--mouse-y', `${y}%`);
    });
}

// Project cards animation on scroll with improved performance
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once the card is visible
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '50px'
});

projectCards.forEach(card => observer.observe(card));

// Category filtering with smooth transitions
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    // Smooth scroll to top of grid
    projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.category;
        filterProjects(category);
    });
});

// Handle dark mode changes
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addListener(() => {
    document.documentElement.classList.toggle('dark-mode', darkModeMediaQuery.matches);
});

// Initialize page with improved loading
document.addEventListener('DOMContentLoaded', () => {
    // Show all projects initially
    filterProjects('all');
    
    // Add visible class to all cards with a stagger
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
});

// Handle image loading with improved performance
const images = document.querySelectorAll('.project-image img');
let loadedImages = 0;

const imageLoaded = () => {
    loadedImages++;
    if (loadedImages === images.length) {
        document.querySelector('.loading').classList.add('hidden');
        projectsGrid.classList.add('loaded');
    }
};

images.forEach(img => {
    if (img.complete) {
        imageLoaded();
    } else {
        img.addEventListener('load', imageLoaded);
        img.addEventListener('error', imageLoaded);
    }
});

// Smooth scroll for navigation with improved performance
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

// Add hover effect to project icons with improved animations
const projectIcons = document.querySelectorAll('.project-icon');
projectIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.05)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Remove parallax effect to improve performance and prevent content overlap
// Handle preview card positioning with improved performance
const handlePreviewPosition = () => {
    requestAnimationFrame(() => {
        const previewCards = document.querySelectorAll('.project-preview');
        previewCards.forEach(card => {
            const parent = card.closest('.project-timeline-item');
            if (!parent) return;
            
            const parentRect = parent.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (parentRect.top < 0) {
                card.style.top = '0';
            } else if (parentRect.bottom > viewportHeight) {
                card.style.top = 'auto';
                card.style.bottom = '0';
            }
        });
    });
};

// Throttle resize and scroll events for better performance
let ticking = false;
const throttleEvent = (callback) => {
    if (!ticking) {
        requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('resize', () => throttleEvent(handlePreviewPosition));
window.addEventListener('scroll', () => throttleEvent(handlePreviewPosition));
