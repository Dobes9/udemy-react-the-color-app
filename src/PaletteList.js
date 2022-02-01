import React from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";

export default function PaletteList({ palettes }) {
  const list = () => {
    return palettes.map((palette) => (
      <MiniPalette key={palette.id} {...palette} />
    ));
  };
  return (
    <div className="PaletteList">
      <h1>React Colors</h1>
      {list()}
    </div>
  );
}
