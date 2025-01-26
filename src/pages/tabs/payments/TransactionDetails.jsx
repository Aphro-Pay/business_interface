import React from "react";
import Header from "../../../components/Header";
import { IonContent, IonPage } from "@ionic/react";
import styles from "./Payments.module.css";
import Space from "../../../components/Space";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TransactionDetails() {
  const history = useHistory();
  const details = [
    { id: 1, left: "Transation ID", right: "KYC192DSSAX" },
    { id: 2, left: "Amount", right: "N30,000" },
    { id: 3, left: "Date", right: "17 July 2024" },
    { id: 4, left: "Name", right: "Wasiu Ayinde II" },
    { id: 5, left: "Channel", right: "USSD" },
  ];
  return (
    <IonPage>
      <IonContent>
        <div className={styles.scaffold}>
          <Header
            mainText="Transaction details"
            type="tabView"
            enableBackButton="y"
            goBack={() => {
              history.replace("/tabs/payments");
            }}
            marginTop="30px"
          />
          {details.map((detail) => (
            <div className={styles.flexColumn} key={detail.id}>
              <Space height="15px" />
              <div className={styles.flexRow}>
                <div style={{ display: "inline-block" }}>
                  <div className={styles.detail}>{detail.left}</div>
                </div>
                <Space width="100%"></Space>
                <div className={styles.detail}>{detail.right}</div>
              </div>
              <Space height="15px" />
              <hr style={{ width: "100%", color: "#879194" }} />
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(TransactionDetails);
