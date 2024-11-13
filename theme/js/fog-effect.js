document.addEventListener('DOMContentLoaded', function () {
    const fogGrid = document.querySelector('.fog-grid');
    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    const simplex = new SimplexNoise();
    let numCols, numRows, totalCells;

    // Cache grid dimensions
    function createFogCells() {
        fogGrid.innerHTML = '';
        const gridWidth = fogGrid.offsetWidth;
        const gridHeight = fogGrid.offsetHeight;
        const cellSize = 30;
        numCols = Math.floor(gridWidth / cellSize);
        numRows = Math.floor(gridHeight / cellSize);
        totalCells = numCols * numRows;

        fogGrid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        fogGrid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('fog-cell');
            fogGrid.appendChild(cell);
        }
    }

    createFogCells();

    // Optimize animation with requestAnimationFrame
    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        const time = Date.now() * 0.0002; // Slower animation speed

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const x = i % numCols;
            const y = Math.floor(i / numCols);
            const noiseValue = simplex.noise3D(x * 0.1, y * 0.1, time);
            const opacity = (noiseValue + 1) / 2;
            cell.style.opacity = opacity * 0.6 + 0.2;
        }
        requestAnimationFrame(animateFog);
    }

    animateFog();

    window.addEventListener('resize', () => {
        createFogCells();
    });
});
