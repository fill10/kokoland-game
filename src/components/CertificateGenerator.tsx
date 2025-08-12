import React, { useState, useRef } from 'react';
import { Award, Download, User, Star, Heart } from 'lucide-react';
import jsPDF from 'jspdf';

const CertificateGenerator: React.FC = () => {
  const [childName, setChildName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCertificate = () => {
    if (!childName.trim()) {
      alert('يرجى إدخال اسم الطفل أولاً!');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (selectedTemplate === 1) {
      gradient.addColorStop(0, '#FFE5F1');
      gradient.addColorStop(0.5, '#E5F3FF');
      gradient.addColorStop(1, '#FFF5E5');
    } else if (selectedTemplate === 2) {
      gradient.addColorStop(0, '#E8F5E8');
      gradient.addColorStop(0.5, '#F0E8FF');
      gradient.addColorStop(1, '#FFE8E8');
    } else {
      gradient.addColorStop(0, '#FFF8DC');
      gradient.addColorStop(0.5, '#E6E6FA');
      gradient.addColorStop(1, '#F0FFFF');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = selectedTemplate === 1 ? '#FF69B4' : selectedTemplate === 2 ? '#32CD32' : '#FFD700';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner border
    ctx.strokeStyle = selectedTemplate === 1 ? '#FF1493' : selectedTemplate === 2 ? '#228B22' : '#FFA500';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Title
    ctx.fillStyle = selectedTemplate === 1 ? '#FF1493' : selectedTemplate === 2 ? '#228B22' : '#FF8C00';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('شهادة تقدير', canvas.width / 2, 120);

    // Subtitle
    ctx.fillStyle = '#666';
    ctx.font = '24px Arial';
    ctx.fillText('Certificate of Achievement', canvas.width / 2, 160);

    // Main text
    ctx.fillStyle = '#333';
    ctx.font = '28px Arial';
    ctx.fillText('تُمنح هذه الشهادة للطفل المتميز', canvas.width / 2, 220);

    // Child name
    ctx.fillStyle = selectedTemplate === 1 ? '#FF1493' : selectedTemplate === 2 ? '#228B22' : '#FF8C00';
    ctx.font = 'bold 42px Arial';
    ctx.fillText(childName, canvas.width / 2, 280);

    // Achievement text
    ctx.fillStyle = '#333';
    ctx.font = '24px Arial';
    ctx.fillText('لإتمامه بنجاح جميع أنشطة', canvas.width / 2, 330);
    ctx.fillText('KokoLand - عالم كوكو', canvas.width / 2, 365);

    // Date
    const currentDate = new Date().toLocaleDateString('ar-SA');
    ctx.fillStyle = '#666';
    ctx.font = '20px Arial';
    ctx.fillText(`التاريخ: ${currentDate}`, canvas.width / 2, 420);

    // Decorative elements
    drawStar(ctx, 150, 100, 25, selectedTemplate === 1 ? '#FFD700' : selectedTemplate === 2 ? '#32CD32' : '#FF69B4');
    drawStar(ctx, 650, 100, 25, selectedTemplate === 1 ? '#FFD700' : selectedTemplate === 2 ? '#32CD32' : '#FF69B4');
    drawStar(ctx, 150, 500, 25, selectedTemplate === 1 ? '#FFD700' : selectedTemplate === 2 ? '#32CD32' : '#FF69B4');
    drawStar(ctx, 650, 500, 25, selectedTemplate === 1 ? '#FFD700' : selectedTemplate === 2 ? '#32CD32' : '#FF69B4');

    // Award icon
    drawAwardIcon(ctx, canvas.width / 2, 480, selectedTemplate === 1 ? '#FF1493' : selectedTemplate === 2 ? '#228B22' : '#FF8C00');
  };

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5;
      const x1 = x + size * Math.cos(angle);
      const y1 = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(x1, y1);
      else ctx.lineTo(x1, y1);
      
      const angle2 = ((i + 0.5) * 4 * Math.PI) / 5;
      const x2 = x + (size * 0.5) * Math.cos(angle2);
      const y2 = y + (size * 0.5) * Math.sin(angle2);
      ctx.lineTo(x2, y2);
    }
    ctx.closePath();
    ctx.fill();
  };

  const drawAwardIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏆', x, y + 8);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create PDF
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 10, 10, 277, 190);
    
    // Download PDF
    pdf.save(`شهادة-${childName || 'الطفل'}.pdf`);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `شهادة-${childName || 'الطفل'}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-yellow-600 font-arabic">مولد الشهادات</h1>
          </div>
          <p className="text-lg text-gray-600 font-arabic">🏆 احصل على شهادة تقدير مخصصة!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-2 font-arabic">
                <User className="w-5 h-5 inline ml-2" />
                اسم الطفل
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="أدخل اسم الطفل هنا..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-500 focus:outline-none text-lg font-arabic text-center"
                dir="rtl"
              />
            </div>

            {/* Template Selection */}
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-4 font-arabic">
                اختر التصميم المفضل
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((template) => (
                  <button
                    key={template}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedTemplate === template
                        ? 'border-yellow-500 bg-yellow-50 scale-105'
                        : 'border-gray-300 hover:border-yellow-300'
                    }`}
                  >
                    <div className={`w-full h-16 rounded-lg mb-2 ${
                      template === 1 ? 'bg-gradient-to-r from-pink-200 to-blue-200' :
                      template === 2 ? 'bg-gradient-to-r from-green-200 to-purple-200' :
                      'bg-gradient-to-r from-yellow-200 to-orange-200'
                    }`} />
                    <span className="text-sm font-arabic">تصميم {template}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={generateCertificate}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg font-arabic text-lg"
              >
                <Star className="w-6 h-6 inline ml-2" />
                إنشاء الشهادة
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={downloadImage}
                  disabled={!childName.trim()}
                  className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 font-arabic ${
                    childName.trim()
                      ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-5 h-5 inline ml-2" />
                  تحميل صورة
                </button>
                
                <button
                  onClick={downloadCertificate}
                  disabled={!childName.trim()}
                  className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 font-arabic ${
                    childName.trim()
                      ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  📄 تحميل PDF
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-700 mb-4 font-arabic">معاينة الشهادة</h3>
            <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto border-2 border-gray-300 rounded-lg shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
            
            {!childName.trim() && (
              <p className="text-gray-500 mt-4 text-center font-arabic">
                أدخل اسم الطفل لرؤية المعاينة
              </p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 text-center">
          <p className="text-gray-700 font-arabic">
            🌟 أدخل اسم الطفل واختر التصميم المفضل، ثم اضغط "إنشاء الشهادة" للحصول على شهادة تقدير جميلة!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;