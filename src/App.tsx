import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import KokoGame from "./components/KokoGame";
import AhmedPuzzle from "./components/AhmedPuzzle";
import SaraColoring from "./components/SaraColoring";
import LetterSortingGame from "./components/LetterSortingGame";
import CertificateGenerator from "./components/CertificateGenerator";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showCertificate, setShowCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // 🔹 تشغيل الصوت والتأثير عند فتح الشهادة
  useEffect(() => {
    if (showCertificate) {
      // 🎵 تشغيل صوت التشجيع
      const audio = new Audio("/sounds/success.mp3");
      audio.play();

      // ✨ تشغيل تأثير النجوم/الشرائط لثوانٍ
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showCertificate]);

  const renderSection = () => {
    switch (activeSection) {
      case "koko":
        return <KokoGame />;
      case "puzzle":
        return <AhmedPuzzle />;
      case "coloring":
        return <SaraColoring />;
      case "letters":
        return <LetterSortingGame />;
      default:
        return <HomePage onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100">
      {/* 🔹 شريط علوي */}
      <header className="flex justify-between items-center bg-white shadow p-3">
        <h1 className="text-lg font-bold text-pink-600">🎉 كوكو وأصدقاء الحروف</h1>
        <div className="space-x-2">
          <button
            onClick={() => setShowCertificate(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            🏆 شهادتي
          </button>
          <button
            onClick={() => setActiveSection("home")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            ⬅️ الرئيسية
          </button>
        </div>
      </header>

      {/* 🔹 القسم الحالي */}
      <main className="p-4">{renderSection()}</main>

      {/* 🔹 نافذة الشهادة */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg">
            <CertificateGenerator />
            <div className="text-center mt-4">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ✖️ إغلاق
              </button>
            </div>
          </div>

          {/* ✨ تأثير بصري (نجوم/شرائط) */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${1 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
