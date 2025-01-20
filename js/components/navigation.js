import i18n from '../i18n.js';

class Navigation extends HTMLElement {
    constructor() {
        super();
        this.isMenuOpen = false;
        this.isLangDropdownOpen = false;
    }

    getBasePath() {
        // Si estamos en una subpágina (pages/), necesitamos ir un nivel arriba
        return window.location.pathname.includes('/pages/') ? '../' : './';
    }

    connectedCallback() {
        const basePath = this.getBasePath();
        
        this.innerHTML = `
            <nav class="nav">
                <div class="container nav-container">
                    <div class="nav-left">
                        <button class="theme-toggle" aria-label="Toggle theme">
                            <i class="fas fa-sun light-icon"></i>
                            <i class="fas fa-moon dark-icon"></i>
                        </button>
                        <div class="language-dropdown">
                            <button class="current-lang" aria-label="Select language">
                                <span>${i18n.currentLang.toUpperCase()}</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="language-options">
                                <button class="lang-btn ${i18n.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                                <button class="lang-btn ${i18n.currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
                                <button class="lang-btn ${i18n.currentLang === 'ca' ? 'active' : ''}" data-lang="ca">CA</button>
                            </div>
                        </div>
                    </div>

                    <div class="nav-center">
                        <div class="nav-divider"></div>
                        <div class="nav-links">
                            <a href="${basePath}index.html" data-key="home">
                                <span data-i18n="nav.home">Home</span>
                            </a>
                            <a href="${basePath}pages/projects.html" data-key="projects">
                                <span data-i18n="nav.projects">Projects</span>
                            </a>
                            <a href="${basePath}pages/tech-stack.html" data-key="techStack">
                                <span data-i18n="nav.techStack">Tech Stack</span>
                            </a>
                        </div>
                        <div class="nav-divider"></div>
                    </div>

                    <div class="nav-right">
                        <a href="https://twitter.com/pelusinnidev" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="https://github.com/pelusinnidev" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>

                    <button class="menu-toggle mobile-only" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        `;

        this.setupEventListeners();
        this.setActiveLink();
        
        // Initial translation
        i18n.translatePage();
        
        // Add observer for language changes
        i18n.addObserver(() => {
            i18n.translatePage();
            this.updateLanguageDropdown();
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.toggleMenu(false);
            }
        });

        // Close menu and language dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.toggleMenu(false);
                this.toggleLanguageDropdown(false);
            }
        });
    }

    toggleMenu(force = null) {
        const menuToggle = this.querySelector('.menu-toggle');
        const navLinks = this.querySelector('.nav-links');
        
        this.isMenuOpen = force !== null ? force : !this.isMenuOpen;
        
        menuToggle?.classList.toggle('active', this.isMenuOpen);
        navLinks?.classList.toggle('active', this.isMenuOpen);
        
        // Prevent body scroll when menu is open on mobile
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    toggleLanguageDropdown(force = null) {
        const langDropdown = this.querySelector('.language-dropdown');
        this.isLangDropdownOpen = force !== null ? force : !this.isLangDropdownOpen;
        langDropdown?.classList.toggle('active', this.isLangDropdownOpen);
    }

    updateLanguageDropdown() {
        const currentLangSpan = this.querySelector('.current-lang span');
        const langButtons = this.querySelectorAll('.lang-btn');
        
        if (currentLangSpan) {
            currentLangSpan.textContent = i18n.currentLang.toUpperCase();
        }
        
        langButtons.forEach(btn => {
            const lang = btn.dataset.lang;
            btn.classList.toggle('active', lang === i18n.currentLang);
        });
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = this.querySelector('.theme-toggle');
        themeToggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Language dropdown
        const currentLang = this.querySelector('.current-lang');
        currentLang?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLanguageDropdown();
        });

        // Mobile menu
        const menuToggle = this.querySelector('.menu-toggle');
        menuToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Language buttons
        const langButtons = this.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = btn.dataset.lang;
                i18n.setLanguage(lang);
                this.toggleLanguageDropdown(false);
            });
        });

        // Navigation links
        const navLinks = this.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.toggleMenu(false);
                }
            });
        });
    }

    setActiveLink() {
        const currentPath = window.location.pathname;
        const links = this.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            link.classList.toggle('active', currentPath === linkPath);
        });
    }

    disconnectedCallback() {
        // Clean up event listeners if needed
        window.removeEventListener('resize', this.handleResize);
    }
}

customElements.define('nav-component', Navigation); 