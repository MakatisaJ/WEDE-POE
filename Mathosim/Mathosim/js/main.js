// Basic responsive interactions and progressive image loading

// Toggle mobile nav
(function () {
    const hamburger = document.querySelectorAll('.hamburger');
    const navs = document.querySelectorAll('.nav-links');

    hamburger.forEach(btn => {
        btn.addEventListener('click', () => {
            const header = btn.closest('header');
            const nav = header.querySelector('.nav-links');
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('active');
            btn.classList.toggle('active');
        });
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            const nav = a.closest('.nav-links');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const btn = a.closest('header').querySelector('.hamburger');
                if (btn) btn.classList.remove('active');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();

// Lazy-load gallery images using IntersectionObserver
(function () {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const loadImage = (img) => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
    };

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '50px 0px', threshold: 0.01 });

        images.forEach(img => io.observe(img));
    } else {
        // Fallback: load all images
        images.forEach(img => loadImage(img));
    }
})();