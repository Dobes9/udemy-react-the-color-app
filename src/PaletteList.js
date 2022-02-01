import React from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
  },
};

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
        </nav>
        <div className={classes.palettes}>{list()}</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
