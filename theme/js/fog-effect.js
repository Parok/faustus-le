console.log("Fog effect script loaded!");

document.addEventListener('DOMContentLoaded', function () {
    console.log("Fog grid initialization started.");

    const fogGrid = document.querySelector('.fog-grid');
    console.log("Fog grid element found:", fogGrid);

    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    // Get the dimensions of the fog grid
    const gridWidth = fogGrid.offsetWidth;
    const gridHeight = fogGrid.offsetHeight;
    console.log(`Fog grid size: ${gridWidth}x${gridHeight}`);

    // Define the size of each cell (you can adjust this size for better performance)
    const cellSize = 30; // 30px x 30px cells

    // Calculate the number of cells needed based on the grid's size
    const numCols = Math.ceil(gridWidth / cellSize);
    const numRows = Math.ceil(gridHeight / cellSize);
    const totalCells = numCols * numRows;

    console.log(`Generating ${totalCells} fog cells...`);

    // Create the fog cells
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('fog-cell');
        fogGrid.appendChild(cell);
    }
    console.log("Fog cells created.");

    // Animation function
    function animateFog() {
        const cells = document.querySelectorAll('.fog-cell');
        cells.forEach((cell) => {
            const randomOpacity = Math.random() * 0.5 + 0.3;
            const randomDelay = Math.random() * 1000; // Adjust delay for smoother effect
            setTimeout(() => {
                cell.style.opacity = randomOpacity;
                setTimeout(() => {
                    cell.style.opacity = 0;
                }, 1500);
            }, randomDelay);
        });
    }

    // Start the animation loop
    setInterval(animateFog, 3000);
    console.log("Fog animation started.");
});
