import React, { useState } from "react";
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
    
}

export default function PaletteFormNav({
  open,
  handleDrawerOpen,
  colors,
  savePalette,
  AppBar,
}) {
  const theme = useTheme();

  const [newPaletteName, setNewPaletteName] = useState("");

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const handlePaletteNameChange = (e) => {
    setNewPaletteName(e.target.value);
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
    <div>
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
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSavePalette}>
            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter palette name",
                "Palette name already used",
              ]}
            />
            <Button variant="contained" color="primary" type="submit">
              save palette
            </Button>
          </ValidatorForm>
          <Button variant="contained" color="secondary" onClick={handleGoBack}>
            go back
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
