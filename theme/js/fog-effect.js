console.log("Fog effect script loaded!");

document.addEventListener('DOMContentLoaded', function () {
    console.log("Fog grid initialization started.");

    const fogGrid = document.querySelector('.fog-grid');
    console.log("Fog grid element found:", fogGrid);

    if (!fogGrid) {
        console.error("Fog grid not found. Exiting script.");
        return;
    }

    const numCells = 100;
    for (let i = 0; i < numCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('fog-cell');
        fogGrid.appendChild(cell);
    }
    console.log("Fog cells created.");

    function animateFog() {
        console.log("Animating fog");
        const cells = document.querySelectorAll('.fog-cell');
        cells.forEach(cell => {
            const randomOpacity = Math.random() * 0.3 + 0.1;
            const randomDelay = Math.random() * 2000;
            setTimeout(() => {
                cell.style.opacity = randomOpacity;
                setTimeout(() => {
                    cell.style.opacity = 0;
                }, 2000);
            }, randomDelay);
        });
    }

    setInterval(animateFog, 3000);
    console.log("Fog animation started.");
});
