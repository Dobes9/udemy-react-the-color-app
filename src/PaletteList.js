import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
import styles from "./styles/PaletteListStyles";

function PaletteList({ classes, palettes }) {
  const list = () => {
    return palettes.map((palette) => (
      <MiniPalette key={palette.id} {...palette} />
    ));
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>{list()}</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
