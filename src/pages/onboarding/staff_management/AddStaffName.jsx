import React, { useContext, useState } from "react";
import Input from "../../../components/Input";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { AuthContext } from "../../../providers/AuthProvider";
import { IonPage } from "@ionic/react";

function AddStaffName() {
  const { business, setBusiness } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const history = useHistory();

  function handleOnClickSave() {
    if (validateInput()) {
      business.addStaff(name);
      setBusiness(business.clone());
      user ? history.replace("/tabs/staff_management") : history.goBack();
    }
  }

  function handleNameChange(event) {
    const { value } = event.target;
    setName(value);
  }

  function validateInput() {
    if (name === "") {
      alert("Please enter a valid input");
      return false;
    }

    return true;
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Staff management"
          type={user ? "tabView" : null}
          enableBackButton={user ? "y" : null}
          goBack={
            user
              ? () => {
                  history.replace("/tabs/staff_management");
                }
              : null
          }
        />
        <Input
          hintText="Ahmed"
          label="Name"
          id="name"
          name="name"
          onChange={handleNameChange}
        />
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
    </IonPage>
  );
}

export default React.memo(AddStaffName);
