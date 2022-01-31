import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

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
      <Navbar level={level} changeLevel={changeLevel} />
      {/* Navbar goes here */}
      <div className="Palette-colors">{colorBoxes()}</div>
      {/* footer */}
    </div>
  );
}
