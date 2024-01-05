// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });


document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const mobileNavMenu = document.getElementById("mobile-nav-menu");

  function toggleMenu() {
    mobileNavMenu.style.display = mobileNavMenu.style.display === "flex" ? "none" : "flex";
  }

  menuIcon.addEventListener("click", toggleMenu);

  mobileNavMenu.addEventListener("click", function (event) {
    // Perform the click action based on the clicked element (e.g., scroll to the section)
    if (event.target.tagName === "A") {
      // Example: Scroll to the section with the ID from the href attribute
      const sectionId = event.target.getAttribute("href").substring(1);
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });

      // Close the menu after the click action is performed
      mobileNavMenu.style.display = "none";
    }
  });

  document.addEventListener("click", function (event) {
    const isClickInsideMenu = mobileNavMenu.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuIcon) {
      mobileNavMenu.style.display = "none";
    }
  });
});
