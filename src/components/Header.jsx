import React from "react";
import FloatingButton from "./FloatingButton";
import {
  closeOutline,
  arrowBackOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import "../App.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Header(prop) {
  const history = useHistory();
  return prop.type == "tabView" ? (
    <div>
      <div className="header">
        {prop.enableBackButton == "y" && (
          <FloatingButton
            icon={arrowBackOutline}
            vertical="top"
            horizontal="start"
            onClick={history.goBack}
          />
        )}
        {prop.enableIcon == "y" && (
          <FloatingButton
            icon={prop.icon}
            vertical="top"
            horizontal="end"
            onClick={prop.onClick}
          />
        )}
      </div>
      <div>
        <h2>{prop.mainText}</h2>
      </div>
    </div>
  ) : (
    <div>
      <div className="header">
        <FloatingButton
          icon={arrowBackOutline}
          vertical="top"
          horizontal="start"
          onClick={history.goBack}
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
