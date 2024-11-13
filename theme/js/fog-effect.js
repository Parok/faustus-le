console.log("Fog effect script loaded!");

document.addEventListener('DOMContentLoaded', function () {
    console.log("Fog grid initialization started.");

    const fogGrid = document.querySelector('.fog-grid');
    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    function createFogCells() {
        fogGrid.innerHTML = ''; // Clear existing cells
        const gridWidth = fogGrid.offsetWidth;
        const gridHeight = fogGrid.offsetHeight;
        console.log(`Fog grid size: ${gridWidth}x${gridHeight}`);

        // Define the size of each cell
        const cellSize = 30;
        const numCols = Math.ceil(gridWidth / cellSize);
        const numRows = Math.ceil(gridHeight / cellSize);
        const totalCells = numCols * numRows;

        console.log(`Generating ${totalCells} fog cells...`);
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('fog-cell');
            fogGrid.appendChild(cell);
        }
        console.log("Fog cells created.");
    }

    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        cells.forEach((cell) => {
            const randomOpacity = Math.random() * 0.5 + 0.3;
            const randomDelay = Math.random() * 1000; // Shorter delay for smoother animation
            setTimeout(() => {
                cell.style.opacity = randomOpacity;
                setTimeout(() => {
                    cell.style.opacity = 0;
                }, 1500);
            }, randomDelay);
        });
    }

    // Initial creation of fog cells
    createFogCells();
    setInterval(animateFog, 3000);
    console.log("Fog animation started.");

    // Recreate cells on window resize
    window.addEventListener('resize', () => {
        createFogCells();
        animateFog();
    });
});
