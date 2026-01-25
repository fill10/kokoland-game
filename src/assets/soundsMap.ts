// src/assets/soundsMap.ts
// مزيج بين أصوات الحروف وأصوات التفاعل العامة

const soundsMap: { [key: string]: string } = {
  // ✅ أصوات الحروف
  "أ": "/sounds/letters/a.mp3",
  "ب": "/sounds/letters/b.mp3",
  "ت": "/sounds/letters/t.mp3",
  "ث": "/sounds/letters/th.mp3",
  "ج": "/sounds/letters/ga.mp3",
  "ح": "/sounds/letters/h.mp3",
  "خ": "/sounds/letters/ka.mp3",
  "د": "/sounds/letters/d.mp3",
  "ذ": "/sounds/letters/tha.mp3",
  "ر": "/sounds/letters/ra.mp3",
  "ز": "/sounds/letters/za.mp3",
  "س": "/sounds/letters/saa.mp3",
  "ش": "/sounds/letters/sha.mp3",
  "ص": "/sounds/letters/sa.mp3",
  "ض": "/sounds/letters/da.mp3",
  "ط": "/sounds/letters/taa.mp3",
  "ظ": "/sounds/letters/ta2.mp3",
  "ع": "/sounds/letters/aa.mp3",
  "غ": "/sounds/letters/kha.mp3",
  "ف": "/sounds/letters/fa.mp3",
  "ق": "/sounds/letters/gaa.mp3",
  "ك": "/sounds/letters/kaa.mp3",
  "ل": "/sounds/letters/la.mp3",
  "م": "/sounds/letters/ma.mp3",
  "ن": "/sounds/letters/na.mp3",
  "هـ": "/sounds/letters/haa.mp3",
  "و": "/sounds/letters/wa.mp3",
  "ي": "/sounds/letters/ya.mp3",

  // 🎵 أصوات عامة
  success: "/sounds/success.mp3",
  error: "/sounds/error.mp3",
  complete: "/sounds/complete.mp3",
};

export default soundsMap;
