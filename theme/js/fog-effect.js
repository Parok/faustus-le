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

    // Parameters for a more subtle effect
    const zoom = 0.8; // Higher zoom for finer details
    const speed = 0.00005; // Slower movement for subtle effect
    const opacityScale = 0.1; // Reduce opacity for a more subtle look

    const targetFPS = 15;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

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
        const time = Date.now() * speed;

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
        requestAnimationFrame(drawFog);
    }

    resizeCanvas();
    drawFog(0);

    window.addEventListener('resize', resizeCanvas);
});
