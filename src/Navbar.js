import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default function Navbar({ level, changeLevel, changeFormat }) {
  const [format, setFormat] = useState("hex");
  const handleChange = (e) => {
    setFormat(e.target.value);
    changeFormat(e.target.value);
  };
  return (
    <header className="Navbar">
      <div className="logo">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>Level: {level}</span>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            onAfterChange={changeLevel}
            step={100}
          />
        </div>
      </div>
      <div className="select-container">
        <Select value={format} onChange={handleChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RBG - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
    </header>
  );
}
