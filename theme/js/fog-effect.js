document.addEventListener('DOMContentLoaded', function () {
    const fogCanvas = document.getElementById('fogCanvas');
    if (!fogCanvas) {
        console.error("Fog canvas not found. Exiting script.");
        return;
    }

    const ctx = fogCanvas.getContext('2d');
    const simplex = new SimplexNoise();
    const zoom = 0.3;

    function resizeCanvas() {
        fogCanvas.width = window.innerWidth;
        fogCanvas.height = window.innerHeight;
    }

    // Throttle the frame rate to 30 FPS
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

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
                const opacity = (noiseValue + 1) / 2 * 0.3;

                data[index] = 255;         // Red
                data[index + 1] = 255;     // Green
                data[index + 2] = 255;     // Blue
                data[index + 3] = Math.floor(opacity * 255); // Alpha
            }
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(drawFog);
    }

    resizeCanvas();
    drawFog(0);

    window.addEventListener('resize', () => {
        resizeCanvas();
    });
});
