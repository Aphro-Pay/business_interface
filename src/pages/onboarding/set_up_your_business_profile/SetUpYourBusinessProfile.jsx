import React, { useContext } from "react";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import { IonPage } from "@ionic/react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SetUpYourBusinessProfile(prop) {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();

  console.log(business);

  function handleInputChange(event) {
    const { value, name } = event.target;
    console.log(name);

    switch (name) {
      case "name":
        business.updateBusinessName(value);
        break;
      case "street":
        business.updateStreetAddress(value);
        break;
      case "city":
        business.updateCity(value);
        break;
      case "country":
        business.updateCountry(value);
        break;

      default:
        break;
    }

    setBusiness(business.clone());
  }

  function validateInput() {
    if (business.getInfo().businessName === "") {
      alert("Please enter a valid input");
      return false;
    }

    return true;
  }

  function navigate() {
    if (validateInput()) {
      history.push("/upload_your_logo");
    }
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Set up your business profile"
          subText={
            "Fill in the details below which will be visible to clients. \n" +
            "\n You can always change these later."
          }
        />
        <Input
          label="Business name"
          id="Business name"
          name="name"
          onChange={handleInputChange}
          defaultValue={business.getInfo().businessName}
        />
        <Input
          label="Street address"
          id="Street address"
          name="street"
          onChange={handleInputChange}
        />
        <Input
          label="City"
          id="City"
          name="city"
          onChange={handleInputChange}
        />
        <Input
          label="Country"
          id="Country"
          name="country"
          onChange={handleInputChange}
        />
        <RoundButton text="Continue" onClick={navigate} />
      </div>
    </IonPage>
  );
}

export default React.memo(SetUpYourBusinessProfile);
