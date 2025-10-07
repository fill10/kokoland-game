import { useEffect, useState } from "react";
import { loadStage } from "../gameLogic";

export default function LetterSortingGame() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // ✅ تحميل المرحلة الحالية عند التغيير
    loadStage(stage);
  }, [stage]);

  const handleNextStage = () => {
    setStage((prev) => prev + 1);
  };

  const handlePreviousStage = () => {
    setStage((prev) => (prev > 0 ? prev - 1 : 0)); // ما ينزل أقل من 0
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">🅰️ لعبة الحروف</h2>

      {/* منطقة الحروف (المربعات الشفافة المرتبة أبجديًا) */}
      <div
        id="gameBoard"
        className="board grid grid-cols-5 gap-2 mb-6 justify-center"
      ></div>

      {/* منطقة العناصر القابلة للسحب */}
      <div
        id="draggables"
        className="draggables flex flex-wrap gap-3 justify-center mb-6"
      ></div>

      {/* أزرار التنقل بين المراحل */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePreviousStage}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          ⏮️ Previous Stage
        </button>
        <button
          onClick={handleNextStage}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          ⏭️ Next Stage
        </button>
      </div>
    </div>
  );
}
