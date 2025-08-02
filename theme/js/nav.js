// adding active class to nav links on scroll
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('a.nav-link'); // nur echte Links
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const id = section.getAttribute('id');
            if (scrollY >= sectionTop - 60 && id) {
                current = id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && current && href.includes(current)) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
});


// narlowe quote rotation
document.addEventListener('DOMContentLoaded', function () {
    const quotes = document.querySelectorAll('.marlowe-quote');
    
    if (quotes.length === 0) {
        console.error("No quotes found.");
        return;
    }

    // Create a GSAP timeline to cycle through the quotes
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    quotes.forEach(quote => {
        tl.to(quote, { 
            opacity: 1, 
            duration: 1, 
            display: 'block', 
            ease: 'power2.inOut'
        })
        .to(quote, { 
            opacity: 0, 
            duration: 1, 
            display: 'none', 
            ease: 'power2.inOut'
        }, "+=3"); // Quote remains visible for 3 seconds
    });
});

// hamburger menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', () => {
            console.log('Menu toggled'); // Debugging log
            navMenu.classList.toggle('active');
        });
    } else {
        console.warn('Toggle button or nav menu not found');
    }
});
