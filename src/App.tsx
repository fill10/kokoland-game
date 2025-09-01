import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Palette, Layers, Shapes, Share2, X } from 'lucide-react';
import HomePage from './components/HomePage';
import KokoLearning from './components/KokoLearning';
import SaraColoring from './components/SaraColoring';
import AhmedPuzzle from './components/AhmedPuzzle';
import ShapesGame from './components/ShapesGame';
import GeometryShapes from './components/GeometryShapes';
import CertificateGenerator from './components/CertificateGenerator';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'koko' | 'sara' | 'ahmed' | 'geometry' | 'certificate'>('home');
  const [showShareModal, setShowShareModal] = useState(false);

  const goToHome = () => setCurrentView('home');
  const goToKoko = () => setCurrentView('koko');
  const goToSara = () => setCurrentView('sara');
  const goToAhmed = () => setCurrentView('ahmed');
  const goToGeometry = () => setCurrentView('geometry');
  const goToCertificate = () => setCurrentView('certificate');

  const shareGame = () => {
    if (navigator.share) {
      navigator.share({
        title: 'KokoLand - عالم كوكو',
        text: 'لعبة تعليمية رائعة للأطفال!',
        url: window.location.href,
      });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareModal(false);
    alert('تم نسخ الرابط!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-yellow-100">
      {/* Header Controls */}
      {currentView !== 'home' && (
        <div className="fixed top-4 left-4 right-4 z-50 flex justify-between">
          <button
            onClick={goToHome}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6 text-purple-600" />
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={shareGame}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Share2 className="w-6 h-6 text-green-600" />
            </button>
            
            <button
              onClick={goToCertificate}
              className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 font-arabic text-sm font-bold text-yellow-600"
            >
              🏆 شهادة
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentView === 'home' && (
        <HomePage 
          onKokoClick={goToKoko} 
          onSaraClick={goToSara} 
          onAhmedClick={goToAhmed}
          onGeometryClick={goToGeometry}
          onCertificateClick={goToCertificate}
        />
      )}
      {currentView === 'koko' && <KokoLearning />}
      {currentView === 'sara' && <SaraColoring />}
      {currentView === 'ahmed' && <AhmedPuzzle />}
      {currentView === 'geometry' && <GeometryShapes />}
      {currentView === 'certificate' && <CertificateGenerator />}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-600 font-arabic">مشاركة اللعبة</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4 font-arabic">شارك هذه اللعبة الرائعة مع الأصدقاء!</p>
            
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl transition-all duration-300 font-arabic"
              >
                نسخ الرابط
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
