// Navigation scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll effect
    const handleScroll = () => {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Set active link based on current page
    const setActiveLink = () => {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath === linkPath || 
                (currentPath === '/' && linkPath === '/index.html') ||
                (currentPath.includes(linkPath) && linkPath !== '/index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Mobile menu handling
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    nav.querySelector('.nav-content').appendChild(mobileMenuButton);

    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('menu-open');
        const isOpen = nav.classList.contains('menu-open');
        mobileMenuButton.innerHTML = isOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('menu-open') && 
            !nav.contains(e.target)) {
            nav.classList.remove('menu-open');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('menu-open');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Initialize
    window.addEventListener('scroll', handleScroll);
    setActiveLink();
});
