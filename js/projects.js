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
    const carouselTrack = document.querySelector('.carousel-track');
    const projects = document.querySelectorAll('.project-card');
    const dotsContainer = document.querySelector('.nav-dots');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const scrollHint = document.querySelector('.scroll-hint');
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
        carouselTrack.style.transform = `translateX(${offset}%)`;
        
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

        // Update scroll hint arrows
        updateScrollHint();
    }

    function updateScrollHint() {
        const isFirst = currentIndex === 0;
        const isLast = currentIndex === projects.length - 1;
        const isMiddle = !isFirst && !isLast;

        scrollHint.innerHTML = '';
        
        if (isFirst) {
            scrollHint.innerHTML = `
                <span data-i18n="projects.scrollHint">Scroll to see more projects</span>
                <i class="fas fa-arrow-right"></i>
            `;
        } else if (isLast) {
            scrollHint.innerHTML = `
                <i class="fas fa-arrow-left"></i>
                <span data-i18n="projects.scrollHint">Scroll to see more projects</span>
            `;
        } else {
            scrollHint.innerHTML = `
                <i class="fas fa-arrow-left"></i>
                <span data-i18n="projects.scrollHint">Scroll to see more projects</span>
                <i class="fas fa-arrow-right"></i>
            `;
        }

        // Update button states
        prevButton.style.opacity = isFirst ? '0.3' : '1';
        nextButton.style.opacity = isLast ? '0.3' : '1';
        prevButton.style.pointerEvents = isFirst ? 'none' : 'auto';
        nextButton.style.pointerEvents = isLast ? 'none' : 'auto';
    }

    function goToSlide(index) {
        if (index >= 0 && index < projects.length) {
            currentIndex = index;
            updateCarousel();
        }
    }

    function nextSlide() {
        if (currentIndex < projects.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
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

    carouselTrack.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselTrack.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < projects.length - 1) {
                nextSlide();
            } else if (diff < 0 && currentIndex > 0) {
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

    // Initialize resize handler
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Initialize
    updateCarousel();
    initializeMobileView();
}); 