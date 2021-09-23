const currentChar = document.querySelector(".currentKey");
window.addEventListener("keyup", handleKeyPress);

const secretCode = "hello";
const pressedKeys = [];

function handleKeyPress(e) {
  currentChar.innerHTML = e.key;
  pressedKeys.push(e.key);
  pressedKeys.splice(0, pressedKeys.length - secretCode.length);

  if (pressedKeys.join("") === secretCode) cornify_add();
}
