// import "./App.css";
import React, { useState } from "react";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import { Routes, Route } from "react-router-dom";

function App() {
  const [palettes, setPalettes] = useState(seedColors);
  const savePalette = (palette) => {
    setPalettes((state) => [...state, palette]);
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PaletteList palettes={palettes} />} />
        <Route
          path="/palette/new"
          element={
            <NewPaletteForm savePalette={savePalette} palettes={palettes} />
          }
        />
        <Route
          path="/palette/:paletteId"
          element={<Palette palettes={palettes} />}
        />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette />}
        />
      </Routes>
    </div>
  );
}

export default App;
