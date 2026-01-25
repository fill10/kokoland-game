// src/components/Flashcards.tsx
import React, { useState } from "react";

const Flashcards = () => {
  // مثال مبدئي: بطاقة واحدة فقط
  const [flipped, setFlipped] = useState(false);

  const cards = [
    { front: "أ", back: "🍎 تفاحة" },
    { front: "ب", back: "🐪 بعير" },
    { front: "ت", back: "🐊 تمساح" },
  ];

  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
      <h1 className="text-2xl font-bold mb-6">🎴 البطاقات التعليمية</h1>

      {/* البطاقة */}
      <div
        className={`w-64 h-40 flex items-center justify-center text-4xl font-bold rounded-xl shadow-lg cursor-pointer bg-white transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setFlipped(!flipped)}
      >
        {!flipped ? cards[index].front : cards[index].back}
      </div>

      {/* أزرار التحكم */}
      <div className="flex gap-4 mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          onClick={() => {
            setIndex((index - 1 + cards.length) % cards.length);
            setFlipped(false);
          }}
        >
          ⬅️ السابق
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          onClick={() => {
            setIndex((index + 1) % cards.length);
            setFlipped(false);
          }}
        >
          التالي ➡️
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
