document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll to top button
    const scrollTopButton = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize carousel
    const carousel = document.querySelector('.carousel-container');
    const projects = document.querySelectorAll('.project-card');
    const dotsContainer = document.querySelector('.nav-dots');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    let currentIndex = 0;

    // Create dots
    projects.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Navigation functions
    function updateCarousel() {
        const offset = currentIndex * -100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update project visibility
        projects.forEach((project, index) => {
            project.classList.toggle('visible', index === currentIndex);
            if (index === currentIndex) {
                updateProjectDetails(project.dataset.project);
            }
        });

        // Update timeline
        updateTimeline(projects[currentIndex].dataset.date);
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateCarousel();
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch events
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
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

    // Project details
    function updateProjectDetails(projectId) {
        const translations = window.translations || {};
        const projectData = translations.projects?.items?.[projectId];
        
        if (!projectData) return;

        document.querySelectorAll('.dynamic-content').forEach(element => {
            const contentType = element.dataset.content;
            element.textContent = projectData[contentType] || '';
        });
    }

    // Initialize timeline
    const timelineDot = document.querySelector('.timeline-dot');
    const timelineLine = document.querySelector('.timeline-line');
    const currentDateEl = document.querySelector('.current-date');
    const dateRangeEl = document.querySelector('.date-range');

    function updateTimeline(date) {
        if (!date) return;
        
        const [year, month] = date.split('-');
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        currentDateEl.textContent = `${months[parseInt(month) - 1]} ${year}`;
        
        // Animate timeline
        timelineDot.style.transform = 'scale(1.2)';
        timelineLine.style.width = '300px';
        timelineLine.style.opacity = '0.4';

        setTimeout(() => {
            timelineDot.style.transform = 'scale(1)';
            timelineLine.style.width = '200px';
            timelineLine.style.opacity = '0.2';
        }, 600);
    }

    // Initialize mobile view
    function initializeMobileView() {
        const mobileList = document.querySelector('.projects-list');
        projects.forEach(project => {
            const clone = project.cloneNode(true);
            mobileList.appendChild(clone);
        });
    }

    // Initialize grayscale hover effect
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.filter = 'grayscale(0%)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.filter = 'grayscale(100%)';
        });
    });

    // Initialize smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Set initial timeline date
    const firstProject = document.querySelector('.project-card');
    if (firstProject) {
        updateTimeline(firstProject.dataset.date);
    }

    // Initialize
    updateCarousel();
    initializeMobileView();
}); 