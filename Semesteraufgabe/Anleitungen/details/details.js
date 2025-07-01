let count = 0;          // Zähler
let step = 1;           // Schrittweite

function add() {        // Erhöhen
    count += step;
    update();
}

function subtract() {   // Verringern  
    if (count >= step) count -= step;
    update();
}

function reset() {      // Zurücksetzen
    count = 0;
    update();
}

function update() {     // Anzeige aktualisieren
    document.getElementById('counter').textContent = count;
}