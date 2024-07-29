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
      let duration = document.getElementById("duration").value;
      const [hours, minutes] = duration.split(":");
      duration = { hours: hours, minutes: minutes };
      let notes = document.getElementById("notes").value;
      let newService = new Service(service, price, duration, notes);
      business.addService(newService);
      setBusiness(business.clone());
      history.goBack();
    }
  }

  function validateInput() {
    let service = document.getElementById("service").value;
    let duration = document.getElementById("duration").value;
    let price = document.getElementById("price").value;

    if (service === "") {
      alert("Please enter a valid service");
      return false;
    }

    if (price === "") {
      alert("Please enter a valid price");
      return false;
    }

    var pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!pattern.test(duration)) {
      alert("Please enter a valid duration");
      return false;
    }

    return true;
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Add Service" />
        <Input hintText="Manicure" label="Service" id="service" />
        <Input
          hintText="11,000"
          label="Price"
          id="price"
          prefix="&#8358;"
          type="number"
        />
        <Input hintText="HH:MM" label="Duration" id="duration" />
        <Input hintText="Acrylic" label="Notes" id="notes" />
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
    </IonPage>
  );
}

export default React.memo(AddServices);
