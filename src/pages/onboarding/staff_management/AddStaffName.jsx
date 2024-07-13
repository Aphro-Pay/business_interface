import { IonPage } from "@ionic/react";
import React from "react";
import Input from "../../../components/Input";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";

function AddStaffName() {
  const history = useHistory();
  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Staff management" />
        <Input hintText="Ahmed" label="Name" />
        <RoundButton text="Save" onClick={history.goBack} />
      </div>
    </IonPage>
  );
}

export default AddStaffName;
