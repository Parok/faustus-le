
document.addEventListener('DOMContentLoaded', function () {
    const fogCanvas = document.getElementById('fogCanvas');
    if (!fogCanvas) {
        console.error("Fog canvas not found. Exiting script.");
        return;
    }

    const ctx = fogCanvas.getContext('2d');
    const simplex = new SimplexNoise();
    const pointSize = 3; // Adjusted point size for better visibility
    const zoom = 0.5; // Adjusted zoom factor for a smoother fog effect

    function resizeCanvas() {
        fogCanvas.width = window.innerWidth;
        fogCanvas.height = window.innerHeight;
    }

    function drawFog() {
        const gridWidth = fogCanvas.width;
        const gridHeight = fogCanvas.height;
        const numCols = Math.ceil(gridWidth / pointSize);
        const numRows = Math.ceil(gridHeight / pointSize);

        ctx.clearRect(0, 0, gridWidth, gridHeight);

        const time = Date.now() * 0.0002; // Adjust speed for smoother movement

        for (let y = 0; y < numRows; y++) {
            for (let x = 0; x < numCols; x++) {
                const noiseValue = simplex.noise3D(x * zoom, y * zoom, time);
                const opacity = (noiseValue + 1) / 2;
                const posX = x * pointSize;
                const posY = y * pointSize;
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.2 + 0.05})`; // Softer opacity range
                ctx.beginPath();
                ctx.arc(posX, posY, pointSize / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        requestAnimationFrame(drawFog);
    }

    // Initialize canvas and fog effect
    resizeCanvas();
    drawFog();

    // Resize handling with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
        }, 100);
    });
});