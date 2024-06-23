import React from "react";
import "../SignIn.css";

function RoundButton(prop) {
  return (
    <button className={"round-button " + prop.className}>{prop.text}</button>
  );
}

export default RoundButton;
