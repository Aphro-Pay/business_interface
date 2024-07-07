import React from "react";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import { IonPage } from "@ionic/react";

function SetUpYourBusinessProfile() {
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
        <Input label="Business name" />
        <Input label="Street address" />
        <Input label="City" />
        <Input label="Country" />
        <RoundButton text="Continue" navigateTo="/upload_your_logo" />
      </div>
    </IonPage>
  );
}

export default SetUpYourBusinessProfile;
