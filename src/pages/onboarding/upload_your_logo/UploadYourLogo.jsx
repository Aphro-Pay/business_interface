import React, { useContext, useState } from "react";
import Header from "../../../components/Header";
import { arrowUp } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import styles from "./UploadYourLogo.module.css";
import RoundButton from "../../../components/RoundButton";
import Space from "../../../components/Space";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../../providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function UploadYourLogo() {
  const { business, setBusiness } = useContext(BusinessContext);
  const [isLogoChanged, setIsLogoChanged] = useState(false);
  const { user } = useContext(AuthContext);
  const [logo, setLogo] = useState(business.logo);
  const history = useHistory();

  function handleLogoChange(e) {
    let img = e.target.files[0];
    setLogo(img);

    setIsLogoChanged(true);
  }

  function handleLogoClick() {
    document.getElementById("logo-input").click();
  }

  return (
    <IonPage>
      <div className={styles.scaffold}>
        <Header
          mainText="Upload your logo"
          subText="Help clients recognise your business. Add a photo of your storefront, logo or team. You can always change this later."
          type={user ? "tabView" : null}
          enableBackButton={user ? "y" : null}
          goBack={
            user
              ? () => {
                  history.replace("/tabs/settings");
                }
              : null
          }
        />
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <div onClick={handleLogoClick}>
            {logo !== null && logo !== "" ? (
              <img
                src={
                  logo.type?.startsWith("image/")
                    ? URL.createObjectURL(logo)
                    : logo
                }
                alt="business logo"
                className={styles.img}
                style={{ objectFit: "cover" }}
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
        </div>

        <input
          type="file"
          id="logo-input"
          accept="image/*"
          onChange={handleLogoChange}
          style={{ display: "none" }}
        />
        <Space height="30px" />
        <RoundButton
          text="Continue"
          onClick={
            user
              ? async () => {
                  business.updateLogo(logo);
                  setBusiness(business.clone());
                  try {
                    if (isLogoChanged) {
                      const imageRef = ref(storage, `${user.id}/logo`);

                      const snapshot = await uploadBytes(imageRef, logo);
                      const url = await getDownloadURL(snapshot.ref);
                      business.updateLogo(url);
                      setBusiness(business.clone());
                      const docRef = doc(db, "businesses", user.uid); // Replace 'collectionName' with your collection name
                      await updateDoc(docRef, {
                        logo: url,
                      });
                    }
                    history.replace("/tabs/settings");
                  } catch (error) {
                    alert("Failed to update logo.");
                  }
                }
              : () => {
                  business.updateLogo(logo);
                  setBusiness(business.clone());
                  history.push("/business_hours");
                }
          }
        />
      </div>
      <Space height="50px" />
    </IonPage>
  );
}

export default React.memo(UploadYourLogo);
