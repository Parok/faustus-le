console.log("Fog effect script loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogCanvases = document.querySelectorAll('.fogCanvas');
    const simplex = new SimplexNoise();

    let zoom = 0.004;
    let speed = 0.0005;

    // Function to apply the fog effect with custom colors and opacity
    function applyFogEffect(fogCanvas, fogColor = [240, 240, 240], opacityScale = 0.7) {
        const ctx = fogCanvas.getContext('2d');
        const container = fogCanvas.closest('.quote-container') || fogCanvas.closest('.logo-container');

        function resizeCanvas() {
            fogCanvas.width = container.clientWidth;
            fogCanvas.height = container.clientHeight;
        }

        function drawFog() {
            const width = fogCanvas.width;
            const height = fogCanvas.height;
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            const time = Date.now() * speed;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4;

                    
                    const noiseValue = simplex.noise3D(x * zoom, y * zoom, time);
                    const opacity = Math.min((noiseValue + 1) / 2 * opacityScale, 1);
                    
                    data[index] = fogColor[0]; // Red
                    data[index + 1] = fogColor[1]; // Green
                    data[index + 2] = fogColor[2]; // Blue
                    data[index + 3] = Math.floor(opacity * 255); // Alpha
                }
            }
            ctx.putImageData(imageData, 0, 0);
            requestAnimationFrame(drawFog);
        }

        resizeCanvas();
        drawFog();
        window.addEventListener('resize', resizeCanvas);
    }

    fogCanvases.forEach(fogCanvas => {
        if (fogCanvas.classList.contains('quoteFogCanvas')) {
            applyFogEffect(fogCanvas, [100, 60, 160], 0.4); 
        } else if (fogCanvas.classList.contains('logoFogCanvas')) {
            applyFogEffect(fogCanvas, [240, 240, 240], 0.8); 
        }
    });

    // GSAP Animation for Marlowe Quotes
    const quotes = document.querySelectorAll('.marlowe-quote');
    if (quotes.length > 0) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        quotes.forEach(quote => {
            tl.to(quote, { opacity: 1, duration: 1 })
              .to(quote, { opacity: 0, duration: 1 }, "+=3");
        });
    }
});
