console.log("Fog effect script with Perlin noise loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogGrid = document.querySelector('.fog-grid');
    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    const simplex = new SimplexNoise();
    console.log("SimplexNoise object:", simplex);

    // Function to create fog cells
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
        return { numCols, numRows };
    }

    // Create cells and get grid dimensions
    let { numCols, numRows } = createFogCells();

    // Animation function with requestAnimationFrame
    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        const time = Date.now() * 0.0002; // Adjust for smoother animation

        cells.forEach((cell, index) => {
            const x = index % numCols;
            const y = Math.floor(index / numCols);
            const noiseValue = simplex.noise3D(x * 0.1, y * 0.1, time);
            const opacity = (noiseValue + 1) / 2; // Normalize to [0, 1]
            cell.style.opacity = opacity * 0.8 + 0.2;
        });

        requestAnimationFrame(animateFog); // Continue animation
    }

    // Start the animation
    requestAnimationFrame(animateFog);

    // Handle window resize
    window.addEventListener('resize', () => {
        ({ numCols, numRows } = createFogCells()); // Recreate cells on resize
    });
});
