import React from 'react';
import { BookOpen, Palette, Layers, Shapes, Star, Heart, Sparkles, Award } from 'lucide-react';

interface HomePageProps {
  onKokoClick: () => void;
  onSaraClick: () => void;
  onAhmedClick: () => void;
  onGeometryClick: () => void;
  onCertificateClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  onKokoClick, 
  onSaraClick, 
  onAhmedClick, 
  onGeometryClick,
  onCertificateClick 
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 animate-bounce delay-0">
        <Star className="w-8 h-8 text-yellow-400 fill-current" />
      </div>
      <div className="absolute top-20 right-16 animate-bounce delay-150">
        <Heart className="w-6 h-6 text-pink-400 fill-current" />
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce delay-300">
        <Sparkles className="w-7 h-7 text-purple-400 fill-current" />
      </div>
      <div className="absolute bottom-32 right-12 animate-bounce delay-75">
        <Star className="w-5 h-5 text-blue-400 fill-current" />
      </div>

      {/* Main Title */}
      <div className="text-center mb-12 animate-pulse">
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 mb-4 font-arabic">
          KokoLand
        </h1>
        <h2 className="text-3xl md:text-4xl text-purple-700 font-semibold font-arabic">
          عالم كوكو
        </h2>
        <p className="text-lg text-gray-600 mt-4 font-arabic">
          🌟 عالم مليء بالمرح والتعلم! 🌟
        </p>
      </div>

      {/* Game Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full mb-8">
        {/* Koko Learning Button */}
        <button
          onClick={onKokoClick}
          className="group bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-arabic">كوكو يتعلّم</h3>
            <p className="text-blue-100 text-center font-arabic text-sm">
              🎓 تعلم الحروف والأرقام
            </p>
          </div>
        </button>

        {/* Ahmed Puzzle Button */}
        <button
          onClick={onAhmedClick}
          className="group bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
              <Layers className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-arabic">أحمد يلعب</h3>
            <p className="text-green-100 text-center font-arabic text-sm">
              🧩 ألعاب البازل الممتعة
            </p>
          </div>
        </button>

        {/* Sara Coloring Button */}
        <button
          onClick={onSaraClick}
          className="group bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
              <Palette className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-arabic">سارة تُلوّن</h3>
            <p className="text-pink-100 text-center font-arabic text-sm">
              🎨 صفحات التلوين الجميلة
            </p>
          </div>
        </button>

        {/* Geometry Shapes Button */}
        <button
          onClick={onGeometryClick}
          className="group bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
              <Shapes className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-arabic">هندسة الأشكال</h3>
            <p className="text-purple-100 text-center font-arabic text-sm">
              📐 تعلم الأشكال الهندسية
            </p>
          </div>
        </button>
      </div>

      {/* Certificate Button */}
      <button
        onClick={onCertificateClick}
        className="group bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-4 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-8"
      >
        <div className="flex items-center space-x-3">
          <Award className="w-8 h-8 text-white" />
          <span className="text-xl font-bold font-arabic">احصل على شهادة تقدير! 🏆</span>
        </div>
      </button>

      {/* Footer */}
      <div className="text-center">
        <p className="text-gray-500 font-arabic">
          ✨ مصمم خصيصاً للأطفال الصغار ✨
        </p>
      </div>
    </div>
  );
};

export default HomePage;