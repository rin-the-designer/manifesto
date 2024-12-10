let predefinedColors = [
  ["#FF7700", "#181818"],
  ["#FFAA22", "#181818"],
  ["#006AFF", "#181818"],
  ["#FFFFFF", "#181818"],
  //["#181818", "#FFFFFF"],
];

let isAudioLoaded = false;
let isTextLoaded = false;

function keyPressed() {
  if (key == "f") toggleFullscreen();
  if (key == " ") togglePlay();
}

// For Nav Item
fetch("/assets/text/main.txt")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("main-text").textContent = data;
  });

fetch("/assets/text/manifesto.txt")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("manifesto-text").innerText = data;
  });

function showReadContent() {
  if ($("#read-content").css("display") === "block") {
    $("#read-content").css("display", "none");
    $("#read").text("Read");
    $("#play").text("Play");
    $("#play").removeClass("display-none");
  } else {
    $("#read-content").css("display", "block");
    $("#read").text("Close");
    audioElement.pause();
    $("#play").text("Play");
    $("#play").addClass("display-none");
  }
}

$("#read").on("click", showReadContent);
