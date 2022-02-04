import React from "react";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import styles from "./styles/MiniPaletteStyles";

function MiniPalette({ classes, paletteName, emoji, colors, id }) {
  const miniColorBoxes = colors.map((color) => {
    return (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    );
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/palette/${id}`);
  };
  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
