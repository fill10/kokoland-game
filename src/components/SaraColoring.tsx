import React, { useState, useRef } from 'react';
import { Palette, RotateCcw, Download, Printer, ArrowRight, ArrowLeft } from 'lucide-react';

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
  '#FF6348', '#2ED573', '#3742FA', '#F8B500', '#FF5722',
  '#8B4513', '#000000', '#FFFFFF', '#808080', '#FFB6C1'
];

const coloringPages = [
  { id: 1, name: 'الأرنب المرح', src: 'src/assets/coloring/coloring (Rabbit).png' },
  { id: 2, name: 'التفاحة السعيدة', src: 'src/assets/coloring/to coloring (2).webp' },
  { id: 3, name: 'الموزة اللذيذة', src: 'src/assets/coloring/to coloring (3).webp' },
  { id: 4, name: 'البرتقالة المبتسمة', src: 'src/assets/coloring/to coloring (4).webp' },
  { id: 5, name: 'التفاحة الجميلة', src: 'src/assets/coloring/to coloring (5).webp' },
  { id: 6, name: 'الضفدع الودود', src: 'src/assets/coloring/to coloring (11).webp' },
  { id: 7, name: 'النمر الشجاع', src: 'src/assets/coloring/to coloring (12).webp' },
  { id: 8, name: 'الببغاء الملون', src: 'src/assets/coloring/to coloring (13).webp' },
  { id: 9, name: 'الكوالا اللطيف', src: 'src/assets/coloring/to coloring (14).webp' },
  { id: 10, name: 'الأرنب الصغير', src: 'src/assets/coloring/to coloring (15).webp' }
];

const SaraColoring = () => {
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [coloredAreas, setColoredAreas] = useState<{ [key: string]: string }>({});
  const [brushSize, setBrushSize] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentPage = coloringPages[currentPageIndex];

  const nextPage = () => {
    setCurrentPageIndex((prev) => (prev + 1) % coloringPages.length);
    setColoredAreas({});
  };

  const prevPage = () => {
    setCurrentPageIndex((prev) => (prev - 1 + coloringPages.length) % coloringPages.length);
    setColoredAreas({});
  };

  const resetColors = () => {
    setColoredAreas({});
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    draw(e);
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a new canvas to combine background and drawing
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');
    if (!combinedCtx) return;

    combinedCanvas.width = canvas.width;
    combinedCanvas.height = canvas.height;

    // Draw white background
    combinedCtx.fillStyle = 'white';
    combinedCtx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

    // Draw the background image
    const img = new Image();
    img.onload = () => {
      combinedCtx.drawImage(img, 0, 0, combinedCanvas.width, combinedCanvas.height);
      // Draw the coloring on top
      combinedCtx.drawImage(canvas, 0, 0);
      
      // Download
      const link = document.createElement('a');
      link.download = `${currentPage.name}-ملون.png`;
      link.href = combinedCanvas.toDataURL();
      link.click();
    };
    img.src = currentPage.src;
  };

  const printImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const img = canvas.toDataURL();
    printWindow.document.write(`
      <html>
        <head>
          <title>طباعة - ${currentPage.name}</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            img { max-width: 100%; max-height: 100%; }
          </style>
        </head>
        <body>
          <img src="${img}" alt="${currentPage.name}" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Palette className="w-12 h-12 text-pink-500 mr-3" />
            <h1 className="text-4xl font-bold text-pink-600 font-arabic">سارة تُلوّن</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 font-arabic">{currentPage.name}</h2>
          <p className="text-lg text-gray-600 font-arabic">🎨 اختر لوناً وابدأ التلوين!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Color Picker */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-700 font-arabic">اختر لونك المفضل</h3>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                    selectedColor === color 
                      ? 'ring-4 ring-pink-400 ring-offset-2 scale-110' 
                      : 'hover:shadow-xl'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Brush Size */}
            <div className="mb-6 w-full">
              <h4 className="text-lg font-bold mb-2 text-gray-700 font-arabic">حجم الفرشاة</h4>
              <input
                type="range"
                min="5"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2">
                <div 
                  className="mx-auto rounded-full border-2 border-gray-300"
                  style={{ 
                    width: `${brushSize}px`, 
                    height: `${brushSize}px`,
                    backgroundColor: selectedColor 
                  }}
                />
              </div>
            </div>

            {/* Selected Color Display */}
            <div className="bg-white rounded-2xl p-6 shadow-lg w-full">
              <p className="text-lg font-semibold text-gray-700 mb-2 font-arabic text-center">اللون المختار:</p>
              <div 
                className="w-16 h-16 rounded-full mx-auto shadow-lg ring-2 ring-pink-200"
                style={{ backgroundColor: selectedColor }}
              ></div>
            </div>
          </div>

          {/* Drawing Area */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="relative bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-4 mb-4 shadow-inner">
              <div className="relative">
                {/* Background Image */}
                <img 
                  src={currentPage.src} 
                  alt={currentPage.name}
                  className="w-full h-auto rounded-lg opacity-30"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
                
                {/* Drawing Canvas */}
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  className="absolute top-0 left-0 w-full h-full cursor-crosshair rounded-lg"
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                />
              </div>
            </div>
            
            {/* Page Controls */}
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={prevPage}
                className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <span className="text-lg font-bold text-gray-700 font-arabic">
                {currentPageIndex + 1} من {coloringPages.length}
              </span>
              
              <button
                onClick={nextPage}
                className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={resetColors}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg font-arabic"
              >
                <RotateCcw className="w-5 h-5 inline ml-2" />
                مسح
              </button>
              
              <button
                onClick={downloadImage}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg font-arabic"
              >
                <Download className="w-5 h-5 inline ml-2" />
                تحميل
              </button>
              
              <button
                onClick={printImage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg font-arabic"
              >
                <Printer className="w-5 h-5 inline ml-2" />
                طباعة
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 text-center">
          <p className="text-gray-700 font-arabic">
            🎨 اختر لوناً واضغط على الصورة للتلوين! يمكنك تغيير حجم الفرشاة وحفظ عملك الفني
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaraColoring;