import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// استدعاء المكونات
import LetterSortingGame from "./components/LetterSortingGame";
import Flashcards from "./components/Flashcards";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          🌟 KokoLand Game | كوكو وأصدقاء الحروف
        </h1>

        {/* ✅ أزرار التنقل */}
        <nav className="flex justify-center gap-4 mb-6">
          <Link
            to="/letters"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            🎯 لعبة الحروف
          </Link>

          <Link
            to="/flashcards"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
          >
            🎴 البطاقات التعليمية
          </Link>
        </nav>

        {/* ✅ عرض الصفحات */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <Routes>
            <Route path="/letters" element={<LetterSortingGame />} />
            <Route path="/flashcards" element={<Flashcards />} />
            {/* صفحة البداية الافتراضية */}
            <Route
              path="/"
              element={
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4">
                    👋 أهلاً بك في <b>كوكو لاند</b>!
                  </p>
                  <p className="text-gray-600">
                    اختر لعبة من القائمة أعلاه لتبدأ المرح 🎉
                  </p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
