import React, { useState } from "react";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import { styled, useTheme } from "@mui/material/styles";
import DraggableColorList from "./DraggableColorList";
// import { arrayMove } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move"
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@mui/styles";

const styles = {
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%"
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
}

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
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
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

function NewPaletteForm({ savePalette, palettes, maxColors = 20, classes }) {
  const [colors, setColors] = useState([...palettes[0].colors]);
  const [newColor, setNewColor] = useState("#008080");
  const [newColorName, setNewColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [newEmoji, setNewEmoji] = useState(null)
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


  const handleColorNameChange = (e) => {
    setNewColorName(e.target.value);
  };
  const handlePaletteNameChange = (e) => {
    setNewPaletteName(e.target.value);
  };

  const deleteColor = (colorName) => {
    setColors((colors) => colors.filter((color) => color.name !== colorName));
  };

  const handleClearPalette = () => {
    setColors([]);
  };

  const handleGenRandColor = () => {
    if (colors.length < maxColors) {
      const allColors = palettes.map((p) => p.colors).flat();
      let rand = Math.floor(Math.random() * allColors.length);
      const randomColor = allColors[rand];
      setColors((colors) => [...colors, randomColor]);
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMoveImmutable(colors, oldIndex, newIndex));
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
        newPaletteName={newPaletteName}
        handlePaletteNameChange={handlePaletteNameChange}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
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
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>Design your palette</Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearPalette}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenRandColor}
              disabled={paletteFull}
              className={classes.button}
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
        </div>
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

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
