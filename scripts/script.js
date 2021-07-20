const container = document.querySelector("#container");
setGridItems(4);
container.style.display = "grid";
container.style.width = "960px";
container.style.height = "85vh";
container.style.backgroundColor = "white";

const body = document.querySelector("body");
const button = document.createElement("button");
button.textContent = "Clear";
button.style.height = "10vh";
button.style.width = "150px";
button.style.fontSize = "3rem";
button.addEventListener("click", () => {
  clear(), request();
});
body.insertBefore(button, container);
body.style.backgroundColor = "crimson";
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.justifyContent = "space-evenly";
body.style.alignItems = "center";
body.style.height = "100vh";

function clear() {
  let gridItems = document.querySelectorAll("#container>*");
  gridItems.forEach((gi) => {
    gi.style.backgroundColor = "white";
    gi.style.filter="";
  });
}

function request() {
  let request = parseInt(prompt("new of squares per side?"));
  request = request > 100 ? 100 : request;
  request = request < 2 ? 2 : request;
  if (isNaN(request)) return;
  setGridItems(request);
}

function setGridItems(sideBoxes) {
  container.style.gridTemplateColumns = `repeat(${sideBoxes}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${sideBoxes}, 1fr)`;
  removeChilds(container);

  for (let i = 0; i < sideBoxes ** 2; i++) {
    const newDivChild = document.createElement("div");
    newDivChild.style.backgroundColor = "white";
    container.appendChild(newDivChild);
  }
  let gridItems = document.querySelectorAll("#container>*");
  let currentColor;
  gridItems.forEach((item) => {
    item.style.transition = "all 0.35s ease-out";
    item.addEventListener("mouseenter", (e) => {
      currentColor = e.target.style.backgroundColor;
      if (currentColor === "white") {
        let hue = getRandomColor();
        e.target.style.backgroundColor = `hsl(${hue},100%,50%`;
      } else {
        e.target.style.backgroundColor = currentColor;
        readBrightness(e);
      }
    });
  });
}

function removeChilds(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function getRandomColor() {
  return Math.floor(Math.random() * 360);
}

function readBrightness(e) {
  let brightness = e.target.style.filter;
  if (brightness === "") {
    e.target.style.filter = "brightness(0.9)";
  } else {
    let value = brightness.slice(11, 14);
    value = +value - 0.1;
    e.target.style.filter = `brightness(${value})`;
  }
}
