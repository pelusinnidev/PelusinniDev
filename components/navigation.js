import i18n from '../js/i18n.js';

class Navigation extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav class="nav">
                <div class="container nav-container">
                    <div class="nav-left">
                        <button class="theme-toggle" aria-label="Toggle theme">
                            <i class="fas fa-sun light-icon"></i>
                            <i class="fas fa-moon dark-icon"></i>
                        </button>
                        <div class="nav-divider"></div>
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
                    <button class="menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div class="nav-links">
                        <a href="/index.html" data-key="home" data-icon="fa-home" data-i18n="nav.home">Home</a>
                        <a href="/pages/about.html" data-key="about" data-icon="fa-user" data-i18n="nav.about">About</a>
                        <a href="/pages/expertise.html" data-key="expertise" data-icon="fa-code" data-i18n="nav.expertise">Expertise</a>
                        <a href="/pages/projects.html" data-key="projects" data-icon="fa-project-diagram" data-i18n="nav.projects">Projects</a>
                        <a href="/pages/tech-stack.html" data-key="techStack" data-icon="fa-layer-group" data-i18n="nav.techStack">Tech Stack</a>
                        <a href="/pages/contact.html" data-key="contact" data-icon="fa-envelope" data-i18n="nav.contact">Contact</a>
                    </div>
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
        const langDropdown = this.querySelector('.language-dropdown');
        const currentLang = this.querySelector('.current-lang');
        currentLang?.addEventListener('click', () => {
            langDropdown?.classList.toggle('active');
        });

        // Close language dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langDropdown?.contains(e.target)) {
                langDropdown?.classList.remove('active');
            }
        });

        // Mobile menu
        const menuToggle = this.querySelector('.menu-toggle');
        const navLinks = this.querySelector('.nav-links');
        menuToggle?.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks?.classList.toggle('active');
        });

        // Language buttons
        const langButtons = this.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                i18n.setLanguage(lang);
                langDropdown?.classList.remove('active');
            });
        });
    }

    setActiveLink() {
        const currentPath = window.location.pathname;
        const links = this.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').endsWith(currentPath)) {
                link.classList.add('active');
            }
        });
    }

    disconnectedCallback() {
        // Remove language change observer when component is removed
        i18n.removeObserver(this.translatePage);
    }
}

customElements.define('nav-component', Navigation); 