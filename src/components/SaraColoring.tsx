import React, { useState } from "react";

interface ColoringImage {
  src: string;
  name: string;
}

const coloringImages: ColoringImage[] = [
  { src: "/assets/images/horse-outline.png", name: "حصان" },
  { src: "/assets/images/sheep-outline.png", name: "خروف" },
  { src: "/assets/images/chicken-outline.png", name: "دجاجة" },
  { src: "/assets/images/pomegranate-outline.png", name: "رمانة" },
  { src: "/assets/images/giraffe-outline.png", name: "زرافة" },
  // 🔔 يمكنك إضافة المزيد من رسومات التلوين هنا
];

function SaraColoring() {
  const [selectedImage, setSelectedImage] = useState<ColoringImage | null>(null);

  return (
    <div className="p-6 font-arabic text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">🎨 سارة تُلون</h1>

      {/* قائمة الصور للاختيار */}
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
          {/* صورة التلوين الكبيرة */}
          <div className="bg-white rounded-2xl shadow-lg p-6 inline-block mb-6">
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="w-80 h-80 object-contain mx-auto"
            />
            <p className="mt-4 text-xl font-bold text-gray-700">{selectedImage.name}</p>
          </div>

          {/* أزرار التحكم */}
          <div className="space-x-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-600 transition-all duration-300"
            >
              ⬅️ الرجوع
            </button>
            <button
              onClick={() => alert("📥 تم تنزيل صورة التلوين للطباعة!")}
              className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-green-600 transition-all duration-300"
            >
              ⬇️ تحميل للطباعة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaraColoring;
