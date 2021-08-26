const canvas = document.querySelector("#draw");

canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#A5CECD";
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 1;
// ctx.globalCompositeOperation = "luminosity";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let widthIncrement = true;

function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  lastX = e.offsetX;
  lastY = e.offsetY;
  hue = (hue + 1) % 360;

  if (ctx.lineWidth <= 1 || ctx.lineWidth >= 100)
    widthIncrement = !widthIncrement;

  ctx.lineWidth += widthIncrement ? 1 : -1;
}

function startDrawing(e) {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
}

function stopDrawing() {
  isDrawing = false;
}
