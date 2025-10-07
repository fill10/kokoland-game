import { useState } from "react";

const flashcards = [
  {
    letter: "أ",
    word: "أسد",
    image: "/assets/images/lion.png",
    sound: "/sounds/alif.mp3",
    video: "https://youtube.com/shorts/XXXX" // ضع رابط فيديو حرف أ
  },
  {
    letter: "ب",
    word: "بطة",
    image: "/assets/images/duck.png",
    sound: "/sounds/baa.mp3",
    video: "https://youtube.com/shorts/YYYY"
  }
  // 🔔 أضف بقية الحروف هنا
];

export default function Flashcards() {
  const [index, setIndex] = useState(0);
  const card = flashcards[index];

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">🎴 البطاقات التعليمية</h2>

      {/* بطاقة */}
      <div className="w-64 h-80 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center mx-auto mb-6 p-4">
        <div className="text-6xl font-bold mb-4">{card.letter}</div>
        <img src={card.image} alt={card.word} className="w-24 h-24 mb-4" />
        <div className="text-lg">{card.word}</div>
      </div>

      {/* أزرار التحكم */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => new Audio(card.sound).play()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          🔊 استمع
        </button>
        <a
          href={card.video}
          target="_blank"
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          🎥 شاهد الفيديو
        </a>
      </div>

      {/* تنقل بين البطاقات */}
      <div className="flex gap-4 justify-center mt-6">
        <button
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
        >
          ⏮️ السابق
        </button>
        <button
          disabled={index === flashcards.length - 1}
          onClick={() => setIndex(index + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
        >
          ⏭️ التالي
        </button>
      </div>
    </div>
  );
}
