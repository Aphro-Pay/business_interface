import { IonPage } from "@ionic/react";
import React from "react";
import Input from "../../../components/Input";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";

function OpeningHours(prop) {
  const history = useHistory();
  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Opening Hours" />
        <Input hintText="Monday" label="Day" />
        <Input hintText="Open" label="Status" />
        <Input hintText="10:00AM" label="Opening hours (e.g. 9:00AM)" />
        <Input hintText="6:00PM" label="Closing hours (e.g. 7:00PM)" />
        <RoundButton text="Save" onClick={history.goBack} />
      </div>
    </IonPage>
  );
}

export default OpeningHours;
