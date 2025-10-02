import letterSounds from "./assets/letterSounds";
import generalSounds from "./assets/generalSounds";

let score = 0;
let currentStage = 1;
const lettersPerStage = 5; // كل مرحلة فيها 5 حروف مثلاً

// ✅ تشغيل الأصوات العامة
function playSound(type: "success" | "error" | "complete") {
  const audio = new Audio(generalSounds[type]);
  audio.play();
}

// ✅ عند السحب الصحيح
export function onCorrectDrop() {
  score++;
  playSound("success");
  checkStageCompletion();
}

// ✅ عند السحب الخطأ
export function onWrongDrop() {
  playSound("error");
}

// ✅ التحقق من انتهاء المرحلة
function checkStageCompletion() {
  if (score % lettersPerStage === 0) {
    // نهاية المرحلة الحالية
    playSound("complete");
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
    <p>أحسنت 👏 لقد أكملت المرحلة ${currentStage}!</p>
    <button id="nextStageBtn">المرحلة التالية ▶️</button>
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

  // إعادة ترتيب الحروف الجديدة هنا
  console.log(`انتقلت إلى المرحلة ${currentStage}`);
}
