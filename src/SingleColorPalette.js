import React, { useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

export default function SingleColorPalette() {
  const [format, setFormat] = useState("hex");
  const changeFormat = (val) => {
    setFormat(val);
  };
  const { paletteId, colorId } = useParams();
  const palette = generatePalette(
    seedColors.find((palette) => palette.id === paletteId)
  );
  const { paletteName, emoji, colors } = palette;
  const gatherShades = () => {
    const colorShades = [];
    for (let level in colors) {
      colorShades.push({
        ...colors[level].find((color) => color.id === colorId),
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
      <Navbar showSlider={false} changeFormat={changeFormat} />
      <div className="Palette-colors">{gatherShades()}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
