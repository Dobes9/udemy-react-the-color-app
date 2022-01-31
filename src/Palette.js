import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "rc-slider/assets/index.css";
import "./Palette.css";
import Slider from "rc-slider";

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
      <div className="slider">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          onAfterChange={changeLevel}
          step={100}
        />
      </div>
      {/* Navbar goes here */}
      <div className="Palette-colors">{colorBoxes()}</div>
      {/* footer */}
    </div>
  );
}
