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
                                <span>EN</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="language-options">
                                <button class="lang-btn active" data-lang="en">EN</button>
                                <button class="lang-btn" data-lang="es">ES</button>
                                <button class="lang-btn" data-lang="ca">CA</button>
                            </div>
                        </div>
                    </div>
                    <button class="menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div class="nav-links">
                        <a href="/index.html" data-key="home" data-icon="fa-home">Home</a>
                        <a href="/pages/about.html" data-key="about" data-icon="fa-user">About</a>
                        <a href="/pages/expertise.html" data-key="expertise" data-icon="fa-code">Expertise</a>
                        <a href="/pages/projects.html" data-key="projects" data-icon="fa-project-diagram">Projects</a>
                        <a href="/pages/tech-stack.html" data-key="techStack" data-icon="fa-layer-group">Tech Stack</a>
                        <a href="/pages/contact.html" data-key="contact" data-icon="fa-envelope">Contact</a>
                    </div>
                </div>
            </nav>
        `;

        this.setupEventListeners();
        this.setActiveLink();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = this.querySelector('.theme-toggle');
        themeToggle?.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Language dropdown
        const langDropdown = this.querySelector('.language-dropdown');
        const currentLang = this.querySelector('.current-lang');
        currentLang?.addEventListener('click', () => {
            langDropdown?.classList.toggle('active');
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
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentLang.querySelector('span').textContent = btn.dataset.lang.toUpperCase();
                langDropdown?.classList.remove('active');
                // Here you can add your language change logic
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
}

customElements.define('nav-component', Navigation); 