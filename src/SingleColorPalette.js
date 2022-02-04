import React, { useState } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { withStyles } from "@mui/styles";
import styles from "./styles/PaletteStyles";

function SingleColorPalette({ classes }) {
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
    <div className={classes.Palette}>
      <Navbar showSlider={false} changeFormat={changeFormat} />
      <div className={classes.colors}>
        {gatherShades()}
        <div className={classes.goBack}>
          <a onClick={handleBack}>go back</a>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(SingleColorPalette);
