// === COUNTER FUNKTIONEN ===
let counter = 0;
let step = 1;

function updateCounter() {
    document.getElementById('counter-number').textContent = counter;
}

function setStep(newStep) {
    step = newStep;
    document.querySelectorAll('.step-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="setStep(${newStep})"]`).classList.add('active');
}

function increaseCounter() {
    counter += step;
    updateCounter();
}

function decreaseCounter() {
    counter = Math.max(0, counter - step);
    updateCounter();
}

function resetCounter() {
    counter = 0;
    updateCounter();
}

// === BILD NAVIGATION ===
const images = [
    "/Semesteraufgabe/images/Webtech-Häkeln/Biene-vorne.jpg",
    "/Semesteraufgabe/images/Webtech-Häkeln/Biene-seite.jpg",
    "/Semesteraufgabe/images/Webtech-Häkeln/Biene-hinten.jpg"
];
let currentImageIndex = 0;

function updateImage() {
    document.getElementById('main-image').src = images[currentImageIndex];
    document.getElementById('image-counter').textContent = `${currentImageIndex + 1} / ${images.length}`;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
}

