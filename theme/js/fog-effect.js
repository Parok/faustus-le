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
        cells.forEach((cell, index) => {
            const randomOpacity = Math.random() * 0.6 + 0.4; // Random opacity between 0.4 and 1.0
            const randomDelay = Math.random() * 2000;
            console.log(`Cell ${index}: Setting opacity to ${randomOpacity}`);
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
