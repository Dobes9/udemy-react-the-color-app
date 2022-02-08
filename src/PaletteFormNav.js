import React, { useState } from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import { styled, useTheme } from "@mui/material/styles";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";


const styles = {
  root: {
    display: "flex",
  },
  navBtns: {
    marginRight: "1rem",

  },
  button: {
    margin: "0 0.5rem"
  }
}

function PaletteFormNav({
  open,
  handleDrawerOpen,
  colors,
  savePalette,
  AppBar,
  classes,
  newPaletteName,
  handlePaletteNameChange,
}) {
  const theme = useTheme();

  const [dialogOpen, setDialogOpen] = useState(false)
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSavePalette = (e) => {
    e.preventDefault();
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors,
    };
    savePalette(newPalette);
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create a Palette
          </Typography>

        </Toolbar>
        <div className={classes.navBtns}>
          <Button className={classes.button} variant="contained" color="secondary" onClick={handleGoBack}>
            go back
          </Button>
          <Button className={classes.button} variant="contained" onClick={handleClickOpen}>
            save palette
          </Button>
        </div>
        <PaletteMetaForm open={dialogOpen} handleClose={handleClose} handleSavePalette={handleSavePalette} newPaletteName={newPaletteName} handlePaletteNameChange={handlePaletteNameChange} />
      </AppBar>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)