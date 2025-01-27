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

// Project cards animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

projectCards.forEach(card => observer.observe(card));

// Category filtering
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Initialize filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Show all projects initially
    filterProjects('all');
    
    // Add visible class to all cards with a stagger
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
    
    // Remove loading state
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
    }
});

// Handle image loading
const images = document.querySelectorAll('img');
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

// Add hover effect to project icons
const projectIcons = document.querySelectorAll('.project-icon');
projectIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Handle preview card positioning
const handlePreviewPosition = () => {
    const previewCards = document.querySelectorAll('.project-preview');
    
    previewCards.forEach(card => {
        const parent = card.closest('.project-timeline-item');
        const parentRect = parent.getBoundingClientRect();
        
        // Check if preview would go off screen
        const cardRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (cardRect.top < 0) {
            card.style.top = '0';
        } else if (cardRect.bottom > viewportHeight) {
            card.style.top = 'auto';
            card.style.bottom = '0';
        }
    });
};

// Add keyframe animation for fade in up effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Handle window resize
window.addEventListener('resize', handlePreviewPosition);

// Handle scroll for preview positioning
window.addEventListener('scroll', handlePreviewPosition);
