import { IonPage } from "@ionic/react";
import React, { useContext, useState } from "react";
import Input from "../../../components/Input";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { BusinessContext } from "../../../providers/BusinessProvider";
import Space from "../../../components/Space";

function AddStaffPrice(prop) {
  const { business, setBusiness } = useContext(BusinessContext);
  const [selectedStaff, setSelectedStaff] = useState("Any");
  const history = useHistory();
  //const location = useLocation();
  //const { callback } = location.state;
  console.log(business.staff);

  function handleOnClickSave() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    prop.addStaffPrice(name, price);
    setBusiness(business.clone());
    history.goBack();
  }

  function handleStaffChange(e) {
    setSelectedStaff(e.target.value);
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Staff management" />
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
            fontSize: "14px",
          }}
        >
          <option key={-1} value={"Any"}>
            Any
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
