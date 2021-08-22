const keys = Array.from(document.querySelectorAll(".key"));

keys.forEach(function (key) {
  key.addEventListener("click", onButtonClick);
  key.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", onKeyPress);

function onKeyPress(e) {
  playSound(e.key);
}

function onButtonClick(e) {
  const key = e.target.getAttribute("data-key");
  playSound(key);
}

function playSound(id) {
  const audio = document.querySelector(`audio[data-key="${id}"]`);
  const key = document.querySelector(`div[data-key="${id}"]`);

  if (audio === null) return;

  key.classList.add("playing");
  audio.currentTime = 0; // reset audio to start position
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}
