import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default function Palette({ palette }) {
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
      <ColorBox background={color[format]} key={color.name} name={color.name} />
    ));
  };
  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
      />
      {/* Navbar goes here */}
      <div className="Palette-colors">{colorBoxes()}</div>
      {/* footer */}
    </div>
  );
}
