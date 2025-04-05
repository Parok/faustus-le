// Array of image URLs
const images = [
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0001-scaled-1.jpeg",
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0002-scaled-1.jpeg",
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0003-scaled-1.jpeg",
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0004-scaled-1.jpeg",
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0005-scaled-1.jpeg",
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0006-scaled-1.jpeg",
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0007-scaled-1.jpeg",
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0008-scaled-1.jpeg",
    "https://faustus.club/wp-content/uploads/2025/02/Getraenkekarte-Januar-2025_page-0009-scaled-1.jpeg"
]
//Dateiname: Getraenkekarte-Januar-2025_page-0004-scaled-1.jpeg
// Track current index
let currentIndex = 0;

// Get DOM elements
const carouselImage = document.getElementById('flipbook-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const loadingOverlay = document.getElementById('loading');
const flipbookContainer = document.getElementById('flipbook');

// Animation duration (matches CSS)
const animationDuration = 600;

// Preload images
function preloadImages(imageArray, callback) {
    let loadedImages = 0;

    imageArray.forEach((src) => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            loadedImages++;
            if (loadedImages === imageArray.length) {
                callback(); // All images are preloaded
            }
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            loadedImages++;
            if (loadedImages === imageArray.length) {
                callback(); // Continue even if some images fail
            }
        };
    });
}

// Function to display the current image with flipping animation
function showImage(index, direction) {
    const flipClass = direction === 'left' ? 'flip-left' : 'flip-right';

    // Add animation class
    carouselImage.classList.add(flipClass);

    // Change the image after half the animation
    setTimeout(() => {
        carouselImage.src = images[index];
    }, animationDuration / 2);

    // Remove the animation class after the animation ends
    setTimeout(() => {
        carouselImage.classList.remove(flipClass);
    }, animationDuration);
}

// Event listeners for buttons
prevButton.addEventListener('click', () => {
    const newIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    showImage(newIndex, 'left');
    currentIndex = newIndex;
});

nextButton.addEventListener('click', () => {
    const newIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    showImage(newIndex, 'right');
    currentIndex = newIndex;
});

// Initialize the flipbook
function initializeFlipbook() {
    loadingOverlay.style.display = 'none'; // Hide loading overlay
    flipbookContainer.style.display = 'block'; // Show flipbook container
    showImage(currentIndex, 'right'); // Display the first image
}

// Start preloading images
preloadImages(images, initializeFlipbook);
