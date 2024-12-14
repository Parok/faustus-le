// adding active class to nav links on scroll
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
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
