import React from "react";
import { Link } from "react-router-dom";

export default function PaletteList({ palettes }) {
  const list = () => {
    return palettes.map((palette) => (
      <p>
        <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
      </p>
    ));
  };
  return (
    <div className="PaletteList">
      <h1>React Colors</h1>
      {list()}
    </div>
  );
}
