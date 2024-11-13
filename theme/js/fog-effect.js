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

    // Adjust parameters for better visibility
    let zoom = 0.5; // Lower zoom for larger visible patterns
    let speed = 0.0001; // Slightly faster speed to see the movement
    let opacityScale = 0.3; // Increase opacity for better visibility

    const targetFPS = 15;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

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

        // Check if the canvas has valid dimensions
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

                // Set pixel color with adjusted opacity
                data[index] = 255;        // Red
                data[index + 1] = 255;    // Green
                data[index + 2] = 255;    // Blue
                data[index + 3] = Math.floor(opacity * 255); // Alpha
            }
        }

        ctx.putImageData(imageData, 0, 0);
        console.timeEnd("Drawing fog");
        requestAnimationFrame(drawFog);
    }

    // Initialize the canvas and start the fog effect
    resizeCanvas();
    drawFog(0);

    window.addEventListener('resize', resizeCanvas);
});
