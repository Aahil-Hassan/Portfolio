// Shrink menu on scroll
window.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');
    const backToTop = document.getElementById('backToTop');
    
    // Menu shrinking
    if (window.scrollY > 50) {
        menu.classList.add('shrink');
    } else {
        menu.classList.remove('shrink');
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Smooth scroll to top for the Back To Top button
document.getElementById('backToTop').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Advanced Scroll Animations (Intersection Observer)
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // slightly trigger before bottom
        threshold: 0.1 // trigger when 10% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on index for staggered animations if desired
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-element');
    scrollElements.forEach(el => observer.observe(el));
    
    // Immediately make the first elements visible (like the hero)
    setTimeout(() => {
        document.querySelectorAll('.fade-in:not(.scroll-element)').forEach(el => {
            el.classList.add('visible');
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});
