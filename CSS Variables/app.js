const inputs = document.querySelectorAll("input");

inputs.forEach(function (item) {
  item.addEventListener("change", handleChange);
  item.addEventListener("mousemove", handleChange);
});

function handleChange(e) {
  const name = e.target.name;
  const value = e.target.value;
  const suffix = e.target.dataset.sizing || "";

  document.documentElement.style.setProperty(`--${name}`, `${value}${suffix}`);
}
