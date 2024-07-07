import React from "react";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import Space from "../../../components/Space";
import { IonPage } from "@ionic/react";

function CreateYourLoginDetails() {
  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Create your login details"
          subText={
            "Type in your email address  and set a password. \n" +
            " You can always change this later."
          }
        />
        <Input hintText="Email" />
        <Input hintText="7gy7y" />
        <Input hintText="&bull; &bull; &bull; &bull; &bull;" />
        <div>
          Your password must include: <br />
          &#10003; 8-32 characters long <br />
          &#10003; 1 lowercase character (a-z) <br />
          &#10003; 1 uppercase character (A-z) <br />
          &#10003; 1 number <br />
          &#10003; 1 special character e.g. ! @ # $ %
        </div>
        <Space height="50px" />
        <RoundButton
          text="Continue"
          navigateTo="/set_up_your_business_profile"
        />
      </div>
    </IonPage>
  );
}

export default CreateYourLoginDetails;
