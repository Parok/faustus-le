console.log("Fog effect script with Perlin noise loaded!");

let simplex; // Declare simplex globally

document.addEventListener('DOMContentLoaded', function () {
    const fogGrid = document.querySelector('.fog-grid');
    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    // Initialize SimplexNoise globally
    simplex = new SimplexNoise();
    console.log("SimplexNoise object:", simplex);

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

        console.log(`Created ${totalCells} fog cells.`);
    }

    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        const time = Date.now() * 0.0001;

        cells.forEach((cell, index) => {
            const x = index % Math.ceil(fogGrid.offsetWidth / 25);
            const y = Math.floor(index / Math.ceil(fogGrid.offsetWidth / 25));
            const noiseValue = simplex.noise3D(x * 0.1, y * 0.1, time);
            const opacity = (noiseValue + 1) / 2;
            cell.style.opacity = opacity * 0.8 + 0.1;
        });

        requestAnimationFrame(animateFog);
    }

    // Create fog cells initially
    createFogCells();

    // Start animation
    animateFog();

    // Recreate fog cells on window resize
    window.addEventListener('resize', () => {
        createFogCells();
    });
});
