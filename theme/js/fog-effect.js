document.addEventListener('DOMContentLoaded', () => {
    console.log('Fog effect script loaded!');
    
    const fogGrid = document.querySelector('.fog-grid');
    
    if (fogGrid) {
        console.log('Fog grid initialization started.');

        const fogCells = Array.from(fogGrid.querySelectorAll('.fog-cell'));
        
        // Function to animate opacity for a given cell
        const animateFogCell = (cell) => {
            const randomOpacity = Math.random() * 0.7 + 0.2; // Random opacity between 0.2 and 0.9
            const randomDelay = Math.random() * 5000; // Random delay up to 5 seconds
            
            setTimeout(() => {
                cell.style.opacity = randomOpacity;
                setTimeout(() => {
                    cell.style.opacity = 0;
                }, 2000); // Fade out after 2 seconds
            }, randomDelay);
        };
        
        // Animate all cells
        fogCells.forEach(cell => {
            setInterval(() => animateFogCell(cell), 3000); // Re-animate every 3 seconds
        });

        console.log('Fog animation started.');
    } else {
        console.log('No fog grid element found.');
    }
});
