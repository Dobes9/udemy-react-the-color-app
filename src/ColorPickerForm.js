import React, { useState } from "react";
import PaletteFormNav from "./PaletteFormNav";
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

export default function ColorPickerForm({
  paletteFull,
  newColor,
  updateNewColor,
  addNewColor,
  newColorName,
  handleColorNameChange,
}) {
  return (
    <div>
      <ChromePicker color={newColor} onChangeComplete={updateNewColor} />
      <ValidatorForm onSubmit={addNewColor}>
        <TextValidator
          value={newColorName}
          name="newColorName"
          onChange={handleColorNameChange}
          label="Color Name"
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already in palette",
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: paletteFull ? "grey" : newColor }}
          type="submit"
          disabled={paletteFull}
        >
          {paletteFull ? "palette full" : "add color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}
