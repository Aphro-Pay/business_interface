import React from "react";
import FloatingButton from "./FloatingButton";
import {
  closeOutline,
  arrowBackOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import "../App.css";

function Header(prop) {
  return (
    <div>
      <div className="header">
        <FloatingButton
          icon={arrowBackOutline}
          vertical="top"
          horizontal="start"
        />
        <FloatingButton icon={closeOutline} vertical="top" horizontal="end" />
      </div>
      <div>
        <h2>{prop.mainText}</h2>
        <p>{prop.subText}</p>
      </div>
    </div>
  );
}

export default Header;
