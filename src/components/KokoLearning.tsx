import React, { useState } from 'react';
import { BookOpen, Volume2, CheckCircle, RefreshCw, Target, Play, Globe } from 'lucide-react';
import LetterSortingGame from './LetterSortingGame';

const arabicLetters = [
  'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
  'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
];
const englishLetters = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];

const arabicNumbers = ['١','٢','٣','٤','٥','٦','٧','٨','٩','١٠'];
const englishNumbers = ['1','2','3','4','5','6','7','8','9','10'];

// نطق الحروف بالعربية
const letterPronunciationAr: { [key: string]: string } = {
  'أ':'ألف','ب':'باء','ت':'تاء','ث':'ثاء','ج':'جيم','ح':'حاء',
  'خ':'خاء','د':'دال','ذ':'ذال','ر':'راء','ز':'زاي','س':'سين',
  'ش':'شين','ص':'صاد','ض':'ضاد','ط':'طاء','ظ':'ظاء','ع':'عين',
  'غ':'غين','ف':'فاء','ق':'قاف','ك':'كاف','ل':'لام','م':'ميم',
  'ن':'نون','هـ':'هاء','و':'واو','ي':'ياء'
};

// نطق الأرقام بالعربية
const numberPronunciationAr: { [key: string]: string } = {
  '١':'واحد','٢':'اثنان','٣':'ثلاثة','٤':'أربعة','٥':'خمسة',
  '٦':'ستة','٧':'سبعة','٨':'ثمانية','٩':'تسعة','١٠':'عشرة'
};

// نطق الحروف بالإنجليزية
const letterPronunciationEn: { [key: string]: string } = {
  'A':'A','B':'B','C':'C','D':'D','E':'E','F':'F','G':'G','H':'H',
  'I':'I','J':'J','K':'K','L':'L','M':'M','N':'N','O':'O','P':'P',
  'Q':'Q','R':'R','S':'S','T':'T','U':'U','V':'V','W':'W','X':'X',
  'Y':'Y','Z':'Z'
};

// نطق الأرقام بالإنجليزية
const numberPronunciationEn: { [key: string]: string } = {
  '1':'One','2':'Two','3':'Three','4':'Four','5':'Five',
  '6':'Six','7':'Seven','8':'Eight','9':'Nine','10':'Ten'
};

const KokoLearning: React.FC = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [currentMode, setCurrentMode] = useState<'letters' | 'numbers' | 'sorting'>('letters');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentData =
    language === 'ar'
      ? (currentMode === 'letters' ? arabicLetters : arabicNumbers)
      : (currentMode === 'letters' ? englishLetters : englishNumbers);

  const currentItem = currentData[currentIndex];

  // نطق العنصر الحالي
  const speakItem = (item: string) => {
    let text = '';
    if (language === 'ar') {
      text = currentMode === 'letters' ? letterPronunciationAr[item] : numberPronunciationAr[item];
    } else {
      text = currentMode === 'letters' ? letterPronunciationEn[item] : numberPronunciationEn[item];
    }

    if ('speechSynthesis' in window && text) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1; // أعلى صوت
      speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setShowSuccess(true);
    setTimeout(() => speakItem(currentItem), 200);
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentIndex((prev) => (prev + 1) % currentData.length);
      setTimeout(() => speakItem(currentData[(currentIndex + 1) % currentData.length]), 300);
    }, 1000);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShowSuccess(false);
    setTimeout(() => speakItem(currentData[0]), 300);
  };

  const handleModeChange = (mode: 'letters' | 'numbers' | 'sorting') => {
    setCurrentMode(mode);
    setCurrentIndex(0);
    setShowSuccess(false);
    if (mode !== 'sorting') setTimeout(() => speakItem(currentData[0]), 300);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
    setCurrentIndex(0);
    setTimeout(() => speakItem(currentData[0]), 500);
  };

  if (currentMode === 'sorting') {
    return (
      <LetterSortingGame
        language={language}
        onBack={() => handleModeChange('letters')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold text-blue-600 font-arabic">
              {language === 'ar' ? 'كوكو يتعلّم' : 'Koko Learning'}
            </h1>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="mb-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Globe className="w-5 h-5" />
            {language === 'ar' ? 'English' : 'العربية'}
          </button>

          {/* Mode Toggle */}
          <div className="flex justify-center space-x-2 mb-6 flex-wrap gap-2">
            <button
              onClick={() => handleModeChange('letters')}
              className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 font-arabic ${
                currentMode === 'letters'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {language === 'ar' ? 'الحروف' : 'Letters'}
            </button>
            <button
              onClick={() => handleModeChange('numbers')}
              className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 font-arabic ${
                currentMode === 'numbers'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {language === 'ar' ? 'الأرقام' : 'Numbers'}
            </button>
            <button
              onClick={() => handleModeChange('sorting')}
              className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 font-arabic ${
                currentMode === 'sorting'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-green-200 text-green-700 hover:bg-green-300'
              }`}
            >
              <Target className="w-5 h-5 inline ml-2" />
              {language === 'ar' ? 'ترتيب الحروف' : 'Letter Sorting'}
            </button>
          </div>
        </div>

        {/* Learning Card */}
        <div className="relative">
          <div
            className={`bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 text-center transition-all duration-500 ${
              showSuccess ? 'scale-110 shadow-2xl' : 'shadow-lg'
            }`}
          >
            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
              </div>
            )}

            <div
              className={`transition-opacity duration-300 ${
                showSuccess ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="text-8xl md:text-9xl font-bold text-blue-600 mb-4 animate-pulse">
                {currentItem}
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold text-purple-600 font-arabic mb-2">
                  {language === 'ar'
                    ? currentMode === 'letters'
                      ? letterPronunciationAr[currentItem]
                      : numberPronunciationAr[currentItem]
                    : currentMode === 'letters'
                    ? letterPronunciationEn[currentItem]
                    : numberPronunciationEn[currentItem]}
                </p>
                <button
                  onClick={() => speakItem(currentItem)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg font-arabic"
                >
                  <Volume2 className="w-6 h-6 inline ml-2" />
                  {language === 'ar' ? 'استمع للنطق' : 'Play Sound'}
                </button>
              </div>
              <p className="text-lg text-gray-600 font-arabic">
                {language === 'ar'
                  ? `${currentMode === 'letters' ? 'حرف' : 'رقم'} ${currentIndex + 1} من ${currentData.length}`
                  : `${currentMode === 'letters' ? 'Letter' : 'Number'} ${currentIndex + 1} of ${currentData.length}`}
              </p>
            </div>
          </div>

          {/* Auto Play */}
          <div className="text-center mb-6">
            <button
              onClick={() => speakItem(currentItem)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleNext}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg font-arabic"
          >
            {language === 'ar' ? 'التالي ✨' : 'Next ✨'}
          </button>

          <button
            onClick={handleReset}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-4 text-center">
          <p className="text-gray-700 font-arabic">
            {language === 'ar'
              ? '🔊 اضغط على زر "استمع للنطق" لسماع النطق الصحيح'
              : '🔊 Click "Play Sound" to hear the correct pronunciation'}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / currentData.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-sm text-gray-600 font-arabic">
            {currentIndex + 1} {language === 'ar' ? 'من' : 'of'} {currentData.length} -{' '}
            {Math.round(((currentIndex + 1) / currentData.length) * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default KokoLearning;
