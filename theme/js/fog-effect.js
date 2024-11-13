console.log("Fog effect script with Perlin noise loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogGrid = document.querySelector('.fog-grid');
    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    const simplex = new SimplexNoise();

    function createFogCells() {
        fogGrid.innerHTML = '';
        const gridWidth = fogGrid.offsetWidth;
        const gridHeight = fogGrid.offsetHeight;
        const cellSize = 25; // Adjust for density
        const numCols = Math.ceil(gridWidth / cellSize);
        const numRows = Math.ceil(gridHeight / cellSize);
        const totalCells = numCols * numRows;

        fogGrid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        fogGrid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('fog-cell');
            fogGrid.appendChild(cell);
        }
    }

    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        const time = Date.now() * 0.0001; // Use time to animate the noise field

        cells.forEach((cell, index) => {
            const x = index % Math.ceil(fogGrid.offsetWidth / 25);
            const y = Math.floor(index / Math.ceil(fogGrid.offsetWidth / 25));
            const noiseValue = simplex.noise3D(x * 0.1, y * 0.1, time);
            const opacity = (noiseValue + 1) / 2; // Normalize to range [0, 1]
            cell.style.opacity = opacity * 0.6 + 0.2; // Adjust opacity range
        });
    }

    // Create cells initially
    createFogCells();
    setInterval(animateFog, 100); // Adjust the interval for smoother animations

    window.addEventListener('resize', () => {
        createFogCells();
        animateFog();
    });
});
