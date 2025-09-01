import React, { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const shapesData = [
  { id: 1, color: "red", type: "circle", size: 1, sides: 0 },
  { id: 2, color: "blue", type: "circle", size: 2, sides: 0 },
  { id: 3, color: "purple", type: "square", size: 3, sides: 4 },
  { id: 4, color: "yellow", type: "pentagon", size: 4, sides: 5 },
  { id: 5, color: "green", type: "rectangle", size: 5, sides: 4 },
  { id: 6, color: "cyan", type: "triangle", size: 6, sides: 3 },
  { id: 7, color: "teal", type: "square", size: 7, sides: 4 },
  { id: 8, color: "pink", type: "circle", size: 8, sides: 0 },
];

const DraggableShape = ({ shape }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: shape.id.toString(),
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    backgroundColor: shape.color,
    width: "60px",
    height: "60px",
    borderRadius: shape.type === "circle" ? "50%" : "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "white",
    cursor: "grab",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {shape.size}
    </div>
  );
};

const DroppableArea = ({ children, id }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        border: isOver ? "2px solid green" : "2px dashed #ccc",
        borderRadius: "12px",
        padding: "10px",
        minHeight: "80px",
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isOver ? "#f0fff0" : "#f9f9f9",
      }}
    >
      {children}
    </div>
  );
};

const ShapesGame = () => {
  const [shapes, setShapes] = useState(shapesData);
  const [criterion, setCriterion] = useState("size");
  const [success, setSuccess] = useState(false);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = shapes.findIndex((shape) => shape.id.toString() === active.id);
    const newIndex = shapes.findIndex((shape) => shape.id.toString() === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedShapes = arrayMove(shapes, oldIndex, newIndex);
      setShapes(updatedShapes);

      // تحقق من الترتيب
      const isCorrect = [...updatedShapes].sort((a, b) => a[criterion] - b[criterion])
        .every((shape, index) => shape.id === updatedShapes[index].id);

      setSuccess(isCorrect);
    }
  };

  const resetGame = () => {
    setShapes(shapesData);
    setSuccess(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 font-arabic">
        🔷 هندسة الأشكال
      </h1>

      {/* معايير الترتيب */}
      <div className="flex gap-3 mb-4">
        {["size", "color", "sides"].map((option) => (
          <button
            key={option}
            onClick={() => setCriterion(option)}
            className={`px-4 py-2 rounded-full text-white font-bold ${
              criterion === option ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {option === "size" && "الحجم"}
            {option === "color" && "اللون"}
            {option === "sides" && "الأضلاع"}
          </button>
        ))}
      </div>

      {/* منطقة السحب والإفلات */}
      <DndContext onDragEnd={handleDragEnd}>
        <DroppableArea id="drop-zone">
          {shapes.map((shape) => (
            <DraggableShape key={shape.id} shape={shape} />
          ))}
        </DroppableArea>
      </DndContext>

      {/* أزرار التحكم */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={resetGame}
          className="bg-purple-600 text-white px-4 py-2 rounded-full shadow hover:bg-purple-700"
        >
          <RotateCcw className="inline w-5 h-5 mr-2" />
          إعادة
        </button>
      </div>

      {/* رسالة النجاح */}
      {success && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg font-bold shadow">
          🎉 أحسنت! تم ترتيب الأشكال بنجاح!
        </div>
      )}
    </div>
  );
};

export default ShapesGame;
