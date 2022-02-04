import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { withStyles } from "@mui/styles";
import styles from "./styles/PaletteStyles";

function Palette({ classes }) {
  const { paletteId } = useParams();
  // const palette = generatePalette(
  //   seedColors.find((palette) => palette.id === paletteId)
  // );
  const [palette, setPalette] = useState(
    generatePalette(seedColors.find((palette) => palette.id === paletteId))
  );
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
      <ColorBox
        background={color[format]}
        paletteId={id}
        colorId={color.id}
        key={color.id}
        name={color.name}
        showingFullPalette
      />
    ));
  };
  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showSlider
      />
      <div className={classes.colors}>{colorBoxes()}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(Palette);
