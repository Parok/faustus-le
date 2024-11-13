console.log("Fog effect script with Perlin noise loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogCanvas = document.getElementById('fogCanvas');
    if (!fogCanvas) {
        console.error("Fog canvas not found. Exiting script.");
        return;
    }

    const ctx = fogCanvas.getContext('2d');
    const simplex = new SimplexNoise();
    const pointSize = 2; // Size of each point

    function resizeCanvas() {
        fogCanvas.width = fogCanvas.offsetWidth;
        fogCanvas.height = fogCanvas.offsetHeight;
    }

    function drawFog() {
        const gridWidth = fogCanvas.width;
        const gridHeight = fogCanvas.height;
        const numCols = Math.ceil(gridWidth / pointSize);
        const numRows = Math.ceil(gridHeight / pointSize);

        ctx.clearRect(0, 0, gridWidth, gridHeight);

        const time = Date.now() * 0.00035; // Adjusted speed for more visible change

        for (let y = 0; y < numRows; y++) {
            for (let x = 0; x < numCols; x++) {
                const noiseValue = simplex.noise3D(x * 0.05, y * 0.05, time);
                const opacity = (noiseValue + 1) / 2;
                const posX = x * pointSize + Math.sin(time + x) * 5; // Dynamic X coordinate
                const posY = y * pointSize + Math.cos(time + y) * 5; // Dynamic Y coordinate
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5 + 0.1})`; // Increase range for better visibility
                ctx.beginPath();
                ctx.arc(posX, posY, pointSize / 2, 0, Math.PI * 2);
                ctx.fill();
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