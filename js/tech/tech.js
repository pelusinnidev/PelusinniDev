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
    
    const proficiencyChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                '📱', // Mobile Dev
                '🌐', // Web Dev
                '🖥️', // Backend
                '🎮', // Game Dev
                '🛠️'  // Tools
            ],
            datasets: [{
                label: 'Skill Level',
                data: [95, 85, 75, 65, 70],
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
                            size: 24,
                            family: "'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif"
                        },
                        padding: 25
                    },
                    ticks: {
                        display: false  // Ocultar los números
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
            }
        }
    });

    // Initialize language trends chart with filtering functionality
    const trendsCtx = document.getElementById('languageTrendsChart').getContext('2d');
    
    const languageData = {
        mobile: {
            Swift: [82, 85, 87, 89, 92, 95],
            'SwiftUI': [80, 82, 85, 87, 90, 93],
            Kotlin: [45, 42, 40, 38, 35, 32]
        },
        web: {
            'HTML/CSS': [65, 67, 69, 70, 72, 75],
            JavaScript: [55, 57, 60, 62, 65, 68],
            Laravel: [50, 52, 55, 58, 60, 65]
        },
        backend: {
            Python: [60, 63, 65, 68, 70, 75],
            Java: [45, 43, 42, 40, 38, 35],
            Linux: [40, 42, 45, 47, 50, 52]
        }
    };

    const colorSchemes = {
        mobile: ['#FF3B30', '#FF9500', '#FFCC00'],
        web: ['#5856D6', '#007AFF', '#64D2FF'],
        backend: ['#32D74B', '#BF5AF2', '#FF2D55']
    };

    let currentCategory = 'all';
    let languageTrendsChart;

    // Función para obtener los últimos 5 meses y el siguiente
    function getMonthLabels() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const labels = [];
        
        // Añadir los 4 meses anteriores
        for (let i = 4; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            labels.push(months[monthIndex]);
        }
        
        // Mes siguiente (predicción)
        const nextMonth = (currentMonth + 1) % 12;
        labels.push(`${months[nextMonth]}*`);

        // Marcar el mes actual con un estilo especial (será el penúltimo)
        labels[4] = `${months[currentMonth]}`;
        
        return labels;
    }

    function updateTrendsChart(category) {
        const datasets = [];
        
        if (category === 'all') {
            Object.keys(languageData).forEach((cat, catIndex) => {
                Object.entries(languageData[cat]).forEach(([lang, data], index) => {
                    datasets.push({
                        label: lang,
                        data: data,
                        borderColor: colorSchemes[cat][index],
                        backgroundColor: 'transparent',
                        tension: 0.4,
                        borderWidth: 3,
                        fill: false,
                        segment: {
                            borderDash: (ctx) => {
                                // El último segmento (entre el último punto y la predicción)
                                return ctx.p1DataIndex === data.length - 1 ? [5, 5] : undefined;
                            },
                            borderColor: (ctx) => {
                                // El último segmento más transparente
                                return ctx.p1DataIndex === data.length - 1 ? 
                                    colorSchemes[cat][index] + '80' : 
                                    colorSchemes[cat][index];
                            }
                        },
                        animation: {
                            y: {
                                duration: 2000,
                                delay: index * 300,
                                easing: 'easeInOutQuart'
                            }
                        }
                    });
                });
            });
        } else {
            Object.entries(languageData[category]).forEach(([lang, data], index) => {
                datasets.push({
                    label: lang,
                    data: data,
                    borderColor: colorSchemes[category][index],
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    borderWidth: 3,
                    fill: false,
                    segment: {
                        borderDash: (ctx) => {
                            // El último segmento (entre el último punto y la predicción)
                            return ctx.p1DataIndex === data.length - 1 ? [5, 5] : undefined;
                        },
                        borderColor: (ctx) => {
                            // El último segmento más transparente
                            return ctx.p1DataIndex === data.length - 1 ? 
                                colorSchemes[category][index] + '80' : 
                                colorSchemes[category][index];
                        }
                    },
                    animation: {
                        y: {
                            duration: 2000,
                            delay: index * 300,
                            easing: 'easeInOutQuart'
                        }
                    }
                });
            });
        }

        if (languageTrendsChart) {
            languageTrendsChart.destroy();
        }

        languageTrendsChart = new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: getMonthLabels(),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                if (context.dataIndex === 5) {
                                    return `${label}: ${value} (Prediction)`;
                                } else if (context.dataIndex === 4) {
                                    return `${label}: ${value} (Current)`;
                                }
                                return `${label}: ${value}`;
                            }
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
                            padding: 10,
                            callback: function(value, index) {
                                return this.getLabelForValue(value);
                            }
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
        { tech: 'Swift', progress: '93%', icon: 'fab fa-swift', description: 'Primary focus - iOS Development' },
        { tech: 'Python', progress: '74%', icon: 'fab fa-python', description: 'Used in projects and also in AI/ML investigation' },
        { tech: 'HTML/CSS', progress: '60%', icon: 'fab fa-html5', description: 'Current project stack' }
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
