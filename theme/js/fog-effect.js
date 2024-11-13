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
        const cellSize = 20; // Try smaller increments here for smoother results
        const numCols = Math.floor(gridWidth / cellSize);
        const numRows = Math.floor(gridHeight / cellSize);
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
        const time = Date.now() * 0.0002; // Adjust animation speed

        cells.forEach((cell, index) => {
            const x = index % Math.floor(fogGrid.offsetWidth / 20);
            const y = Math.floor(index / Math.floor(fogGrid.offsetWidth / 20));
            const noiseValue = simplex.noise3D(x * 0.1, y * 0.1, time);
            const opacity = (noiseValue + 1) / 2; // Normalize to [0, 1]
            cell.style.opacity = opacity * 0.7 + 0.2; // Adjust opacity range
        });
    }

    createFogCells();
    setInterval(animateFog, 100); // Adjust for smoother animation

    window.addEventListener('resize', () => {
        createFogCells();
        animateFog();
    });
});
