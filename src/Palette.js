import React from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";

export default function Palette({ colors, emoji, id, paletteName }) {
  const colorBoxes = () => {
    return colors.map((color) => (
      <ColorBox background={color.color} key={color.name} name={color.name} />
    ));
  };
  return (
    <div className="Palette">
      {/* Navbar goes here */}
      <div className="Palette-colors">{colorBoxes()}</div>
      {/* footer */}
    </div>
  );
}
