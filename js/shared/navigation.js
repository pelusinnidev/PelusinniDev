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

    // Initialize
    window.addEventListener('scroll', handleScroll);
    setActiveLink();
});
