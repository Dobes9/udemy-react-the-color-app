import React, { useState } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import chroma from "chroma-js";

export default function ColorBox({
  background,
  name,
  paletteId,
  colorId,
  showLink,
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
      <div style={{ background }} className="ColorBox">
        <div
          style={{ background }}
          className={`copy-overlay ${copied ? `show` : ``}`}
        />
        <div className={`copy-msg ${copied ? `show` : ``}`}>
          <h1>COPIED!</h1>
          <p className={isLightColor ? "dark-text" : ""}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor ? "light-text" : ""}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor ? "dark-text" : ""}`}>
            copy
          </button>
        </div>
        {showLink ? (
          <span
            className={`see-more ${isLightColor ? "dark-text" : ""}`}
            onClick={handleClick}
          >
            more
          </span>
        ) : null}
      </div>
    </CopyToClipboard>
  );
}
