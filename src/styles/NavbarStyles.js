export default {
  Navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh",
  },

  logo: {
    marginright: "50px",
    padding: "0 13px",
    fontsize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    },
    "& .rc-slider-rail": {
      height: "8px",
    },
    "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus":
      {
        backgroundColor: "green",
        outline: "none",
        border: "2px solid green",
        boxshadow: "none",
        width: "13px",
        height: "13px",
        marginLeft: "-7px",
        margintop: "-3px",
      },
  },
  selectContainer: {
    marginLeft: "auto",
    marginright: "1rem",
  },
};
