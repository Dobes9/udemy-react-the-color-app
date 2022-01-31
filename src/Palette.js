import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Palette({ palette }) {
  const { paletteName, id, emoji, colors } = palette;
  const [level, setLevel] = useState(500);
  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };
  const colorBoxes = () => {
    return colors[level].map((color) => (
      <ColorBox background={color.hex} key={color.name} name={color.name} />
    ));
  };
  return (
    <div className="Palette">
      <Slider
        defaultValue={level}
        min={100}
        max={900}
        onAfterChange={changeLevel}
        step={100}
      />
      {/* Navbar goes here */}
      <div className="Palette-colors">{colorBoxes()}</div>
      {/* footer */}
    </div>
  );
}
