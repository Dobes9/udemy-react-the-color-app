import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

export default function SingleColorPalette() {
  const [format, setFormat] = useState("hex");
  const { paletteId, colorId } = useParams();
  const gatherShades = () => {
    const palette = generatePalette(
      seedColors.find((palette) => palette.id === paletteId)
    );
    const colorShades = [];
    for (let level in palette.colors) {
      colorShades.push({
        ...palette.colors[level].find((color) => color.id === colorId),
      });
    }
    return colorShades
      .slice(1)
      .map((shade) => (
        <ColorBox
          paletteId={paletteId}
          background={shade[format]}
          name={shade.name}
          colorId={shade.id}
          key={shade.id}
          showLink={false}
        />
      ));
  };
  return (
    <div className="Palette">
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">{gatherShades()}</div>
    </div>
  );
}
