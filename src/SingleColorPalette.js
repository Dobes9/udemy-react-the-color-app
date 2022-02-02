import React, { useState } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
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
          key={shade.name}
          showingFullPalette={false}
        />
      ));
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="SingleColorPalette Palette">
      <Navbar showSlider={false} changeFormat={changeFormat} />
      <div className="Palette-colors">
        {gatherShades()}
        <div className="go-back ColorBox">
          <a className="back-button" onClick={handleBack}>
            go back
          </a>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
