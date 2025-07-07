//COUNTER FUNKTIONEN //
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

