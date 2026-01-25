let matchedCount = 0;
const totalLetters = document.querySelectorAll(".dropzone").length;

document.querySelectorAll(".letter").forEach(letter => {
  letter.addEventListener("dragstart", e => {
    e.dataTransfer.setData("letter", letter.dataset.letter);
    e.dataTransfer.setData("id", letter.src);
  });
});

document.querySelectorAll(".dropzone").forEach(zone => {
  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.classList.add("over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("over");
  });

  zone.addEventListener("drop", e => {
    e.preventDefault();
    const draggedLetter = e.dataTransfer.getData("letter");
    const imgSrc = e.dataTransfer.getData("id");

    if (draggedLetter === zone.dataset.letter) {
      zone.textContent = "";
      const img = document.createElement("img");
      img.src = imgSrc;
      img.style.width = "80px";
      zone.appendChild(img);
      zone.classList.remove("over");
      new Audio("assets/sounds/success.mp3").play();

      matchedCount++;
      if (matchedCount === totalLetters) {
        document.getElementById("congrats").classList.add("show");
        new Audio("assets/sounds/complete.mp3").play();
      }
    } else {
      new Audio("assets/sounds/error.mp3").play();
      zone.classList.remove("over");
    }
  });
});
