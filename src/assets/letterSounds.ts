// src/assets/letterSounds.ts
// كائن يربط كل حرف بصوت النطق الخاص به (mp3)
// كل ملف صوتي موجود داخل: src/assets/sounds/letters/

const letterSounds: { [key: string]: string } = {
  "أ": new URL("./sounds/letters/alif.mp3", import.meta.url).href,
  "ب": new URL("./sounds/letters/baa.mp3", import.meta.url).href,
  "ت": new URL("./sounds/letters/taa.mp3", import.meta.url).href,
  "ث": new URL("./sounds/letters/thaa.mp3", import.meta.url).href,
  "ج": new URL("./sounds/letters/jim.mp3", import.meta.url).href,
  "ح": new URL("./sounds/letters/haa.mp3", import.meta.url).href,
  "خ": new URL("./sounds/letters/khaa.mp3", import.meta.url).href,
  "د": new URL("./sounds/letters/daal.mp3", import.meta.url).href,
  "ذ": new URL("./sounds/letters/dhaal.mp3", import.meta.url).href,
  "ر": new URL("./sounds/letters/raa.mp3", import.meta.url).href,
  "ز": new URL("./sounds/letters/zaa.mp3", import.meta.url).href,
  "س": new URL("./sounds/letters/seen.mp3", import.meta.url).href,
  "ش": new URL("./sounds/letters/sheen.mp3", import.meta.url).href,
  "ص": new URL("./sounds/letters/saad.mp3", import.meta.url).href,
  "ض": new URL("./sounds/letters/ddaad.mp3", import.meta.url).href,
  "ط": new URL("./sounds/letters/taa2.mp3", import.meta.url).href,
  "ظ": new URL("./sounds/letters/zaad.mp3", import.meta.url).href,
  "ع": new URL("./sounds/letters/ain.mp3", import.meta.url).href,
  "غ": new URL("./sounds/letters/ghain.mp3", import.meta.url).href,
  "ف": new URL("./sounds/letters/fa.mp3", import.meta.url).href,
  "ق": new URL("./sounds/letters/qaf.mp3", import.meta.url).href,
  "ك": new URL("./sounds/letters/kaf.mp3", import.meta.url).href,
  "ل": new URL("./sounds/letters/laam.mp3", import.meta.url).href,
  "م": new URL("./sounds/letters/meem.mp3", import.meta.url).href,
  "ن": new URL("./sounds/letters/noon.mp3", import.meta.url).href,
  "هـ": new URL("./sounds/letters/haa2.mp3", import.meta.url).href,
  "و": new URL("./sounds/letters/waw.mp3", import.meta.url).href,
  "ي": new URL("./sounds/letters/yaa.mp3", import.meta.url).href,
};

export default letterSounds;
