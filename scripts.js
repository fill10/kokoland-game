// scripts.js

// تبديل عرض الشاشات
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function goHome() {
  showScreen('home');
}

// =============== كوكو: ترتيب الحروف ===============
function initKoko() {
  const lettersContainer = document.getElementById('letters');
  if (!lettersContainer) return;

  const letters = ["أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز"]; // للتجربة
  lettersContainer.innerHTML = "";

  letters.forEach(letter => {
    const div = document.createElement("div");
    div.className = "drop-zone";
    div.textContent = letter;
    lettersContainer.appendChild(div);
  });
}

// =============== أحمد: البازل ===============
function initAhmad() {
  const puzzleBoard = document.getElementById('puzzle-board');
  if (!puzzleBoard) return;

  puzzleBoard.innerHTML = "<p>🚧 البازل قيد الإنشاء 🚧</p>";
}

// =============== سارة: التلوين ===============
function initSarah() {
  const gallery = document.getElementById('coloring-gallery');
  if (!gallery) return;

  gallery.innerHTML = "<p>🎨 قسم التلوين قيد الإنشاء 🎨</p>";
}

// =============== تشغيل عند فتح الصفحة ===============
document.addEventListener("DOMContentLoaded", () => {
  initKoko();
  initAhmad();
  initSarah();
});
