// kokoland-game/src/components/SaraColoring.tsx
import React, { useState } from "react";

interface ColoringImage {
  src: string;
  name: string;
}

/**
 * استخدمنا new URL(...) لكي يتعرف Vite على الأصول داخل src/
 * (مجلد الصور لديك: src/assets/coloring/)
 */
const coloringImages: ColoringImage[] = [
  { src: new URL("../assets/coloring/cat.webp", import.meta.url).href, name: "قطة" },
  { src: new URL("../assets/coloring/coloring-5.webp", import.meta.url).href, name: "رسمة إضافية" },
  { src: new URL("../assets/coloring/duck.webp", import.meta.url).href, name: "بطة" },
  { src: new URL("../assets/coloring/fish.webp", import.meta.url).href, name: "سمكة" },
  { src: new URL("../assets/coloring/horse.webp", import.meta.url).href, name: "حصان" },
  { src: new URL("../assets/coloring/koko.webp", import.meta.url).href, name: "كوكو" },
  { src: new URL("../assets/coloring/rabbit.png", import.meta.url).href, name: "أرنب" },
  { src: new URL("../assets/coloring/to-1.webp", import.meta.url).href, name: "رسم 1" },
  { src: new URL("../assets/coloring/to-2.webp", import.meta.url).href, name: "رسم 2" },
  { src: new URL("../assets/coloring/to-3.webp", import.meta.url).href, name: "رسم 3" },
  { src: new URL("../assets/coloring/to-4.webp", import.meta.url).href, name: "رسم 4" },
];

const SUCCESS_SOUND = "/sounds/success.mp3"; // ملفك في public/sounds/success.mp3

export default function SaraColoring(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<ColoringImage | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // تحميل الصورة (يحفظ للصيغة الأصلية)
  const handleDownload = async (img: ColoringImage) => {
    try {
      // جلب الملف من المسار (يعمل لكل من public أو assets المعبأة)
      const res = await fetch(img.src);
      if (!res.ok) throw new Error("تعذر جلب الصورة");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // اسم الملف للتحميل
      const safeName = img.name.replace(/\s+/g, "_") || "coloring";
      a.download = `${safeName}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // شغل صوت النجاح (من public/sounds)
      const audio = new Audio(SUCCESS_SOUND);
      audio.volume = 1;
      audio.play().catch(()=>{});

      // أظهر نافذة النجاح الصغيرة
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2200);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء التحميل، حاول مرة أخرى.");
    }
  };

  // طباعة الصورة (يفتح نافذة الطباعة)
  const handlePrint = (img: ColoringImage) => {
    const w = window.open("", "_blank");
    if (!w) {
      alert("تعذر فتح نافذة الطباعة.");
      return;
    }
    w.document.write(`
      <html>
        <head>
          <title>طباعة - ${img.name}</title>
          <style>body{margin:0;display:flex;align-items:center;justify-content:center;height:100vh}img{max-width:95%;height:auto}</style>
        </head>
        <body>
          <img src="${img.src}" alt="${img.name}" />
        </body>
      </html>
    `);
    w.document.close();
    // صغير تأخير للتأكد من تحميل الصورة ثم طباعة
    setTimeout(() => w.print(), 400);
  };

  return (
    <div className="p-6 font-arabic text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">🎨 سارة تُلون</h1>

      {!selectedImage ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {coloringImages.map((img, idx) => (
            <div
              key={idx}
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
          <div className="bg-white rounded-2xl shadow-lg p-6 inline-block mb-6">
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="w-80 h-80 object-contain mx-auto"
            />
            <p className="mt-4 text-xl font-bold text-gray-700">{selectedImage.name}</p>
          </div>

          <div className="space-x-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-600 transition-all duration-300"
            >
              ⬅️ الرجوع
            </button>

            <button
              onClick={() => handleDownload(selectedImage)}
              className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-green-600 transition-all duration-300"
            >
              ⬇️ تحميل للطباعة
            </button>

            <button
              onClick={() => handlePrint(selectedImage)}
              className="bg-indigo-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-indigo-600 transition-all duration-300"
            >
              🖨️ طباعة
            </button>
          </div>
        </div>
      )}

      {/* مودال رسالة النجاح الصغيرة */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white/95 rounded-2xl p-6 shadow-xl border border-green-200 pointer-events-auto">
            <h3 className="text-green-600 font-bold text-lg">✅ تم التحميل</h3>
            <p className="text-sm text-gray-700">تم حفظ صورة التلوين بنجاح.</p>
          </div>
        </div>
      )}
    </div>
  );
}
