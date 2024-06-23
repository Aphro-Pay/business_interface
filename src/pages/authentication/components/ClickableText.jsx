import React from "react";
import "../SignIn.css";

function ClickableText(prop) {
  return (
    <a href={prop.href} onClick={prop.onClick} className="clickable-text">
      {prop.text}
    </a>
  );
}

export default ClickableText;
