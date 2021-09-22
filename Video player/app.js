let mouseDown = false;

const video = document.querySelector("video");
const playBtn = document.querySelector(".playBtn");
const skipBtns = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll("[type=range]");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-filled");
const fullScreen = document.querySelector("#full-screen");

video.addEventListener("click", togglePlay);
video.addEventListener("play", toggleButton);
video.addEventListener("pause", toggleButton);
video.addEventListener("timeupdate", handleProgress);
playBtn.addEventListener("click", togglePlay);
skipBtns.forEach((btn) => btn.addEventListener("click", handleSkip));
ranges.forEach((range) => range.addEventListener("change", handleRange));
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && debounce(scrub)(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
fullScreen.addEventListener("click", handleFullScreen);

function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function toggleButton(e) {
  if (video.paused) playBtn.textContent = "❚❚";
  else playBtn.textContent = "►";
}

function handleSkip(e) {
  const duration = e.target.dataset.skip;
  video.currentTime += parseFloat(duration);
}

function handleRange(e) {
  const name = e.target.name;
  video[name] = parseFloat(e.target.value);
}

function handleProgress(e) {
  const length = video.duration;
  const current = video.currentTime;
  const percent = (current / length) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / e.target.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function debounce(fn) {
  let timer;
  return function (args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      fn(args);
    }, 200);
  };
}

function handleFullScreen(e) {
  video.requestFullscreen();
}
