import { useState } from "react";

function CertificateGenerator() {
  const [name, setName] = useState("اسمي");

  return (
    <div className="text-center font-arabic">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">🏆 شهادة إنجاز</h2>

      <div className="border-4 border-yellow-400 rounded-2xl p-6 bg-gradient-to-br from-yellow-50 to-white shadow-lg">
        <p className="text-lg mb-4">هذه الشهادة مقدمة إلى:</p>
        
        {/* إدخال الاسم */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded-lg text-center text-xl font-bold mb-4"
        />

        <p className="text-lg">👏 تقديراً لاجتهاده في لعبة كوكو وأصدقاء الحروف</p>
        <p className="mt-4 text-sm text-gray-600">بتاريخ: {new Date().toLocaleDateString("ar-EG")}</p>
      </div>

      {/* زر الطباعة */}
      <button
        onClick={() => window.print()}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        🖨️ طباعة الشهادة
      </button>
    </div>
  );
}

export default CertificateGenerator;
