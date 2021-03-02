const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");
const navItems = [nav1, nav2, nav3, nav4, nav5];

function replaceSlideInOut(navItems, oldToken, newToken) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(
      `slide-${oldToken}-${i + 1}`,
      `slide-${newToken}-${i + 1}`
    );
  });
}

function toggleNav() {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    replaceSlideInOut(navItems, "out", "in")
  } else {
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    replaceSlideInOut(navItems, "in", "out")
  }
}

// Event Listeners
menuBars.addEventListener("click", toggleNav);
navItems.forEach((nav) => nav.addEventListener("click", toggleNav));