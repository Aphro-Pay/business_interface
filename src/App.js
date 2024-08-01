import "./App.css";
import "@ionic/react/css/core.css";
import React, { useContext } from "react";

import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import Splash from "./pages/Splash";
import LogIn from "./pages/authentication/log_in/LogIn";
import VerifyOTP from "./pages/authentication/verify_otp/VerifyOTP";
import EnterMobileNumber from "./pages/authentication/enter_mobile_number/EnterMobileNumber";
import Success from "./pages/Success";
import CreateYourLoginDetails from "./pages/onboarding/create_your_login_details/CreateYourLoginDetails";
import SetUpYourBusinessProfile from "./pages/onboarding/set_up_your_business_profile/SetUpYourBusinessProfile";
import UploadYourLogo from "./pages/onboarding/upload_your_logo/UploadYourLogo";
import BusinessHours from "./pages/onboarding/business_hours/BusinessHours";
import YourServices from "./pages/onboarding/your_services/YourServices";
import StaffManagement from "./pages/onboarding/staff_management/StaffManagement";
import AddStaffName from "./pages/onboarding/staff_management/AddStaffName";
import OpeningHours from "./pages/onboarding/business_hours/OpeningHours";
import Home from "./pages/tabs/home/Home";
import Tabs from "./pages/tabs/Tabs";
import AddBooking from "./pages/tabs/bookings/AddBooking";
import TransactionDetails from "./pages/tabs/payments/TransactionDetails";

import { setupIonicReact } from "@ionic/react";
import { useState } from "react";
import Business, { Staff } from "./models/Business";
import AddServices from "./pages/onboarding/your_services/AddServices";
import { AuthContext } from "./providers/AuthProvider";
import PrivateRoute from "./routes/Private";
import PublicRoute from "./routes/Public";
import AddStaffPrice from "./pages/onboarding/your_services/AddStaffPrice";

setupIonicReact();

function App() {
  const [newBusiness, setNewBusiness] = useState(new Business());
  const { loding, user } = useContext(AuthContext);
  const [staff, setStaff] = useState([]);

  const addStaffPrice = (staffName, staffPrice) => {
    console.log("hello");
    setStaff(staff.concat([new Staff(staffName, staffPrice).toMap()]));
    console.log(staff);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/*" exact={true}>
          <PublicRoute>
            <IonRouterOutlet>
              <Route path="/splash" exact={true}>
                <Splash />
              </Route>
              {/*<Redirect from="/" to="/splash" exact />*/}
              <Route path="/login" exact={true}>
                <LogIn />
              </Route>
              <Route path="/enter_mobile_number" exact={true}>
                <EnterMobileNumber />
              </Route>
              <Route path="/verify_otp" exact={true}>
                <VerifyOTP />
              </Route>
              <Route path="/success/:state" exact={true}>
                <Success />
              </Route>
              <Route path="/create_your_login_details" exact={true}>
                <CreateYourLoginDetails />
              </Route>
            </IonRouterOutlet>
          </PublicRoute>
        </Route>

        <Route path="/set_up_your_business_profile" exact={true}>
          <SetUpYourBusinessProfile />
        </Route>
        <Route path="/upload_your_logo" exact={true}>
          <UploadYourLogo />
        </Route>

        <Route
          path="/business_hours"
          component={BusinessHours}
          exact={true}
        ></Route>

        <Route
          path="/your_services"
          component={YourServices}
          exact={true}
        ></Route>

        <Route path="/add_service" exact={true}>
          <AddServices setStaff={setStaff} staff={staff} />
        </Route>

        <Route
          path="/staff_management"
          component={StaffManagement}
          exact={true}
        ></Route>

        <Route path="/add_staff_name" exact={true}>
          <AddStaffName />
        </Route>

        <Route path="/add_staff_price" exact={true}>
          <AddStaffPrice addStaffPrice={addStaffPrice} />
        </Route>

        <Route path="/opening_hours/:state" exact={true}>
          <OpeningHours />
        </Route>

        <Route path="/" exact={true}>
          <PrivateRoute>
            <IonReactRouter>
              <Route path="/tabs/:id">
                <Tabs />
              </Route>
              <Redirect from="/tabs" to="/tabs/home" exact={true} />
            </IonReactRouter>
          </PrivateRoute>
        </Route>
      </IonReactRouter>
    </IonApp>
    /* <div className="App">
      
      <Success />
    </div><div className="App">
      <header className="App-header">
        <img
          src="./assets/images/aphro_pay_logo.jpg"
          className="App-logo"
          alt="logo"
        />
      </header>
    </div>*/
  );
}

export default React.memo(App);
