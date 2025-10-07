import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const LetterSortingGame = () => {
  const totalLevels = 5; // ✅ غيّر العدد حسب عدد المراحل الفعلي
  const [level, setLevel] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // 🎵 صوت التهنئة
  const playSuccessSound = () => {
    const audio = new Audio("/assets/success.mp3"); // ضع ملف الصوت داخل مجلد assets
    audio.play();
  };

  // 🟢 استدعاء عند إكمال كل المستويات
  useEffect(() => {
    if (level > totalLevels) {
      setCompleted(true);
      setShowConfetti(true);
      playSuccessSound();

      // confetti يختفي بعد 6 ثوانٍ
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [level]);

  // 🟡 التقدم بالنسبة المئوية
  const progress = Math.min((level / totalLevels) * 100, 100);

  return (
    <div className="p-6 text-center">
      {showConfetti && <Confetti />}

      <h1 className="text-2xl font-bold mb-4">🎯 لعبة كوكو وأصدقاء الحروف</h1>

      {/* ✅ شريط التقدم */}
      <div className="w-full bg-gray-200 rounded-full h-6 mb-6 shadow-inner">
        <div
          className="bg-green-500 h-6 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* 🟠 محتوى المرحلة */}
      {!completed ? (
        <div>
          <p className="text-lg mb-4">📚 المرحلة {level} من {totalLevels}</p>
          <button
            onClick={() => setLevel(level + 1)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            ✅ إكمال المرحلة
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            🎉 أحسنت! لقد أنجزت كل المراحل!
          </h2>

          {/* 🏅 زر طباعة الشهادة */}
          <button
            onClick={() => {
              const name = prompt("✍️ اكتب اسمك ليظهر في الشهادة:");
              if (name) {
                const printWindow = window.open("", "_blank");
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>شهادة إنجاز</title>
                      <style>
                        body { text-align: center; font-family: 'Amiri', serif; padding: 50px; }
                        .certificate {
                          border: 10px solid gold;
                          padding: 40px;
                          border-radius: 20px;
                          background: #fff8e1;
                          box-shadow: 0 0 20px rgba(0,0,0,0.2);
                        }
                        h1 { font-size: 36px; color: #4a148c; }
                        h2 { font-size: 28px; margin: 20px 0; color: #2e7d32; }
                        p { font-size: 20px; }
                      </style>
                    </head>
                    <body>
                      <div class="certificate">
                        <h1>🏅 شهادة إنجاز</h1>
                        <h2>تهانينا ${name}!</h2>
                        <p>لقد أكملت لعبة <b>كوكو وأصدقاء الحروف</b> بنجاح 🎉</p>
                        <p>تاريخ الإنجاز: ${new Date().toLocaleDateString("ar-EG")}</p>
                      </div>
                      <script>window.print();</script>
                    </body>
                  </html>
                `);
                printWindow.document.close();
              }
            }}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition animate-bounce"
          >
            🏅 طباعة الشهادة
          </button>
        </div>
      )}
    </div>
  );
};

export default LetterSortingGame;
