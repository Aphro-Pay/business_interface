import { IonPage, IonIcon } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import moment from "moment";
import VerticalSwiper from "../../../components/VerticalSwiper";
import BarChart from "../../../components/BarChart";
import { calendarNumberOutline } from "ionicons/icons";
import Space from "../../../components/Space";

function Home() {
  return (
    <IonPage>
      <div className="scaffold">
        <Header
          type="tabView"
          mainText={"Good Day, \n" + " Hair Comes Trouble!"}
        />
        <div className="flexColumn">
          <div className="flexRow">
            <IonIcon icon={calendarNumberOutline}></IonIcon>
            <Space width="5px" />
            <span style={{ fontWeight: "600" }}>{moment().format("LL")}</span>
          </div>
          <h3 style={{ fontWeight: "500" }}>Upcoming appointments</h3>
          <h4 style={{ fontWeight: "500" }}>Client count</h4>
          <BarChart />
          <h4 style={{ fontWeight: "500" }}>Revenue tracker</h4>
          <BarChart />
        </div>
      </div>
      <div className="barChart"></div>
    </IonPage>
  );
}

export default Home;
