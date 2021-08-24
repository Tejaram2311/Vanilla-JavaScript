const panels = Array.from(document.querySelectorAll(".panel"));

panels.forEach(function (panel) {
  panel.addEventListener("click", toggleOpen);
  panel.addEventListener("transitionend", toggleActive);
});

function toggleOpen(e) {
  e.target.classList.toggle("open");
}

function toggleActive(e) {
  if (e.propertyName.includes("flex")) e.target.classList.toggle("open-active");
}
