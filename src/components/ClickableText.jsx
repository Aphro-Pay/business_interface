import React from "react";
import "../App.css";

function ClickableText(prop) {
  return (
    <a
      href={prop.href}
      onClick={prop.onClick}
      style={{ textDecoration: prop.textDecoration }}
      className="clickable-text"
    >
      {prop.text}
    </a>
  );
}

export default ClickableText;
