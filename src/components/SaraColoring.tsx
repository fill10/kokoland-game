import React, { useRef, useState, useEffect } from "react";

interface ColoringImage {
  src: string;
  name: string;
}

const coloringImages: ColoringImage[] = [
  { src: new URL("../assets/coloring/horse.webp", import.meta.url).href, name: "حصان" },
  { src: new URL("../assets/coloring/sheep.webp", import.meta.url).href, name: "خروف" },
  { src: new URL("../assets/coloring/chicken.webp", import.meta.url).href, name: "دجاجة" },
  { src: new URL("../assets/coloring/pomegranate.webp", import.meta.url).href, name: "رمانة" },
  { src: new URL("../assets/coloring/giraffe.webp", import.meta.url).href, name: "زرافة" },
  { src: new URL("../assets/coloring/cat.webp", import.meta.url).href, name: "قط" },
  { src: new URL("../assets/coloring/fish.webp", import.meta.url).href, name: "سمكة" },
  { src: new URL("../assets/coloring/rabbit.png", import.meta.url).href, name: "أرنب" },
];

// 🔊 صوت تشجيع
const cheerSound = new Audio(new URL("../assets/sounds/cheer.mp3", import.meta.url).href);

function SaraColoring() {
  const [selectedImage, setSelectedImage] = useState<ColoringImage | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ff0000");
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState<string[]>([]);

  // تحميل الصورة
  const loadImage = () => {
    if (selectedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.src = selectedImage.src;
      img.onload = () => {
        canvas.width = 500;
        canvas.height = 500;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        imgRef.current = img;
        ctxRef.current = ctx;
        setHistory([]); // تفريغ التاريخ عند إعادة تحميل
      };
    }
  };

  useEffect(() => {
    loadImage();
  }, [selectedImage]);

  // حفظ حالة للرسم قبل أي تغيير
  const saveState = () => {
    if (canvasRef.current) {
      setHistory((prev) => [...prev, canvasRef.current!.toDataURL()]);
    }
  };

  // التراجع خطوة
  const undo = () => {
    if (history.length === 0 || !canvasRef.current) return;
    const lastState = history[history.length - 1];
    const img = new Image();
    img.src = lastState;
    img.onload = () => {
      ctxRef.current?.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctxRef.current?.drawImage(img, 0, 0);
      setHistory((prev) => prev.slice(0, -1));
    };
  };

  // بدء الرسم
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    saveState();
    setIsDrawing(true);
    draw(e);
  };

  // إنهاء الرسم
  const endDrawing = () => {
    setIsDrawing(false);
    ctxRef.current?.beginPath();
  };

  // عملية الرسم
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctxRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctxRef.current.lineWidth = brushSize;
    ctxRef.current.lineCap = "round";
    ctxRef.current.strokeStyle = color;

    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  // تحميل للطباعة
  const handleDownload = () => {
    if (!canvasRef.current) return;
    cheerSound.play(); // 🎉 صوت تشجيع
    const link = document.createElement("a");
    link.download = `${selectedImage?.name || "coloring"}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  // إعادة تعيين (مسح الكل)
  const handleReset = () => {
    loadImage();
  };

  // استخراج شهادة
  const handleCertificate = () => {
    const certWindow = window.open("", "_blank");
    if (certWindow) {
      certWindow.document.write(`
        <html>
          <head>
            <title>شهادة إنجاز</title>
            <style>
              body { font-family: 'Arial', sans-serif; text-align: center; padding: 50px; }
              .cert { border: 5px solid #ff69b4; padding: 40px; border-radius: 20px; }
              h1 { color: #ff69b4; }
              p { font-size: 20px; }
            </style>
          </head>
          <body>
            <div class="cert">
              <h1>🎉 شهادة إنجاز 🎉</h1>
              <p>أحسنت! لقد أنجزت رسمة رائعة في كوكو وأصدقاء الحروف</p>
              <p>استمر في الإبداع والتعلم 🌟</p>
            </div>
            <button onclick="window.print()">🖨️ طباعة</button>
          </body>
        </html>
      `);
      certWindow.document.close();
    }
  };

  return (
    <div className="p-6 font-arabic text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">🎨 سارة تُلون</h1>

      {!selectedImage ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {coloringImages.map((img, index) => (
            <div
              key={index}
              className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.src}
                alt={img.name}
                className="w-40 h-40 object-contain mx-auto"
              />
              <p className="mt-2 text-lg font-bold text-gray-700">{img.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Canvas */}
          <div className="bg-white rounded-2xl shadow-lg p-6 inline-block mb-6">
            <canvas
              ref={canvasRef}
              className="border-2 border-gray-300 rounded-lg"
              onMouseDown={startDrawing}
              onMouseUp={endDrawing}
              onMouseMove={draw}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchEnd={endDrawing}
              onTouchMove={draw}
            />
            <p className="mt-4 text-xl font-bold text-gray-700">{selectedImage.name}</p>
          </div>

          {/* أدوات التحكم */}
          <div className="flex justify-center items-center gap-4 flex-wrap mb-6">
            <label className="text-lg font-bold">🎨 اللون:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 cursor-pointer"
            />

            <label className="text-lg font-bold">✏️ الفرشاة:</label>
            <select
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="border px-2 py-1 rounded-lg"
            >
              <option value={3}>رفيعة</option>
              <option value={6}>متوسطة</option>
              <option value={12}>عريضة</option>
            </select>
          </div>

          {/* الأزرار */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setSelectedImage(null)}
              className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-600"
            >
              ⬅️ الرجوع
            </button>
            <button
              onClick={handleReset}
              className="bg-yellow-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-yellow-600"
            >
              🗑️ مسح الكل
            </button>
            <button
              onClick={undo}
              className="bg-orange-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-orange-600"
            >
              ↩️ تراجع
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-green-600"
            >
              ⬇️ تحميل للطباعة
            </button>
            <button
              onClick={handleCertificate}
              className="bg-pink-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-pink-600"
            >
              📜 شهادة إنجاز
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaraColoring;
