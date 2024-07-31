import { IonPage } from "@ionic/react";
import React, { useContext } from "react";
import Input from "../../../components/Input";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { BusinessContext } from "../../../providers/BusinessProvider";

function AddStaffPrice(prop) {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();
  //const location = useLocation();
  //const { callback } = location.state;

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
        <Input
          hintText="11,000"
          label="Price"
          id="price"
          prefix="&#8358;"
          type="number"
        />
        /<RoundButton text="Save" />
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
    </IonPage>
  );
}

export default React.memo(AddStaffPrice);
