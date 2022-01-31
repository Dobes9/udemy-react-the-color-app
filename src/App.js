// import "./App.css";
import { useParams } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Routes, Route } from "react-router-dom";

function App() {
  const { paletteId } = useParams();
  const element = () => {
    return generatePalette(findPalette(paletteId));
  };
  const findPalette = (id) => {
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Palette List goes here</h1>} />
        <Route path="/palette/:paletteId" element={<Palette />} />
      </Routes>
    </div>
  );
}

{
  /* <Palette palette={generatePalette(seedColors[4])} /> */
}

export default App;
