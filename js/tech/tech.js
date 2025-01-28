document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        document.querySelector('.loading').classList.add('hidden');
    }, 1000);

    // Initialize proficiency chart
    const ctx = document.getElementById('proficiencyChart').getContext('2d');
    
    // Chart configuration with data from README and index.html
    const proficiencyChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Mobile Development',
                'Web Development',
                'Backend & Server',
                'Game Development',
                'Tools & DevOps'
            ],
            datasets: [{
                label: 'Skill Level',
                data: [95, 85, 75, 80, 70],
                backgroundColor: 'rgba(0, 122, 255, 0.15)',
                borderColor: '#007AFF',
                pointBackgroundColor: '#007AFF',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#007AFF',
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        lineWidth: 1
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        circular: true
                    },
                    pointLabels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        font: {
                            family: "'SF Pro Display', sans-serif",
                            size: 14,
                            weight: '600'
                        }
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        backdropColor: 'transparent',
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        stepSize: 20,
                        showLabelBackdrop: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    borderWidth: 3,
                    tension: 0.1
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Set up trend bars with actual data
    const trends = [
        { tech: 'Swift', progress: '95%', icon: 'fab fa-swift', description: 'Primary focus - iOS Development' },
        { tech: 'HTML/CSS/JS', progress: '85%', icon: 'fab fa-html5', description: 'Current project stack' },
        { tech: 'Python', progress: '70%', icon: 'fab fa-python', description: 'Used in specific projects' }
    ];

    const trendList = document.querySelector('.trend-list');
    if (trendList) {
        trendList.innerHTML = trends.map((trend, index) => `
            <div class="trend-item">
                <i class="${trend.icon}"></i>
                <div class="trend-info">
                    <div class="trend-header">
                        <h3>${trend.tech}</h3>
                        <span class="trend-description">${trend.description}</span>
                    </div>
                    <div class="trend-bar">
                        <div class="trend-progress" data-progress="${trend.progress}" style="width: 0"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Make timeline cards visible with animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-card')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('trend-progress')) {
                    entry.target.style.width = entry.target.dataset.progress;
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe timeline cards
    document.querySelectorAll('.timeline-card').forEach(card => {
        observer.observe(card);
    });

    // Observe trend progress bars
    document.querySelectorAll('.trend-progress').forEach(bar => {
        observer.observe(bar);
    });

    // Add mouse movement effect to hero section
    const hero = document.querySelector('.tech-hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            hero.style.setProperty('--mouse-x', `${x}%`);
            hero.style.setProperty('--mouse-y', `${y}%`);
        });
    }
});

// Add smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
