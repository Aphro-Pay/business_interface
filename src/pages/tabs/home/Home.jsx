import { IonPage, IonIcon, IonContent } from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import Header from "../../../components/Header";
import moment from "moment";
import {
  calendarNumberOutline,
  chevronDownOutline,
  copyOutline,
  addOutline,
} from "ionicons/icons";
import Space from "../../../components/Space";
import VerticalSwiper from "../../../components/VerticalSwiper";
import AppointmentCard from "../../../components/AppointmentCard";
import MetricsCard from "../../../components/MetricsCard";
import styles from "./Home.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../../providers/AuthProvider";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

function Home() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment().format("MMMM"));
  const [copied, setCopied] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const metricsData = {
    January: {
      earnings: "N420,500",
      clients: 45,
      earningsPercent: 2.5,
      clientsPercent: -3.2,
    },
    February: {
      earnings: "N445,200",
      clients: 48,
      earningsPercent: 5.8,
      clientsPercent: 6.7,
    },
    March: {
      earnings: "N460,800",
      clients: 50,
      earningsPercent: 3.5,
      clientsPercent: 4.2,
    },
    April: {
      earnings: "N472,300",
      clients: 49,
      earningsPercent: 2.5,
      clientsPercent: -2.0,
    },
    May: {
      earnings: "N485,600",
      clients: 51,
      earningsPercent: 2.8,
      clientsPercent: 4.1,
    },
    June: {
      earnings: "N492,400",
      clients: 50,
      earningsPercent: 1.4,
      clientsPercent: -2.0,
    },
    July: {
      earnings: "N488,200",
      clients: 52,
      earningsPercent: -0.9,
      clientsPercent: 4.0,
    },
    August: {
      earnings: "N500,038",
      clients: 53,
      earningsPercent: 4.0,
      clientsPercent: -7.5,
    },
    September: {
      earnings: "N478,900",
      clients: 47,
      earningsPercent: -4.2,
      clientsPercent: -11.3,
    },
    October: {
      earnings: "N482,600",
      clients: 49,
      earningsPercent: 0.8,
      clientsPercent: 4.3,
    },
    November: {
      earnings: "N490,300",
      clients: 51,
      earningsPercent: 1.6,
      clientsPercent: 4.1,
    },
    December: {
      earnings: "N510,500",
      clients: 55,
      earningsPercent: 4.1,
      clientsPercent: 7.8,
    },
  };

  const currentMetrics = metricsData[selectedMonth];

  const handleMonthClick = () => {
    setShowMonthPicker(!showMonthPicker);
  };

  const months = moment.months();

  useEffect(() => {
    const fetchTodayBookings = async () => {
      if (!user) return;

      try {
        const today = moment().startOf("day");
        const tomorrow = moment().add(1, "day").startOf("day");

        const bookingsRef = collection(db, "businesses", user.uid, "bookings");
        const q = query(
          bookingsRef,
          where("date", ">=", today.toDate()),
          where("date", "<", tomorrow.toDate()),
          orderBy("date", "asc")
        );

        const querySnapshot = await getDocs(q);
        const todayBookings = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            time: moment(data.date.toDate()).format("h:mm"),
            client: `${data.firstName} ${data.lastName}`,
            treatment: data.service.service,
            staff: data.staff,
            period: moment(data.date.toDate()).format("A"),
          };
        });

        setAppointments(todayBookings);
      } catch (error) {
        console.error("Error fetching today's bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayBookings();
  }, [user]);

  const handleCopyClick = () => {
    const url = `https://book-aphropay.web.app/${localStorage.getItem(
      "businessId"
    )}`;

    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);

    // Select the text
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    try {
      // Try using the Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      } else {
        // Fallback for older browsers
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    } finally {
      // Clean up
      document.body.removeChild(tempInput);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header
            type="tabView"
            mainText={[
              "Good Day,",
              <br key="break" />,
              " Hair Comes Trouble! 👋🏾",
            ]}
            marginTop="0px"
          />

          <div className="flexColumn">
            <div className="flexRow">
              <IonIcon icon={calendarNumberOutline}></IonIcon>
              <Space width="5px" />
              <span style={{ fontWeight: "600" }}>{moment().format("LL")}</span>
            </div>
            <Space height="10px" />
            <div className="flexRow">
              Share this link with your clients to book appointments:
            </div>
            <div
              className="flexRow"
              style={{ alignItems: "center", gap: "10px" }}
            >
              <a
                href={`https://book-aphropay.web.app/${localStorage.getItem(
                  "businessId"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007AFF", textDecoration: "none" }}
              >
                https://book-aphropay.web.app/
                {localStorage.getItem("businessId")}
              </a>
              <IonIcon
                icon={copyOutline}
                style={{ cursor: "pointer", color: "#007AFF" }}
                onClick={handleCopyClick}
              />
              {copied && (
                <span style={{ color: "#007AFF", fontSize: "12px" }}>
                  Copied!
                </span>
              )}
            </div>
            <h4 style={{ fontWeight: "500" }}>Upcoming appointments</h4>
            {appointments.length > 0 ? (
              <div
                style={{
                  height: "150px",
                  overflow: "hidden",
                }}
              >
                <VerticalSwiper>
                  {appointments.map((appointment, index) => (
                    <AppointmentCard
                      key={index}
                      {...appointment}
                      index={index}
                      total={appointments.length}
                    />
                  ))}
                </VerticalSwiper>
              </div>
            ) : (
              <div style={{ textAlign: "center", color: "#666" }}>
                👑 <br />
                Stay calm <br /> No appointments today
              </div>
            )}
            <Space height="20px" />
            {/*
            <div
              className="flexRow"
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h4 style={{ fontWeight: "500", margin: 0 }}>Metrics</h4>
              <div className={styles.monthSelector} onClick={handleMonthClick}>
                <span>{selectedMonth}</span>
                <IonIcon icon={chevronDownOutline} />
                {showMonthPicker && (
                  <div className={styles.monthDropdown}>
                    {months.map((month) => (
                      <div
                        key={month}
                        className={styles.monthOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMonth(month);
                          setShowMonthPicker(false);
                        }}
                      >
                        {month}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className="flexRow"
              style={{ gap: "15px", marginBottom: "20px" }}
            >
              <MetricsCard
                value={currentMetrics.earnings}
                label="Total Earnings"
                period={selectedMonth}
                percentage={currentMetrics.earningsPercent}
                isPositive={currentMetrics.earningsPercent > 0}
              />
              <MetricsCard
                value={currentMetrics.clients}
                label="New Clients"
                period={selectedMonth}
                percentage={Math.abs(currentMetrics.clientsPercent)}
                isPositive={currentMetrics.clientsPercent > 0}
              />
            </div>
            */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Home);
