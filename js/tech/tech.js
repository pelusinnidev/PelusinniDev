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

    // Initialize proficiency chart with improved visibility and icons
    const ctx = document.getElementById('proficiencyChart').getContext('2d');
    
    // Chart configuration with icons instead of text labels
    const proficiencyChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                '📱', // Mobile Development
                '🌐', // Web Development
                '🖥️', // Backend & Server
                '🎮', // Game Development
                '🛠️'  // Tools & DevOps
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
                            size: 24, // Increased size for icons
                            weight: '400'
                        },
                        padding: 25,
                        callback: function(value) {
                            return value; // Return the emoji directly
                        }
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
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const labels = [
                                'Mobile Development',
                                'Web Development',
                                'Backend & Server',
                                'Game Development',
                                'Tools & DevOps'
                            ];
                            return labels[context[0].dataIndex];
                        }
                    }
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

    // Initialize language trends chart with filtering functionality
    const trendsCtx = document.getElementById('languageTrendsChart').getContext('2d');
    
    const languageData = {
        mobile: {
            Swift: [65, 75, 85, 90, 95, 95],
            'SwiftUI': [60, 70, 80, 85, 90, 92],
            Kotlin: [40, 45, 50, 55, 60, 65]
        },
        web: {
            'HTML/CSS': [40, 45, 60, 75, 80, 85],
            JavaScript: [35, 40, 55, 70, 75, 80],
            PHP: [30, 35, 40, 45, 50, 55]
        },
        backend: {
            Python: [70, 65, 60, 55, 50, 45],
            Java: [60, 55, 50, 45, 40, 35],
            'Node.js': [30, 35, 40, 45, 50, 55]
        }
    };

    const colorSchemes = {
        mobile: ['#FF3B30', '#FF9500', '#FFCC00'],
        web: ['#5856D6', '#007AFF', '#64D2FF'],
        backend: ['#32D74B', '#BF5AF2', '#FF2D55']
    };

    let currentCategory = 'all';
    let languageTrendsChart;

    function updateTrendsChart(category) {
        const datasets = [];
        
        if (category === 'all') {
            Object.keys(languageData).forEach((cat, catIndex) => {
                Object.entries(languageData[cat]).forEach(([lang, data], index) => {
                    datasets.push({
                        label: lang,
                        data: data,
                        borderColor: colorSchemes[cat][index],
                        backgroundColor: isLightMode ? 
                            `rgba(${hexToRgb(colorSchemes[cat][index])}, 0.1)` : 
                            `rgba(${hexToRgb(colorSchemes[cat][index])}, 0.2)`,
                        tension: 0.4,
                        borderWidth: 3,
                        fill: true
                    });
                });
            });
        } else {
            Object.entries(languageData[category]).forEach(([lang, data], index) => {
                datasets.push({
                    label: lang,
                    data: data,
                    borderColor: colorSchemes[category][index],
                    backgroundColor: isLightMode ? 
                        `rgba(${hexToRgb(colorSchemes[category][index])}, 0.1)` : 
                        `rgba(${hexToRgb(colorSchemes[category][index])}, 0.2)`,
                    tension: 0.4,
                    borderWidth: 3,
                    fill: true
                });
            });
        }

        if (languageTrendsChart) {
            languageTrendsChart.destroy();
        }

        languageTrendsChart = new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: datasets
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
    }

    // Helper function to convert hex to rgb
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            null;
    }

    // Initialize with all data
    updateTrendsChart('all');

    // Add event listeners for filter buttons
    document.querySelectorAll('.trend-filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            currentCategory = category;
            
            // Update active state of buttons
            document.querySelectorAll('.trend-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            updateTrendsChart(category);
        });
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
