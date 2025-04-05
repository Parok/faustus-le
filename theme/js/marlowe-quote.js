document.addEventListener('DOMContentLoaded', function () {
       // GSAP Animation for Marlowe Quotes
       const quotes = document.querySelectorAll('.marlowe-quote');
       if (quotes.length > 0) {
           const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
           quotes.forEach(quote => {
               tl.to(quote, { opacity: 1, duration: 1 })
                 .to(quote, { opacity: 0, duration: 1 }, "+=3");
           });
       }
}
);