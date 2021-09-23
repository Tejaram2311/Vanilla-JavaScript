const slideImages = document.querySelectorAll(".slide-in");

window.addEventListener("scroll", debounce(handleScroll));

function handleScroll() {
  slideImages.forEach(handleSlide);
}

function handleSlide(slide) {
  const slideInAt = window.innerHeight + window.scrollY - slide.height / 2;
  const imageBottom = slide.offsetTop + slide.height;
  const isHalfShown = slideInAt > slide.offsetTop;
  const isNotScrolledPast = window.scrollY < imageBottom;

  if (isHalfShown && isNotScrolledPast) slide.classList.add("active");
  else slide.classList.remove("active");
}

function debounce(fn, delay = 20) {
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => fn.apply(context, args), delay);
  };
}
