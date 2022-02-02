import React, { useState } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

export default function ColorBox({ background, name, paletteId, colorId }) {
  const [copied, setCopied] = useState(false);
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className="ColorBox">
        <div
          style={{ background }}
          className={`copy-overlay ${copied ? `show` : ``}`}
        />
        <div className={`copy-msg ${copied ? `show` : ``}`}>
          <h1>COPIED!</h1>
          <p>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">copy</button>
        </div>
        <Link to={`/palette/${paletteId}/${colorId}}`} onClick={handleClick}>
          <span className="see-more">more</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
}
