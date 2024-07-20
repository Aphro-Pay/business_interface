import React, { useContext, useState } from "react";
import Header from "../../../components/Header";
import { arrowUp } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import styles from "./UploadYourLogo.module.css";
import RoundButton from "../../../components/RoundButton";
import Space from "../../../components/Space";
import { BusinessContext } from "../../../providers/BusinessProvider";

function UploadYourLogo() {
  const { business, setBusiness } = useContext(BusinessContext);
  const [logo, setLogo] = useState(business.logo);

  function handleLogoChange(e) {
    let img = e.target.files[0];
    let url = URL.createObjectURL(img);
    setLogo(img);
    business.updateLogo(img);
    setBusiness(business.clone());
  }

  function handleLogoClick(e) {
    document.getElementById("logo-input").click();
  }

  console.log(business);
  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Upload your logo"
          subText="Help clients recognise your business. Add a photo of your storefront, logo or team. You can always change this later."
        />
        <div className={styles.uploadImage} onClick={handleLogoClick}>
          {logo != null && logo != "" ? (
            <img
              src={URL.createObjectURL(logo)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className={styles.uploadImage}>
              <IonIcon
                icon={arrowUp}
                style={{ fontSize: "60px", color: "#879194" }}
              ></IonIcon>
              <span>Upload Image</span>
            </div>
          )}
        </div>
        <input
          type="file"
          id="logo-input"
          accept="image/*"
          onChange={handleLogoChange}
          style={{ display: "none" }}
        />
        <Space height="30px" />
        <RoundButton text="Continue" navigateTo="/business_hours" />
      </div>
    </IonPage>
  );
}

export default React.memo(UploadYourLogo);
