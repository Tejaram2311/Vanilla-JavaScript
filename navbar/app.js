let isNavOpen = false;

function toggleNav(openNav) {
  const mobileNav = document.querySelector(".mNav");

  isNavOpen
    ? mobileNav.classList.remove("open")
    : mobileNav.classList.add("open");

  isNavOpen = !isNavOpen;
}
