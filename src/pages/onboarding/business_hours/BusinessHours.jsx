import React, { useContext } from "react";
import Header from "../../../components/Header";
import { arrowForward } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import styles from "./BusinessHours.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { AuthContext } from "../../../providers/AuthProvider";

function BusinessHours() {
  const { business } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const businessHours = business.getInfo().businessHours;

  const editHours = (e) => {
    user
      ? history.push(`/tabs/opening_hours/${e.target.id}`)
      : history.push(`/opening_hours/${e.target.id}`);
  };
  return (
    <div className={styles.scaffold}>
      <Header
        mainText="Business hours"
        subText="Set your business hours and let clients know when you are available. You can always change this later."
        type={user ? "tabView" : null}
        enableBackButton={user ? "y" : null}
        goBack={
          user
            ? () => {
                history.replace("/tabs/settings");
              }
            : null
        }
      />
      {Object.entries(businessHours).map(([day, hours]) => (
        <div className={styles.flexRow} key={day}>
          <div style={{ display: "inline-block" }}>
            <div className={styles.day}>{day}</div>
            {hours.Status === "Open" ? (
              <div className={styles.time}>
                {hours.Open} - {hours.Close}
              </div>
            ) : (
              <div className={styles.time}>{hours.Status}</div>
            )}
          </div>

          <Space width="100%"></Space>
          <IonIcon
            id={day}
            icon={arrowForward}
            style={{ fontSize: "40px", color: "#879194" }}
            onClick={editHours}
          ></IonIcon>
        </div>
      ))}
      {user ? null : (
        <RoundButton text="Continue" navigateTo="/staff_management" />
      )}
    </div>
  );
}

export default BusinessHours;
