import React, { useState } from "react";
import HomePage from "./components/HomePage";
import AhmedPuzzle from "./components/AhmedPuzzle";
import SaraColoring from "./components/SaraColoring";
import KokoLearning from "./components/KokoLearning";
import LetterSortingGame from "./components/LetterSortingGame";
import GeometryShapes from "./components/GeometryShapes";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100">
      {page === "home" && <HomePage onNavigate={setPage} />}
      {page === "puzzle" && <AhmedPuzzle />}
      {page === "coloring" && <SaraColoring />}
      {page === "learning" && <KokoLearning />}
      {page === "letters" && <LetterSortingGame />}
      {page === "shapes" && <GeometryShapes />}
    </div>
  );
}

export default App;
