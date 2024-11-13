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
    const zoom = 0.3;

    // Throttle the frame rate to 30 FPS
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    // Function to resize the canvas based on the logo container size
    function resizeCanvas() {
        const containerRect = logoContainer.getBoundingClientRect();
        fogCanvas.width = containerRect.width;
        fogCanvas.height = containerRect.height;
        console.log("Canvas resized to:", fogCanvas.width, fogCanvas.height);
    }

    function drawFog(timestamp) {
        if (timestamp - lastFrameTime < frameInterval) {
            requestAnimationFrame(drawFog);
            return;
        }
        lastFrameTime = timestamp;

        const width = fogCanvas.width;
        const height = fogCanvas.height;
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const time = Date.now() * 0.0002;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const noiseValue = simplex.noise3D(x * zoom, y * zoom, time);
                const opacity = Math.min((noiseValue + 1) / 2 * 0.7, 1);

                // Set pixel color with adjusted opacity
                data[index] = 255;        // Red
                data[index + 1] = 255;    // Green
                data[index + 2] = 255;    // Blue
                data[index + 3] = Math.floor(opacity * 255); // Alpha
            }
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(drawFog);
    }

    // Initialize canvas size and draw fog
    resizeCanvas();
    drawFog(0);

    // Resize canvas when the window is resized
    window.addEventListener('resize', resizeCanvas);
});
