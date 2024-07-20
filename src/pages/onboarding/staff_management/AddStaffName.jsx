import { IonPage } from "@ionic/react";
import React, { useContext } from "react";
import Input from "../../../components/Input";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { BusinessContext } from "../../../providers/BusinessProvider";

function AddStaffName() {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();

  function handleOnClickSave() {
    let name = document.getElementById("name").value;
    business.addStaff(name);
    setBusiness(business.clone());
    history.goBack();
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Staff management" />
        <Input hintText="Ahmed" label="Name" id="name" />
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
    </IonPage>
  );
}

export default React.memo(AddStaffName);
