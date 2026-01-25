// src/assets/letterSounds.ts
// ربط الحروف العربية بملفات الصوت الموجودة داخل src/assets/sounds/letters/

const letterSounds: { [key: string]: string } = {
  "أ": new URL("./sounds/letters/a.mp3", import.meta.url).href,
  "ب": new URL("./sounds/letters/b.mp3", import.meta.url).href,
  "ت": new URL("./sounds/letters/t.mp3", import.meta.url).href,
  "ث": new URL("./sounds/letters/th.mp3", import.meta.url).href,
  "ج": new URL("./sounds/letters/ga.mp3", import.meta.url).href,
  "ح": new URL("./sounds/letters/h.mp3", import.meta.url).href,
  "خ": new URL("./sounds/letters/ka.mp3", import.meta.url).href,
  "د": new URL("./sounds/letters/d.mp3", import.meta.url).href,
  "ذ": new URL("./sounds/letters/tha.mp3", import.meta.url).href,
  "ر": new URL("./sounds/letters/ra.mp3", import.meta.url).href,
  "ز": new URL("./sounds/letters/za.mp3", import.meta.url).href,
  "س": new URL("./sounds/letters/saa.mp3", import.meta.url).href,
  "ش": new URL("./sounds/letters/sha.mp3", import.meta.url).href,
  "ص": new URL("./sounds/letters/sa.mp3", import.meta.url).href,
  "ض": new URL("./sounds/letters/da.mp3", import.meta.url).href,
  "ط": new URL("./sounds/letters/taa.mp3", import.meta.url).href,
  "ظ": new URL("./sounds/letters/ta2.mp3", import.meta.url).href,
  "ع": new URL("./sounds/letters/aa.mp3", import.meta.url).href,
  "غ": new URL("./sounds/letters/kha.mp3", import.meta.url).href,
  "ف": new URL("./sounds/letters/fa.mp3", import.meta.url).href,
  "ق": new URL("./sounds/letters/gaa.mp3", import.meta.url).href,
  "ك": new URL("./sounds/letters/kaa.mp3", import.meta.url).href,
  "ل": new URL("./sounds/letters/la.mp3", import.meta.url).href,
  "م": new URL("./sounds/letters/ma.mp3", import.meta.url).href,
  "ن": new URL("./sounds/letters/na.mp3", import.meta.url).href,
  "هـ": new URL("./sounds/letters/haa.mp3", import.meta.url).href,
  "و": new URL("./sounds/letters/wa.mp3", import.meta.url).href,
  "ي": new URL("./sounds/letters/ya.mp3", import.meta.url).href,
};

export default letterSounds;
