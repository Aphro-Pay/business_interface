import React, { useContext, useState } from "react";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import { IonPage, IonContent } from "@ionic/react";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../../providers/AuthProvider";
import styles from "./SetUpYourBusinessProfile.module.css";

function SetUpYourBusinessProfile(prop) {
  const { business, setBusiness } = useContext(BusinessContext);
  const [businessName, setBusinessName] = useState(business.businessName);
  const [streetAddress, setStreetAddress] = useState(business.streetAddress);
  const [city, setCity] = useState(business.city);
  const [country, setCountry] = useState(business.country);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  function handleInputChange(event) {
    const { value, name } = event.target;

    switch (name) {
      case "name":
        setBusinessName(value);
        break;
      case "street":
        setStreetAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "country":
        setCountry(value);
        break;

      default:
        break;
    }
  }

  function validateInput() {
    if (businessName === "") {
      alert("Please enter your business name");
      return false;
    }

    return true;
  }

  async function navigate() {
    if (validateInput()) {
      business.updateBusinessName(businessName);
      business.updateStreetAddress(streetAddress);
      business.updateCity(city);
      business.updateCountry(country);
      setBusiness(business.clone());
      if (user) {
        try {
          const docRef = doc(db, "businesses", user.uid); // Replace 'collectionName' with your collection name
          await updateDoc(docRef, {
            businessName: businessName,
            streetAddress: streetAddress,
            city: city,
            country: country,
          });
          history.replace("/tabs/settings");
        } catch (error) {
          console.error("Error updating profile: ", error);
          alert("Failed to update business profile.");
        }
      } else {
        history.push("/upload_your_logo");
      }
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className={styles.scaffold}>
          <Header
            mainText="Set up your business profile"
            subText={
              "Fill in the details below which will be visible to clients. \n" +
              "\n You can always change these later."
            }
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
          <Input
            label="Business name"
            id="Business name"
            name="name"
            onChange={handleInputChange}
            defaultValue={businessName}
          />
          <Input
            label="Street address"
            id="Street address"
            name="street"
            onChange={handleInputChange}
            defaultValue={streetAddress}
          />
          <Input
            label="City"
            id="City"
            name="city"
            onChange={handleInputChange}
            defaultValue={city}
          />
          <Input
            label="Country"
            id="Country"
            name="country"
            onChange={handleInputChange}
            defaultValue={country}
          />
          <RoundButton text="Continue" onClick={navigate} />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(SetUpYourBusinessProfile);
