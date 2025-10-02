import letterSounds from "./assets/letterSounds";
import generalSounds from "./assets/generalSounds";
import confetti from "canvas-confetti";

let score = 0;
let currentStage = 0; // نبدأ من المرحلة 0
const stages: string[][] = [
  ["أ", "ب", "ت", "ث", "ج"],
  ["ح", "خ", "د", "ذ", "ر"],
  ["ز", "س", "ش", "ص", "ض"],
  ["ط", "ظ", "ع", "غ", "ف"],
  ["ق", "ك", "ل", "م", "ن"],
  ["هـ", "و", "ي"]
];

// ✅ تشغيل الأصوات العامة
function playSound(type: "success" | "error" | "complete") {
  const audio = new Audio(generalSounds[type]);
  audio.play();
}

// ✅ عداد النقاط المرئي
function updateScoreDisplay() {
  let scoreBox = document.getElementById("scoreBox");
  if (!scoreBox) {
    scoreBox = document.createElement("div");
    scoreBox.id = "scoreBox";
    scoreBox.style.position = "fixed";
    scoreBox.style.top = "10px";
    scoreBox.style.left = "50%";
    scoreBox.style.transform = "translateX(-50%)";
    scoreBox.style.background = "#ffcc00";
    scoreBox.style.padding = "10px 20px";
    scoreBox.style.borderRadius = "20px";
    scoreBox.style.fontSize = "1.5rem";
    scoreBox.style.fontWeight = "bold";
    scoreBox.style.color = "#333";
    scoreBox.style.zIndex = "10000";
    document.body.appendChild(scoreBox);
  }
  scoreBox.textContent = `النقاط: ${score}`;
}

// ✅ عند السحب الصحيح
export function onCorrectDrop() {
  score++;
  playSound("success");
  triggerConfetti();
  updateScoreDisplay();
  checkStageCompletion();
}

// ✅ عند السحب الخطأ
export function onWrongDrop() {
  playSound("error");
}

// ✅ confetti 🎉
function triggerConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// ✅ التحقق من انتهاء المرحلة
function checkStageCompletion() {
  const lettersInStage = stages[currentStage];
  if (score >= (currentStage + 1) * lettersInStage.length) {
    // نهاية المرحلة الحالية
    playSound("complete");
    triggerConfetti();
    showStageComplete();
  }
}

// ✅ نافذة إكمال المرحلة
function showStageComplete() {
  const overlay = document.createElement("div");
  overlay.id = "stageComplete";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.6)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.flexDirection = "column";
  overlay.style.zIndex = "9999";
  overlay.style.color = "white";
  overlay.style.fontSize = "2rem";

  overlay.innerHTML = `
    <p>🎉 أحسنت! أكملت المرحلة ${currentStage + 1}</p>
    <button id="nextStageBtn">▶️ المرحلة التالية</button>
  `;

  document.body.appendChild(overlay);

  document.getElementById("nextStageBtn")?.addEventListener("click", () => {
    nextStage();
  });
}

// ✅ الانتقال للمرحلة التالية
function nextStage() {
  currentStage++;
  document.getElementById("stageComplete")?.remove();

  if (currentStage < stages.length) {
    console.log(`انتقلت إلى المرحلة ${currentStage + 1}`);
    loadStage(currentStage);
  } else {
    // كل المراحل انتهت 🎓
    finalCompletion();
  }
}

// ✅ تحميل حروف المرحلة
function loadStage(stageIndex: number) {
  const stageLetters = stages[stageIndex];
  console.log("تحميل الحروف:", stageLetters);

  // هنا تستبدل عناصر الـ DOM في اللعبة بالحروف الجديدة
  // TODO: ربطها مع dragDrop.ts
}

// ✅ عند إنهاء جميع المراحل
function finalCompletion() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.8)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.flexDirection = "column";
  overlay.style.zIndex = "9999";
  overlay.style.color = "white";
  overlay.style.fontSize = "2rem";

  overlay.innerHTML = `
    <p>🏆 مبروك! أكملت كل الحروف 👏</p>
  `;

  document.body.appendChild(overlay);
}
