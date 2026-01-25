// src/assets/letters.ts
// كائن يحتوي على روابط صور كل الحروف العربية (PNG)
// يتم تحويل المسار إلى رابط صالح عبر import.meta.url

const letters: { [key: string]: string } = {
  "أ": new URL("./letters/أ-Alif.png", import.meta.url).href,
  "ب": new URL("./letters/ب-Ba.png", import.meta.url).href,
  "ت": new URL("./letters/ت-Taa.png", import.meta.url).href,
  "ث": new URL("./letters/ث-Thaa.png", import.meta.url).href,
  "ج": new URL("./letters/ج-Jim.png", import.meta.url).href,
  "ح": new URL("./letters/ح-Haa.png", import.meta.url).href,
  "خ": new URL("./letters/خ-Khaa.png", import.meta.url).href,
  "د": new URL("./letters/د-Daal.png", import.meta.url).href,
  "ذ": new URL("./letters/ذ-Dhaal.png", import.meta.url).href,
  "ر": new URL("./letters/ر-Raa.png", import.meta.url).href,
  "ز": new URL("./letters/ز-Zaa.png", import.meta.url).href,
  "س": new URL("./letters/س-Seen.png", import.meta.url).href,
  "ش": new URL("./letters/ش-Sheen.png", import.meta.url).href,
  "ص": new URL("./letters/ص-Saad.png", import.meta.url).href,
  "ض": new URL("./letters/ض-Ddaad.png", import.meta.url).href,
  "ط": new URL("./letters/ط-Taaa.png", import.meta.url).href,
  "ظ": new URL("./letters/ظ-Zaad.png", import.meta.url).href,
  "ع": new URL("./letters/ع-Ain.png", import.meta.url).href,
  "غ": new URL("./letters/غ-Ghain.png", import.meta.url).href,
  "ف": new URL("./letters/ف-Fa.png", import.meta.url).href,
  "ق": new URL("./letters/ق-Qaf.png", import.meta.url).href,
  "ك": new URL("./letters/ك-Kaf.png", import.meta.url).href,
  "ل": new URL("./letters/ل-Laam.png", import.meta.url).href,
  "م": new URL("./letters/م-Meem.png", import.meta.url).href,
  "ن": new URL("./letters/ن-Noon.png", import.meta.url).href,
  "هـ": new URL("./letters/هـ-Haaa.png", import.meta.url).href,
  "و": new URL("./letters/و-Waw.png", import.meta.url).href,
  "ي": new URL("./letters/ي-Ya.png", import.meta.url).href,
};

export default letters;
