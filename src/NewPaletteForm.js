import React, { useState } from "react";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
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

const drawerWidth = 320;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: `calc(100vh - 64px)`,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NewPaletteForm({ savePalette, palettes, maxColors = 20 }) {
  const [colors, setColors] = useState([...palettes[0].colors]);
  const [newColor, setNewColor] = useState("#008080");
  const [newColorName, setNewColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const paletteFull = colors.length >= maxColors;

  const updateNewColor = (color, event) => {
    setNewColor(color.hex);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = () => {
    if (colors.length < 20) {
      const color = { color: newColor, name: newColorName };
      setColors((colors) => [...colors, color]);
      setNewColorName("");
    }
  };
  //   const handleFormChange = (e) => {
  //     if (e.target.name === "newColorName") {
  //       setNewColorName(e.target.value);
  //     } else {
  //       setNewPaletteName(e.target.value);
  //     }
  //   };

  const handleColorNameChange = (e) => {
    setNewColorName(e.target.value);
  };

  const deleteColor = (colorName) => {
    setColors((colors) => colors.filter((color) => color.name !== colorName));
  };

  const handleClearPalette = () => {
    setColors([]);
  };

  const handleGenRandColor = () => {
    if (colors.length < 20) {
      const allColors = palettes.map((p) => p.colors).flat();
      let rand = Math.floor(Math.random() * allColors.length);
      const randomColor = allColors[rand];
      setColors((colors) => [...colors, randomColor]);
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };
  ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
    return colors.every(
      ({ name }) => name.toLowerCase() !== value.toLowerCase()
    );
  });
  ValidatorForm.addValidationRule("isColorUnique", (value) => {
    return colors.every(({ color }) => color !== newColor);
  });
  ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
    return palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    );
  });

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        colors={colors}
        savePalette={savePalette}
        AppBar={AppBar}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design your palette</Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearPalette}
          >
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenRandColor}
            disabled={paletteFull}
          >
            Random Color
          </Button>
        </div>
        <ColorPickerForm
          paletteFull={paletteFull}
          newColor={newColor}
          updateNewColor={updateNewColor}
          addNewColor={addNewColor}
          newColorName={newColorName}
          handleColorNameChange={handleColorNameChange}
        />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
}

export default NewPaletteForm;
