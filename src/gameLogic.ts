// ✅ تحميل حروف المرحلة
function loadStage(stageIndex: number) {
  const stageLetters = stages[stageIndex];
  console.log("تحميل الحروف:", stageLetters);

  // 🔄 نظف المنطقة القديمة
  const gameBoard = document.getElementById("gameBoard");
  if (gameBoard) gameBoard.innerHTML = "";

  // 🅰️ إنشاء drop zones (المربعات الشفافة المرتبة أبجديًا)
  stageLetters.forEach((letter) => {
    const dropZone = document.createElement("div");
    dropZone.className = "drop-zone";
    dropZone.dataset.letter = letter;
    dropZone.textContent = letter; // ممكن نستبدلها بصورة شفافة
    gameBoard?.appendChild(dropZone);
  });

  // 🖼️ إنشاء العناصر القابلة للسحب (صور عشوائية مرتبطة بالحروف)
  const draggableArea = document.getElementById("draggables");
  if (draggableArea) draggableArea.innerHTML = "";

  stageLetters.forEach((letter) => {
    const item = document.createElement("div");
    item.className = "draggable";
    item.draggable = true;
    item.dataset.letter = letter;
    item.textContent = letter; // مؤقتًا: الحرف نفسه

    // ✅ ربط الأحداث للسحب
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer?.setData("text", letter);
    });

    draggableArea?.appendChild(item);
  });

  // ✅ ربط الأحداث للإفلات
  document.querySelectorAll(".drop-zone").forEach((zone) => {
    zone.addEventListener("dragover", (e) => e.preventDefault());

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      const droppedLetter = e.dataTransfer?.getData("text");
      const targetLetter = (zone as HTMLElement).dataset.letter;

      if (droppedLetter === targetLetter) {
        onCorrectDrop();
        (zone as HTMLElement).style.background = "#b6f7c1"; // أخضر فاتح
        (zone as HTMLElement).textContent = "✔";
      } else {
        onWrongDrop();
        (zone as HTMLElement).style.background = "#f7b6b6"; // أحمر فاتح
      }
    });
  });
}
