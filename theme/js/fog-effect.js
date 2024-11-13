console.log("Fog effect script with Perlin noise loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogGrid = document.querySelector('.fog-grid');
    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    const simplex = new SimplexNoise();
    let numCols, numRows;

    function createFogCells() {
        fogGrid.innerHTML = '';
        const gridWidth = fogGrid.offsetWidth;
        const gridHeight = fogGrid.offsetHeight;
        const cellSize = 25; // Adjust for density
        numCols = Math.ceil(gridWidth / cellSize);
        numRows = Math.ceil(gridHeight / cellSize);
        const totalCells = numCols * numRows;

        // Set up the grid template
        fogGrid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        fogGrid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

        // Create the fog cells
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('fog-cell');
            fogGrid.appendChild(cell);
        }
        console.log(`Created ${totalCells} fog cells.`);
    }

    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        const time = Date.now() * 0.0001; // Use time to animate the noise field

        cells.forEach((cell, index) => {
            const x = index % numCols;
            const y = Math.floor(index / numCols);
            const noiseValue = simplex.noise3D(x * 0.1, y * 0.1, time);
            const opacity = (noiseValue + 1) / 2; // Normalize to range [0, 1]
            cell.style.opacity = opacity * 0.6 + 0.2; // Adjust opacity range
        });

        // Continuously animate using requestAnimationFrame
        requestAnimationFrame(animateFog);
    }

    // Initialize the grid and start animation
    createFogCells();
    animateFog();

    // Recreate cells on resize
    window.addEventListener('resize', () => {
        createFogCells();
    });
});
