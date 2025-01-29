document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        document.querySelector('.loading').classList.add('hidden');
    }, 1000);

    // Check if we're in light mode
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    const chartTextColor = isLightMode ? '#000000' : '#FFFFFF';
    const chartGridColor = isLightMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)';
    const chartBackgroundColor = isLightMode ? 'rgba(0, 122, 255, 0.1)' : 'rgba(0, 122, 255, 0.2)';

    // Initialize proficiency chart with improved visibility
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
                backgroundColor: chartBackgroundColor,
                borderColor: '#007AFF',
                pointBackgroundColor: '#007AFF',
                pointBorderColor: isLightMode ? '#FFFFFF' : '#000000',
                pointHoverBackgroundColor: isLightMode ? '#FFFFFF' : '#000000',
                pointHoverBorderColor: '#007AFF',
                borderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: chartGridColor,
                        lineWidth: 2
                    },
                    grid: {
                        color: chartGridColor,
                        circular: true,
                        lineWidth: 2
                    },
                    pointLabels: {
                        color: chartTextColor,
                        font: {
                            family: "'SF Pro Display', sans-serif",
                            size: 16,
                            weight: '600'
                        },
                        padding: 25
                    },
                    ticks: {
                        color: chartTextColor,
                        backdropColor: 'transparent',
                        font: {
                            size: 14,
                            weight: '500'
                        },
                        stepSize: 20,
                        showLabelBackdrop: false,
                        z: 1,
                        count: 5
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

    // Initialize language trends chart with improved visibility
    const trendsCtx = document.getElementById('languageTrendsChart').getContext('2d');
    
    const languageTrendsChart = new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Swift',
                    data: [65, 75, 85, 90, 95, 95],
                    borderColor: '#FF3B30',
                    backgroundColor: isLightMode ? 'rgba(255, 59, 48, 0.1)' : 'rgba(255, 59, 48, 0.2)',
                    tension: 0.4,
                    borderWidth: 3,
                    fill: true
                },
                {
                    label: 'HTML/CSS/JS',
                    data: [40, 45, 60, 75, 80, 85],
                    borderColor: '#5856D6',
                    backgroundColor: isLightMode ? 'rgba(88, 86, 214, 0.1)' : 'rgba(88, 86, 214, 0.2)',
                    tension: 0.4,
                    borderWidth: 3,
                    fill: true
                },
                {
                    label: 'Python',
                    data: [70, 65, 60, 55, 50, 45],
                    borderColor: '#FFD60A',
                    backgroundColor: isLightMode ? 'rgba(255, 214, 10, 0.1)' : 'rgba(255, 214, 10, 0.2)',
                    tension: 0.4,
                    borderWidth: 3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: chartTextColor,
                        font: {
                            family: "'SF Pro Display', sans-serif",
                            size: 14,
                            weight: '500'
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: chartGridColor,
                        lineWidth: 1
                    },
                    ticks: {
                        color: chartTextColor,
                        font: {
                            family: "'SF Pro Display', sans-serif",
                            size: 12,
                            weight: '500'
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        color: chartGridColor,
                        lineWidth: 1
                    },
                    ticks: {
                        color: chartTextColor,
                        font: {
                            family: "'SF Pro Display', sans-serif",
                            size: 12,
                            weight: '500'
                        },
                        padding: 10
                    }
                }
            }
        }
    });

    // GitHub Stats Integration
    const fetchGitHubStats = async () => {
        try {
            const response = await fetch('https://api.github.com/users/pelusinnidev');
            const data = await response.json();
            
            if (data) {
                document.getElementById('github-stats').innerHTML = `
                    <div class="github-stat">
                        <i class="fab fa-github"></i>
                        <div class="stat-info">
                            <span class="stat-value">${data.public_repos}</span>
                            <span class="stat-label">Repositories</span>
                        </div>
                    </div>
                    <div class="github-stat">
                        <i class="fas fa-code-branch"></i>
                        <div class="stat-info">
                            <span class="stat-value">${data.followers}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
        }
    };

    fetchGitHubStats();

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

    // Observe timeline cards and trend progress bars
    document.querySelectorAll('.timeline-card, .trend-progress').forEach(element => {
        observer.observe(element);
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
