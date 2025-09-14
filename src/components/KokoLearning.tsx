import React, { useState } from "react";

// أصوات الحروف (تأكد من وجود الملفات في src/assets/sounds/)
const letters = [
  { letter: "أ", sound: "/assets/sounds/alif.mp3" },
  { letter: "ب", sound: "/assets/sounds/ba.mp3" },
  { letter: "ت", sound: "/assets/sounds/ta.mp3" },
  { letter: "ث", sound: "/assets/sounds/tha.mp3" },
  { letter: "ج", sound: "/assets/sounds/jeem.mp3" },
  // 🔔 أكمل بقية الحروف بنفس الطريقة حتى (ي)
];

function KokoLearning() {
  const [sorted, setSorted] = useState<string[]>([]);
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // تشغيل صوت الحرف
  const playSound = (soundPath: string, letter: string) => {
    const audio = new Audio(soundPath);
    audio.play();
    setCurrentLetter(letter);
  };

  // ترتيب الحروف الصحيح
  const handleSort = (letter: string) => {
    const nextIndex = sorted.length;
    if (letters[nextIndex].letter === letter) {
      // ✅ الحرف صحيح
      setSorted([...sorted, letter]);
      setErrorMsg(null);
    } else {
      // ❌ الحرف ليس في الترتيب
      setErrorMsg("✋ ليس هذا الحرف الآن");
      setTimeout(() => setErrorMsg(null), 1500);
    }
  };

  // إعادة المحاولة
  const resetGame = () => {
    setSorted([]);
    setErrorMsg(null);
    setCurrentLetter(null);
  };

  return (
    <div className="p-6 font-arabic text-center">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        🐦 كوكو يتعلّم الحروف
      </h1>

      {/* الحروف */}
      <div className="grid grid-cols-6 gap-4 justify-center mb-8">
        {letters.map((item) => (
          <button
            key={item.letter}
            onClick={() => {
              playSound(item.sound, item.letter);
              handleSort(item.letter);
            }}
            className={`p-4 rounded-2xl shadow-lg text-2xl font-bold transition-all 
            ${
              currentLetter === item.letter
                ? "bg-yellow-300 scale-110"
                : "bg-white hover:bg-pink-100"
            }
          `}
          >
            {item.letter}
          </button>
        ))}
      </div>

      {/* الترتيب */}
      <h2 className="text-xl font-semibold text-blue-600 mb-3">
        ✏️ رتب الحروف
      </h2>
      <div className="flex flex-wrap gap-3 justify-center bg-white/60 p-4 rounded-2xl shadow">
        {sorted.map((letter, i) => (
          <span
            key={i}
            className="bg-green-200 text-green-800 px-4 py-2 rounded-xl text-xl shadow"
          >
            {letter}
          </span>
        ))}
      </div>

      {/* رسالة خطأ */}
      {errorMsg && (
        <p className="text-red-500 mt-3 font-bold animate-pulse">{errorMsg}</p>
      )}

      {/* زر إعادة المحاولة عند الانتهاء */}
      {sorted.length === letters.length && (
        <div className="mt-6">
          <p className="text-lg text-green-700 mb-2 font-bold">
            🎉 أحسنت! رتبت جميع الحروف
          </p>
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white px-6 py-2 rounded-2xl shadow hover:bg-blue-600"
          >
            🔄 إعادة المحاولة
          </button>
        </div>
      )}
    </div>
  );
}

export default KokoLearning;
