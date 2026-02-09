import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

// استيراد البيانات
import { letters } from "../assets/letters";
// تأكدي أن هذا الملف موجود، وإذا لم يكن موجوداً احذفي السطر التالي
import { playLetterSound } from "../assets/letterSounds"; 

// تعريف مسارات الأصوات من المجلد العام مباشرة
const successSound = "/sounds/success.mp3";
const errorSound = "/sounds/error.mp3";

export default function LetterSortingGame() {
  const [currentIndex, setCurrentIndex] = useState(0); // الحرف الحالي
  const [options, setOptions] = useState<any[]>([]); // الخيارات الثلاثة
  const [isCompleted, setIsCompleted] = useState(false); // هل انتهت اللعبة؟
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState<number | null>(null); // لعمل اهتزاز عند الخطأ

  const currentLetter = letters[currentIndex];

  // دالة تشغيل الأصوات
  const playAudio = (path: string) => {
    const audio = new Audio(path);
    audio.play().catch((e) => console.log("Audio error:", e));
  };

  // دالة لخلط الخيارات (تجهيز السؤال)
  useEffect(() => {
    if (!currentLetter) return;

    // 1. نأخذ الحرف الصحيح
    let choices = [currentLetter];

    // 2. نختار حرفين عشوائيين مختلفين عن الحرف الصحيح
    while (choices.length < 3) {
      const random = letters[Math.floor(Math.random() * letters.length)];
      if (!choices.find((c) => c.id === random.id)) {
        choices.push(random);
      }
    }

    // 3. نخلط أماكنهم عشوائياً
    choices = choices.sort(() => Math.random() - 0.5);
    setOptions(choices);

    // تشغيل صوت الحرف عند بداية السؤال (اختياري)
    // playLetterSound(currentLetter.id); 

  }, [currentIndex]);

  // دالة عند الضغط على خيار
  const handleOptionClick = (selectedLetter: any) => {
    if (selectedLetter.id === currentLetter.id) {
      // ✅ إجابة صحيحة
      playAudio(successSound);
      playLetterSound(selectedLetter.id); // نطق اسم الحرف

      if (currentIndex + 1 === letters.length) {
        // انتهت اللعبة
        setIsCompleted(true);
        setShowConfetti(true);
      } else {
        // الانتقال للحرف التالي بعد ثانية قصيرة
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 1000);
      }
    } else {
      // ❌ إجابة خاطئة
      playAudio(errorSound);
      setShake(selectedLetter.id); // تفعيل الاهتزاز
      setTimeout(() => setShake(null), 500); // إيقاف الاهتزاز
    }
  };

  // واجهة "النهاية" (الشهادة)
  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
        <Confetti />
        <h1 className="text-4xl font-bold text-green-600 mb-4 animate-bounce">
          🎉 أحسنت يا بطل! 🎉
        </h1>
        <p className="text-xl mb-6">لقد تعلمت جميع الحروف بنجاح!</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-8 py-3 rounded-full text-xl shadow-lg hover:bg-blue-600 transition"
        >
          🔄 العب مرة أخرى
        </button>
      </div>
    );
  }

  // واجهة "اللعب"
  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      {/* شريط التقدم */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex) / letters.length) * 100}%` }}
        ></div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        أين حرف <span className="text-blue-600">({currentLetter.name})</span> ؟
      </h2>

      {/* شبكة الخيارات */}
      <div className="grid grid-cols-3 gap-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative p-4 bg-white rounded-2xl shadow-xl border-4 border-transparent
              hover:scale-105 transition-transform duration-200
              ${shake === option.id ? "animate-shake border-red-400" : ""}
            `}
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-full h-32 object-contain mx-auto"
            />
          </button>
        ))}
      </div>

      {/* تعليمات مساعدة */}
      <p className="mt-8 text-gray-500 text-sm">
        اضغط على الصورة التي تطابق الحرف المطلوب
      </p>
    </div>
  );
}
