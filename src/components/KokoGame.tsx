import React, { useState } from "react";

interface LetterItem {
  letter: string;
  word: string;
  image: string;
  sound: string;
}

const letters: LetterItem[] = [
  { letter: "أ", word: "أسد", image: "/assets/images/lion.png", sound: "/assets/sounds/alif.mp3" },
  { letter: "ب", word: "بطة", image: "/assets/images/duck.png", sound: "/assets/sounds/baa.mp3" },
  { letter: "ت", word: "تفاحة", image: "/assets/images/apple.png", sound: "/assets/sounds/taa.mp3" },
  { letter: "ج", word: "جمل", image: "/assets/images/camel.png", sound: "/assets/sounds/jeem.mp3" },
  { letter: "خ", word: "خروف", image: "/assets/images/sheep.png", sound: "/assets/sounds/khaa.mp3" },
  { letter: "د", word: "دجاجة", image: "/assets/images/chicken.png", sound: "/assets/sounds/dal.mp3" },
  { letter: "ذ", word: "ذرة", image: "/assets/images/corn.png", sound: "/assets/sounds/thaal.mp3" },
  // 🔔 أضف بقية الحروف بنفس الأسلوب
];

function KokoGame() {
  const [message, setMessage] = useState<string>("");

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play();
  };

  return (
    <div className="p-6 font-arabic text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">🦜 كوكو يتعلّم الحروف</h1>
      <p className="mb-6 text-lg text-gray-700">اضغط على الحرف لتسمع نطقه 🎶</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {letters.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4"
            onClick={() => {
              playSound(item.sound);
              setMessage(`📢 ${item.letter} مثل ${item.word}`);
            }}
          >
            <p className="text-4xl font-bold text-purple-600">{item.letter}</p>
            <img
              src={item.image}
              alt={item.word}
              className="w-24 h-24 object-contain mx-auto my-2"
            />
            <p className="text-lg font-bold text-gray-700">{item.word}</p>
          </div>
        ))}
      </div>

      {message && (
        <div className="mt-6 p-4 bg-yellow-100 rounded-xl shadow">
          <p className="text-lg font-bold">{message}</p>
        </div>
      )}
    </div>
  );
}

export default KokoGame;
