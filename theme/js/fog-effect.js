console.log("Fog effect script with Perlin noise loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogCanvas = document.getElementById('fogCanvas');
    const logoContainer = document.querySelector('.logo-container');

    if (!fogCanvas || !logoContainer) {
        console.error("Required elements not found.");
        return;
    }

    const ctx = fogCanvas.getContext('2d');
    const simplex = new SimplexNoise();

    // Adjust parameters for larger, whiter clouds
    let zoom = 0.1; // Lower zoom for larger cloud patterns
    let speed = 0.00005; // Slower movement for gentle motion
    let opacityScale = 0.8; // Higher opacity for more visible fog

    const targetFPS = 15;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    // Function to resize the canvas based on the logo container size
    function resizeCanvas() {
        const containerRect = logoContainer.getBoundingClientRect();
        fogCanvas.width = containerRect.width;
        fogCanvas.height = containerRect.height;
        console.log(`Canvas resized to: ${fogCanvas.width}x${fogCanvas.height}`);
    }

    function drawFog(timestamp) {
        if (timestamp - lastFrameTime < frameInterval) {
            requestAnimationFrame(drawFog);
            return;
        }
        lastFrameTime = timestamp;

        const width = fogCanvas.width;
        const height = fogCanvas.height;

        if (width === 0 || height === 0) {
            console.warn("Canvas has zero width or height");
            return;
        }

        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const time = Date.now() * speed;

        console.time("Drawing fog");
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const noiseValue = simplex.noise3D(x * zoom, y * zoom, time);
                const opacity = Math.min((noiseValue + 1) / 2 * opacityScale, 1);

                // Set pixel color with adjusted opacity for whiter clouds
                data[index] = 240;        // Red (close to white)
                data[index + 1] = 240;    // Green (close to white)
                data[index + 2] = 240;    // Blue (close to white)
                data[index + 3] = Math.floor(opacity * 255); // Alpha
            }
        }

        ctx.putImageData(imageData, 0, 0);
        console.timeEnd("Drawing fog");
        requestAnimationFrame(drawFog);
    }

    // Initialize canvas size and start the fog effect
    resizeCanvas();
    drawFog(0);

    window.addEventListener('resize', resizeCanvas);
});
