// Debug log to confirm script loading
console.log('flipbook.js loaded');

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
    let timedOut = false;

    const timeout = setTimeout(() => {
        timedOut = true;
        console.warn("Image preloading timed out. Proceeding anyway.");
        callback(); // Continue even if not all images loaded
    }, 5000); // 5 seconds max wait

    imageArray.forEach((src) => {
        const img = new Image();
        img.src = src;

        img.onload = img.onerror = () => {
            if (timedOut) return;
            loadedImages++;
            if (loadedImages === imageArray.length) {
                clearTimeout(timeout);
                callback();
            }
        };
    });
}


// Updated showImage function with null-checks
function showImage(index, direction) {
    if (!carouselImage) {
        console.error("Carousel image element is null. Cannot display image.");
        return;
    }

    const flipClass = direction === 'left' ? 'flip-left' : 'flip-right';

    // Add animation class
    carouselImage.classList.add(flipClass);

    // Change the image after half the animation
    setTimeout(() => {
        if (images[index]) {
            carouselImage.src = images[index];
        } else {
            console.error(`Image at index ${index} is null or undefined.`);
        }
    }, animationDuration / 2);

    // Remove the animation class after the animation ends
    setTimeout(() => {
        carouselImage.classList.remove(flipClass);
    }, animationDuration);
}

// Ensure buttons exist before adding event listeners
if (prevButton) {
    prevButton.addEventListener('click', () => {
        const newIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(newIndex, 'left');
        currentIndex = newIndex;
    });
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        const newIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(newIndex, 'right');
        currentIndex = newIndex;
    });
}

// Ensure flipbook trigger exists before adding event listener
const flipbookTrigger = document.querySelector('.flipbook-target');

if (flipbookTrigger) {
    console.log("Flipbook element found. Initializing event listener.");
    flipbookTrigger.addEventListener('click', () => {
        console.log("Flipbook trigger clicked. Executing logic.");
        // Flipbook logic
    });
} else {
    console.warn("Flipbook element not found – skipping init.");
}

// Initialize the flipbook
function initializeFlipbook() {
    // Ensure DOM elements exist before accessing their properties
    if (loadingOverlay) {
        console.log('Hiding loading overlay');
        loadingOverlay.style.display = 'none'; // Hide loading overlay
    } else {
        console.warn('Loading overlay element not found');
        const fallbackOverlay = document.getElementById('loading');
        if (fallbackOverlay) {
            fallbackOverlay.style.display = 'none';
        } else {
            console.error("Fallback loading overlay element not found.");
        }
    }

    if (flipbookContainer) {
        flipbookContainer.style.display = 'block'; // Show flipbook container
    } else {
        console.warn("Flipbook container element not found – skipping init.");
    }

    if (carouselImage) {
        showImage(currentIndex, 'right'); // Display the first image
    } else {
        console.warn("Carousel image element not found – skipping init.");
    }

    // Debugging image loading
    images.forEach((src, index) => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            console.log(`Image ${index} loaded successfully: ${src}`);
        };

        img.onerror = () => {
            console.error(`Failed to load image ${index}: ${src}`);
        };
    });
}

// Ensure DOM readiness before executing logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed. Initializing flipbook.');

    // Start preloading images
    preloadImages(images, () => {
        console.log('All images preloaded. Executing initializeFlipbook.');
        initializeFlipbook();
    });

    // Force hide loading screen after timeout
    setTimeout(() => {
        if (loadingOverlay) {
            console.log('Force hiding loading screen after timeout');
            loadingOverlay.style.display = 'none';
        }
    }, 10000);
});
