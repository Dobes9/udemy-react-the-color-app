import React, { useState } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import chroma from "chroma-js";

const styles = {
  ColorBox: {
    width: "20%",
    height: (props) => (props.showingFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: "1",
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.5 ? "black" : "white",
  },
  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black",
  },
  seeMore: {
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    color: (props) =>
      chroma(props.background).luminance() >= 0.7
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: (props) =>
      chroma(props.background).luminance() >= 0.7
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    textTransform: "uppercase",
    border: "none",
    opacity: "0",
  },
};

function ColorBox({
  background,
  name,
  paletteId,
  colorId,
  showingFullPalette,
  classes,
}) {
  const [copied, setCopied] = useState(false);
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/palette/${paletteId}/${colorId}`);
  };
  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.5;
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={`copy-overlay ${copied ? `show` : ``}`}
        />
        <div className={`copy-msg ${copied ? `show` : ``}`}>
          <h1>COPIED!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>copy</button>
        </div>
        {showingFullPalette ? (
          <span className={classes.seeMore} onClick={handleClick}>
            more
          </span>
        ) : null}
      </div>
    </CopyToClipboard>
  );
}

export default withStyles(styles)(ColorBox);
