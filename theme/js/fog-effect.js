document.addEventListener('DOMContentLoaded', function () {
    const fogGrid = document.querySelector('.fog-grid');

    const numCells = 100;
    for (let i = 0; i < numCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('fog-cell');
        fogGrid.appendChild(cell);
    }

    function animateFog() {
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
});
