console.log("Fog effect script with Perlin noise loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogCanvas = document.getElementById('fogCanvas');
    if (!fogCanvas) {
        console.error("Fog canvas not found. Exiting script.");
        return;
    }

    const ctx = fogCanvas.getContext('2d');
    const simplex = new SimplexNoise();
    const cellSize = 15;

    function resizeCanvas() {
        fogCanvas.width = fogCanvas.offsetWidth;
        fogCanvas.height = fogCanvas.offsetHeight;
    }

    function drawFog() {
        const gridWidth = fogCanvas.width;
        const gridHeight = fogCanvas.height;
        const numCols = Math.ceil(gridWidth / cellSize);
        const numRows = Math.ceil(gridHeight / cellSize);

        ctx.clearRect(0, 0, gridWidth, gridHeight);

        const time = Date.now() * 0.00035; // Adjusted speed for more visible change

        for (let y = 0; y < numRows; y++) {
            for (let x = 0; x < numCols; x++) {
                const noiseValue = simplex.noise3D(x * 0.05, y * 0.05, time);
                const opacity = (noiseValue + 1) / 2;
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5 + 0.1})`; // Increase range for better visibility
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }

        requestAnimationFrame(drawFog);
    }

    resizeCanvas();
    drawFog();

    window.addEventListener('resize', () => {
        resizeCanvas();
        drawFog();
    });
});