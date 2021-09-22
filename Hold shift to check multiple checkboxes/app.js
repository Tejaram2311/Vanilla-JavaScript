const checkboxes = document.querySelectorAll("input[type=checkbox]");
let lastChecked;

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("click", onChecked);
});

function onChecked(e) {
  let inBetween = false;

  if (e.shiftKey && e.target.checked) {
    checkboxes.forEach(function (checkbox) {
      if (checkbox === e.target || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween) checkbox.checked = true;
    });
  }

  lastChecked = this;
}
