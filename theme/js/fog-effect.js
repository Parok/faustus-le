console.log("Fog effect script with Perlin noise loaded!");

let simplex;

document.addEventListener('DOMContentLoaded', function () {
    const fogGrid = document.querySelector('.fog-grid');
    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    simplex = new SimplexNoise();
    console.log("SimplexNoise object:", simplex);

    function createFogCells() {
        fogGrid.innerHTML = '';
        const gridWidth = fogGrid.offsetWidth;
        const gridHeight = fogGrid.offsetHeight;
        const cellSize = 30; // Adjust for density
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
        return { numCols, numRows };
    }

    const { numCols, numRows } = createFogCells();

    // Use a single animation frame request for smoother performance
    let lastTime = 0;
    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        const time = Date.now() * 0.00005; // Adjust speed for smoother animation

        cells.forEach((cell, index) => {
            const x = index % numCols;
            const y = Math.floor(index / numCols);
            const noiseValue = simplex.noise3D(x * 0.1, y * 0.1, time);
            const opacity = (noiseValue + 1) / 2; // Normalize to [0, 1]
            cell.style.opacity = opacity * 0.6 + 0.2;
        });

        requestAnimationFrame(animateFog);
    }

    animateFog();

    // Handle resizing
    window.addEventListener('resize', () => {
        createFogCells();
    });
});
