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

    // Project details scroll animations
    const detailsSections = document.querySelectorAll('.details-section');
    const detailsImages = document.querySelectorAll('.details-section img');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    detailsSections.forEach(section => sectionObserver.observe(section));
    detailsImages.forEach(image => imageObserver.observe(image));

    // Sample project details content
    const projectDetails = {
        mycosmo: {
            background: "My Cosmo emerged from a deep fascination with personal growth and self-discovery. As someone who believes in the power of introspection, I wanted to create a digital space that helps people understand themselves better and track their personal evolution.",
            objective: "The app aims to provide users with a beautiful and intuitive interface to document their daily thoughts, track habits, and visualize their progress over time. It's designed to be more than just a diary—it's a personal growth companion.",
            inspiration: `<p>The inspiration for My Cosmo came from three main sources:</p>
            <ul>
                <li>The concept of 'digital gardens' and how they help people cultivate their thoughts and ideas</li>
                <li>Modern minimalist design principles that prioritize content and user experience</li>
                <li>The growing need for digital tools that support mental well-being and personal development</li>
            </ul>`
        },
        bobbo: {
            background: "Bobbo was born from my personal experience as a pet owner and the challenges I faced in managing my dog's daily care routine. I noticed a gap in the market for a truly user-friendly, comprehensive pet care app.",
            objective: "To create an intuitive, beautiful, and feature-rich app that helps pet owners manage every aspect of their pet's life—from daily routines to vet appointments, while making the experience enjoyable and stress-free.",
            inspiration: `<p>The project draws inspiration from several sources:</p>
            <ul>
                <li>The joy and challenges of being a pet parent</li>
                <li>Modern iOS design principles and animations</li>
                <li>The growing trend of treating pets as family members</li>
            </ul>`
        }
    };

    function updateProjectDetails(projectId) {
        const projectData = projectDetails[projectId];
        if (!projectData) return;

        document.querySelectorAll('.dynamic-content').forEach(element => {
            const contentType = element.dataset.content;
            if (projectData[contentType]) {
                element.innerHTML = projectData[contentType];
            }
        });

        // Reset animations
        detailsSections.forEach(section => {
            section.classList.remove('visible');
            setTimeout(() => section.classList.add('visible'), 100);
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

    // Calculate programming experience and timeline progress
    function updateProgrammingTimeline() {
        const startDate = new Date(2021, 5); // June 2021
        const currentDate = new Date();
        
        // Update current year display
        const currentYearEl = document.getElementById('current-year');
        if (currentYearEl) {
            currentYearEl.textContent = currentDate.getFullYear();
        }
        
        // Calculate experience duration
        const years = currentDate.getFullYear() - startDate.getFullYear();
        const months = currentDate.getMonth() - startDate.getMonth();
        let totalMonths = (years * 12) + months;
        
        const experienceDuration = document.getElementById('experience-duration');
        if (experienceDuration) {
            const displayYears = Math.floor(totalMonths / 12);
            const displayMonths = totalMonths % 12;
            
            let durationText = '';
            if (displayYears > 0) {
                durationText += `${displayYears}Y `;
            }
            if (displayMonths > 0 || displayYears === 0) {
                durationText += `${displayMonths}M`;
            }
            experienceDuration.textContent = durationText;
        }
        
        // Update progress bar
        const progressBar = document.getElementById('programming-progress');
        if (progressBar) {
            const totalDuration = new Date(currentDate.getFullYear(), 11, 31) - startDate;
            const currentProgress = currentDate - startDate;
            const progressPercentage = Math.min(100, (currentProgress / totalDuration) * 100);
            progressBar.style.transform = `scaleX(${progressPercentage / 100})`;
        }
    }

    // Initialize timeline
    updateProgrammingTimeline();
    // Update every minute
    setInterval(updateProgrammingTimeline, 60000);

    // Initialize
    updateCarousel();
    initializeMobileView();
}); 