import { IonPage } from "@ionic/react";
import React, { useContext, useState } from "react";
import Input from "../../../components/Input";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { BusinessContext } from "../../../providers/BusinessProvider";
import Space from "../../../components/Space";
import { AuthContext } from "../../../providers/AuthProvider";

function AddStaffPrice(prop) {
  const { business, setBusiness } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);
  const [selectedStaff, setSelectedStaff] = useState("All Staff");
  const history = useHistory();

  function handleOnClickSave() {
    if (validateInput()) {
      let name = document.getElementById("name").value;
      let price = document.getElementById("price").value;
      prop.addStaffPrice(name, price);
      setBusiness(business.clone());
      user ? history.replace("/tabs/add_service") : history.goBack();
    }
  }

  function handleStaffChange(e) {
    setSelectedStaff(e.target.value);
  }

  function validateInput() {
    let price = document.getElementById("price").value;

    if (price === "") {
      alert("Please enter a valid price");
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
                  history.replace("/tabs/add_service");
                }
              : null
          }
        />
        <label className="input-label" htmlFor="status">
          Name
        </label>
        <Space height="5px" />
        <select
          value={selectedStaff}
          onChange={handleStaffChange}
          id="name"
          style={{
            border: "1.5px solid #c0c0c0",
            borderRadius: "5px",
            marginBottom: "20px",
            padding: "15px 5px",
            fontSize: "15px",
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            backgroundColor: "#e5edf5",
          }}
        >
          <option key={-1} value={"All Staff"}>
            All Staff
          </option>
          {business.staff.map((staff, index) => (
            <option key={index} value={staff}>
              {staff}
            </option>
          ))}
        </select>
        <Input
          hintText="11,000"
          label="Price"
          id="price"
          prefix="&#8358;"
          type="number"
        />
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
    </IonPage>
  );
}

export default React.memo(AddStaffPrice);
