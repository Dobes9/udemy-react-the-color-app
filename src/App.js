// import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Palette List goes here</h1>} />
        <Route
          path="/palette/:paletteId"
          element={<h1>Individual Palette</h1>}
        />
      </Routes>
    </div>
  );
}

{
  /* <Palette palette={generatePalette(seedColors[4])} /> */
}

export default App;
