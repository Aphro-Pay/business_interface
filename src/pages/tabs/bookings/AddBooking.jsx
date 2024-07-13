import { IonPage } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddBooking() {
  const history = useHistory();
  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Add Booking" type="tabView" enableBackButton="y" />
        <Input hintText="Ahmed" label="First name" />
        <Input hintText="Musa" label="Last name" />
        <Input hintText="08027176539" label="Phone number" />
        <Input hintText="Manicure (N10,000)" label="Service" />
        <Input hintText="Jennifer" label="Staff" />
        <RoundButton text="Submit" onClick={history.goBack} />
      </div>
    </IonPage>
  );
}

export default AddBooking;
