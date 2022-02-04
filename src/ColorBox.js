import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "./styles/ColorBoxStyles";

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

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={`${classes.copyOverlay} ${
            copied ? `${classes.showOverlay}` : ``
          }`}
        />
        <div
          className={`${classes.copyMessage} ${
            copied ? `${classes.showCopyMessage}` : ``
          }`}
        >
          <h1>COPIED!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
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
