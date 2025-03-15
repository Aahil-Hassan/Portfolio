window.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');
    if (window.scrollY > 50) {
        menu.classList.add('shrink');
    } else {
        menu.classList.remove('shrink');
    }
});

