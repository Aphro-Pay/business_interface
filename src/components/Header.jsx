import React, { useContext } from "react";
import FloatingButton from "./FloatingButton";
import { closeOutline, arrowBackOutline } from "ionicons/icons";
import "../App.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BusinessContext } from "../providers/BusinessProvider";
import Business from "../models/Business";

function Header(prop) {
  const { setBusiness } = useContext(BusinessContext);
  const history = useHistory();
  return prop.type === "tabView" ? (
    <div style={{ marginTop: prop.marginTop ?? "30px" }}>
      <div className="header">
        {prop.enableBackButton === "y" && (
          <FloatingButton
            icon={arrowBackOutline}
            vertical="top"
            horizontal="start"
            onClick={prop.goBack ?? history.goBack}
          />
        )}
        {prop.enableIcon === "y" && (
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
      <div className="header" style={{ marginTop: prop.marginTop ?? "70px" }}>
        {prop.enableBackButton === "n" ? null : (
          <FloatingButton
            icon={arrowBackOutline}
            vertical="top"
            horizontal="start"
            onClick={() => {
              prop.onClick?.();
              history.goBack();
            }}
          />
        )}
        <FloatingButton
          icon={closeOutline}
          vertical="top"
          horizontal="end"
          onClick={() => {
            history.push("/");
            localStorage.clear();
            setBusiness(new Business());
          }}
        />
      </div>
      <div>
        <h2>{prop.mainText}</h2>
        <p>{prop.subText}</p>
      </div>
    </div>
  );
}

export default Header;
