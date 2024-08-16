import { IonPage, IonIcon, IonContent } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import moment from "moment";
import { calendarNumberOutline } from "ionicons/icons";
import Space from "../../../components/Space";
import ComingSoon from "../../../components/ComingSoon";
import VerticalSwiper from "../../../components/VerticalSwiper/VerticalSwiper";
import styles from "./Home.module.css";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Home() {
  const data = [
    { name: "Mon", Attended: 4000, Cancellations: 2400 },
    { name: "Tue", Attended: 3000, Cancellations: 1398 },
    { name: "Wed", Attended: 2000, Cancellations: 9800 },
    { name: "Thu", Attended: 2780, Cancellations: 3908 },
    { name: "Fri", Attended: 1890, Cancellations: 4800 },
    { name: "Sat", Attended: 2390, Cancellations: 3800 },
  ];

  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header
            type="tabView"
            mainText={["Good Day,", <br />, " Hair Comes Trouble! 👋🏾"]}
          />
          <div className="flexColumn">
            <div className="flexRow">
              <IonIcon icon={calendarNumberOutline}></IonIcon>
              <Space width="5px" />
              <span style={{ fontWeight: "600" }}>{moment().format("LL")}</span>
            </div>
            <h3 style={{ fontWeight: "500" }}>Upcoming appointments</h3>
            <div style={{ height: "200px" }} className={styles.swiper}>
              <VerticalSwiper />
            </div>
            <h4 style={{ fontWeight: "500" }}>Metrics</h4>
            <div className="flexRow" style={{ color: "white" }}>
              <div
                className="flexColumn"
                style={{
                  backgroundColor: "#004096",
                  width: "48%",
                  borderRadius: "20px",
                  padding: "20px",
                  minHeight: "150px",
                }}
              >
                <div>
                  <IoMdArrowUp />
                </div>
                <span style={{ fontSize: "20px" }}>N500, 038</span>
                <Space height="5px" />
                <span style={{ fontSize: "16px" }}>Total Earnings</span>
                <span style={{ fontSize: "16px" }}>(August)</span>
                <Space height="5px" />
                <span style={{ fontSize: "10px" }}>+4%</span>
              </div>
              <Space flexGrow="1" />
              <div
                className="flexColumn"
                style={{
                  backgroundColor: "#004096",
                  width: "48%",
                  borderRadius: "20px",
                  padding: "20px",
                  minHeight: "150px",
                }}
              >
                <div>
                  <IoMdArrowDown />
                </div>
                <span style={{ fontSize: "20px" }}>53</span>
                <Space height="5px" />
                <span style={{ fontSize: "16px" }}>New Clients</span>
                <span style={{ fontSize: "16px" }}>(August)</span>
                <Space height="5px" />
                <span style={{ fontSize: "10px" }}>-7.5%</span>
              </div>
            </div>

            <h4 style={{ fontWeight: "500" }}>Visitors Report</h4>
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  {/* <YAxis /> is omitted to disable the y-axis */}
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Attended" fill="#147C52" />
                  <Bar dataKey="Cancellations" fill="#D54F3D" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Home);
