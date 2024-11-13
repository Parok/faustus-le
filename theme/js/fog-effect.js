console.log("Fog effect script with Perlin noise loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogCanvas = document.getElementById('fogCanvas');
    if (!fogCanvas) {
        console.error("Fog canvas not found. Exiting script.");
        return;
    }

    const ctx = fogCanvas.getContext('2d');
    const simplex = new SimplexNoise(); // Make sure SimplexNoise is imported
    const pointSize = 3; // Adjusted point size for better visibility
    const zoom = 0.3; // Adjust zoom factor for smoother fog effect

    // Function to resize the canvas
    function resizeCanvas() {
        fogCanvas.width = window.innerWidth;
        fogCanvas.height = window.innerHeight;
    }

    // Main function to draw the fog effect
    function drawFog() {
        const gridWidth = fogCanvas.width;
        const gridHeight = fogCanvas.height;
        const numCols = Math.ceil(gridWidth / pointSize);
        const numRows = Math.ceil(gridHeight / pointSize);

        // Clear the canvas before each frame
        ctx.clearRect(0, 0, gridWidth, gridHeight);

        const time = Date.now() * 0.0002; // Adjust speed for smoother movement

        // Loop through each point on the grid
        for (let y = 0; y < numRows; y++) {
            for (let x = 0; x < numCols; x++) {
                // Calculate the noise value for each point
                const noiseValue = simplex.noise3D(x * zoom, y * zoom, time);
                const opacity = (noiseValue + 1) / 2;
                const posX = x * pointSize;
                const posY = y * pointSize;

                // Draw a small rectangle with varying opacity based on noise value
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.2 + 0.05})`;
                ctx.fillRect(posX, posY, pointSize, pointSize);
            }
        }

        // Request the next frame
        requestAnimationFrame(drawFog);
    }

    // Initialize canvas and start drawing the fog effect
    resizeCanvas();
    drawFog();

    // Add a debounced resize event listener
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
        }, 200);
    });
});
