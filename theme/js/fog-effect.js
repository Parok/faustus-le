console.log("Fog effect script with Perlin noise loaded!");

document.addEventListener('DOMContentLoaded', function () {
    const fogGrid = document.querySelector('.fog-grid');
    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    const simplex = new SimplexNoise();
    console.log("SimplexNoise object:", simplex);
    const cellSize = 20;

    function createFogCells() {
        fogGrid.innerHTML = '';
        const gridWidth = fogGrid.offsetWidth;
        const gridHeight = fogGrid.offsetHeight;
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

    let lastTime = 0;

    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        const time = Date.now() * 0.00035; // Adjusted speed for more visible change
        console.log("Animating fog at time:", time); // Add this line
    
        cells.forEach((cell, index) => {
            const x = index % Math.ceil(fogGrid.offsetWidth / cellSize);
            const y = Math.floor(index / Math.ceil(fogGrid.offsetWidth / cellSize));
            const noiseValue = simplex.noise3D(x * 0.1, y * 0.1, time);
            const opacity = (noiseValue + 1) / 2;
            cell.style.opacity = opacity * 0.3 + 0.1; // Increase range for better visibility
            cell.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;

        });
    
        window.setTimeout(requestAnimationFrame(animateFog), 1000 / 60);
    }
    

    animateFog();

    window.addEventListener('resize', () => {
        createFogCells();
    });
});