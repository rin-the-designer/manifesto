const body = document.body;
const main = document.querySelector("main");

function preload() {
  loadFiles();
}

function setup() {
  noCanvas();

  document.getElementById("read").addEventListener("click", function () {
    body.classList.add("about-visible");
    audioElem.pause();
  });
  document.getElementById("close-about").addEventListener("click", function () {
    body.classList.remove("about-visible");
  });
  let words = body.querySelectorAll("[word]");
  for (let w of words) {
    w.addEventListener("mouseover", function () {
      this.setAttribute("glitch", findNew(this.getAttribute("glitch"), 0, 4));
    });
  }
}
