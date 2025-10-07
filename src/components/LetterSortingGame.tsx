import { useEffect, useState } from "react";
import { loadStage } from "../gameLogic";
import confetti from "canvas-confetti";

export default function LetterSortingGame() {
  const totalStages = 5; // 🟢 عدل الرقم حسب عدد المراحل عندك
  const [stage, setStage] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (stage < totalStages) {
      loadStage(stage);

      // 🎵 تشغيل صوت انتقال
      const audio = new Audio("/sounds/next.mp3");
      audio.play();
    }

    // 🎉 عند آخر مرحلة: عرض تهنئة
    if (stage === totalStages) {
      setCompleted(true);
      const success = new Audio("/sounds/success.mp3");
      success.play();

      // تأثير Confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [stage]);

  const handleNextStage = () => {
    if (stage < totalStages) {
      setStage((prev) => prev + 1);
    }
  };

  const handlePreviousStage = () => {
    setStage((prev) => (prev > 0 ? prev - 1 : 0));
    setCompleted(false);
  };

  const handleResetStage = () => {
    loadStage(stage);
    const resetSound = new Audio("/sounds/reset.mp3");
    resetSound.play();
  };

  // 🔹 حساب التقدم بالنسبة المئوية
  const progressPercent = Math.min((stage / totalStages) * 100, 100);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">🅰️ لعبة الحروف</h2>

      {/* المرحلة الحالية */}
      {!completed ? (
        <div className="mb-4">
          <span className="px-4 py-2 bg-yellow-300 rounded-full text-lg font-semibold shadow animate-pulse">
            📖 المرحلة: {stage + 1} / {totalStages}
          </span>
        </div>
      ) : (
        <div className="mb-6 text-2xl font-bold text-green-600 animate-bounce">
          🎉 أحسنت! أنهيت كل المراحل!
        </div>
      )}

      {/* شريط التقدم */}
      <div className="w-full max-w-lg mx-auto bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <div
          className="bg-green-500 h-4 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* منطقة الحروف */}
      {!completed && (
        <>
          <div
            id="gameBoard"
            className="board grid grid-cols-5 gap-2 mb-6 justify-center"
          ></div>

          {/* منطقة العناصر القابلة للسحب */}
          <div
            id="draggables"
            className="draggables flex flex-wrap gap-3 justify-center mb-6"
          ></div>
        </>
      )}

      {/* أزرار التحكم */}
      <div className="flex justify-center gap-4 flex-wrap">
        {stage > 0 && !completed && (
          <button
            onClick={handlePreviousStage}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            ⏮️ Previous Stage
          </button>
        )}
        {!completed && (
          <>
            <button
              onClick={handleResetStage}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
            >
              🔄 Reset Stage
            </button>
            <button
              onClick={handleNextStage}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              ⏭️ Next Stage
            </button>
          </>
        )}
      </div>
    </div>
  );
}
