import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

export default function Palette() {
  const { paletteId } = useParams();
  // const palette = generatePalette(
  //   seedColors.find((palette) => palette.id === paletteId)
  // );
  const [palette, setPalette] = useState(
    generatePalette(seedColors.find((palette) => palette.id === paletteId))
  );
  const { paletteName, id, emoji, colors } = palette;
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };
  const changeFormat = (val) => {
    setFormat(val);
  };
  const colorBoxes = () => {
    return colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        paletteId={id}
        colorId={color.id}
        key={color.id}
        name={color.name}
        showLink={true}
      />
    ));
  };
  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showSlider
      />
      <div className="Palette-colors">{colorBoxes()}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
