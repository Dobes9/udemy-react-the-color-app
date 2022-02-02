import React, { useState } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";

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
        {showLink ? (
          <span className="see-more" onClick={handleClick}>
            more
          </span>
        ) : null}
      </div>
    </CopyToClipboard>
  );
}
