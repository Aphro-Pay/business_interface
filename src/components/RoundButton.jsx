import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function RoundButton(prop) {
  const history = useHistory();

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        width: "100%",
      }}
    >
      <button
        className={"round-button " + prop.className}
        onClick={(e) => {
          prop.onClick != null && prop.onClick();
          prop.navigateTo != null &&
            history.push(prop.navigateTo, prop.dataToPass);
          e.preventDefault();
        }}
      >
        {prop.text}
      </button>
    </div>
  );
}

export default RoundButton;
