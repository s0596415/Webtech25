let count = 0;          // Aktueller Zähler-Wert (startet bei 0)
let step = 1;           // Schrittweite für +/- Buttons (standardmäßig 1)


/*Plus Funktion*/ 
function add() {        
    count += step;      // Zähler um aktuelle Schrittweite erhöhen
    update();          // Anzeige aktualisieren
}

/*  MINUS-FUNKTION  */
function subtract() {   
    if (count >= step) {    // Nur verringern wenn Zähler größer/gleich Schrittweite
        count -= step;      // Zähler um aktuelle Schrittweite verringern
    }
    // WICHTIG: Verhindert negative Zahlen!
    // Wenn count < step, passiert nichts
    update();              // Anzeige aktualisieren
}

/* RESET-FUNKTION - Zähler zurücksetzen */
function reset() {      
    count = 0;          // Zähler auf 0 zurücksetzen
    update();          // Anzeige aktualisieren
}

/*UPDATE-FUNKTION - Anzeige im Browser aktualisieren
 * Wird von allen anderen Funktionen aufgerufen
 * Sorgt dafür, dass der Benutzer die Änderung sieht
 */
function update() {     
    // HTML-Element mit ID 'counter' finden und Text ändern
    document.getElementById('counter').textContent = count;
}
