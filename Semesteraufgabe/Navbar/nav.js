 // Funktion zum Öffnen/Schließen des Slide-Menüs
function toggleSlideMenu() {
  const slideMenu = document.getElementById("slideMenu");             // Hol das Menü-Element
  const slideMenuOverlay = document.getElementById("slideMenuOverlay"); // Hol den dunklen Overlay-Hintergrund

  // Sichtbarkeit umschalten: "show"-Klasse hinzufügen oder entfernen
  slideMenu.classList.toggle("show");
  slideMenuOverlay.classList.toggle("show");

  // Wenn Menü geöffnet ist, das Scrollen der Seite verhindern
  if (slideMenu.classList.contains("show")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto"; // sonst wieder erlauben
  }
}

// Funktion zum expliziten Schließen des Slide-Menüs
function closeSlideMenu() {
  const slideMenu = document.getElementById("slideMenu");
  const slideMenuOverlay = document.getElementById("slideMenuOverlay");

  // "show"-Klassen entfernen = Menü und Overlay ausblenden
  slideMenu.classList.remove("show");
  slideMenuOverlay.classList.remove("show");

  // Scrollen wieder aktivieren
  document.body.style.overflow = "auto";
}

// Sobald das HTML geladen ist, folgendes ausführen:
document.addEventListener('DOMContentLoaded', function() {

  // Alle Such-Eingabefelder finden
  const searchInputs = document.querySelectorAll('.search-input');

  // Für jedes Input-Feld eine Animation beim Fokus (rein) und Blur (raus) hinzufügen
  searchInputs.forEach(input => {
    input.addEventListener('focus', function() {
      // Wenn Feld aktiv ist → um 2% vergrößern (optische Hervorhebung)
      this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
      // Wenn Fokus verloren geht → zurück zur Originalgröße
      this.parentElement.style.transform = 'scale(1)';
    });
  });

  // Smooth Scroll für alle internen Links (Links mit #)
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Standardverhalten (hartes Springen) verhindern
      const target = document.querySelector(this.getAttribute('href')); // Ziel-Element finden
      if (target) {
        // Sanft scrollen statt springen
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
