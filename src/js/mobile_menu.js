var mobileMenu = (function() {
  var toggleMenuIcon = document.getElementsByClassName("header-nav__mobile-nav-toggle")[0],
      menu = document.getElementsByClassName("header-nav__items")[0];

  return {
    init: function() {
      toggleMenuIcon.onclick = function() {
        menu.classList.toggle("header-nav__items--active");
      };
    }
  }
})();

module.exports = mobileMenu;
