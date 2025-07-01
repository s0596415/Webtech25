    function toggleSlideMenu() {
    const slideMenu = document.getElementById("slideMenu");
    const slideMenuOverlay = document.getElementById("slideMenuOverlay");
    
    slideMenu.classList.toggle("show");
    slideMenuOverlay.classList.toggle("show");
    
    // Prevent body scroll when menu is open
    if (slideMenu.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  function closeSlideMenu() {
    const slideMenu = document.getElementById("slideMenu");
    const slideMenuOverlay = document.getElementById("slideMenuOverlay");
    
    slideMenu.classList.remove("show");
    slideMenuOverlay.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  // Verbesserte Interaktivität
  document.addEventListener('DOMContentLoaded', function() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
      });
    });

    // Smooth scroll für Links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });