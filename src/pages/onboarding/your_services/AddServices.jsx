import { IonPage } from "@ionic/react";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import { Service } from "../../../models/Business";
import { BusinessContext } from "../../../providers/BusinessProvider";

function AddServices() {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();

  function handleOnClickSave() {
    if (validateInput()) {
      let service = document.getElementById("service").value;
      let price = document.getElementById("price").value;
      let notes = document.getElementById("notes").value;
      let newService = new Service(service, price, notes);
      business.addService(newService);
      setBusiness(business.clone());
      history.goBack();
    }
  }

  function validateInput() {
    let service = document.getElementById("service").value;

    if (service === "") {
      alert("Please enter a valid input");
      return false;
    }

    return true;
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Add Service" />
        <Input hintText="Manicure" label="Service" id="service" />
        <Input hintText="N11,000" label="Price" id="price" />
        <Input hintText="Acrylic" label="Notes" id="notes" />
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
    </IonPage>
  );
}

export default React.memo(AddServices);
