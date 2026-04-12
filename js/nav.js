// nav.js — Mobile hamburger menu + navbar scroll shadow
(function () {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  // Scroll shadow
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
      });
    });
  }
})();
