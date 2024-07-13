import "./App.css";
import "@ionic/react/css/core.css";

import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
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

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet animated="false">
          <Route path="/splash" component={Splash} exact />
          <Redirect from="/" to="/splash" exact />
          <Route path="/login" component={LogIn} exact />
          <Route
            path="/enter_mobile_number"
            component={EnterMobileNumber}
            exact
          />
          <Route path="/verify_otp" component={VerifyOTP} exact />
          <Route path="/success/:state" component={Success} exact />
          <Route
            path="/create_your_login_details"
            component={CreateYourLoginDetails}
            exact
          />
          <Route
            path="/set_up_your_business_profile"
            component={SetUpYourBusinessProfile}
            exact
          />
          <Route path="/upload_your_logo" component={UploadYourLogo} exact />
          <Route path="/business_hours" component={BusinessHours} exact />
          <Route path="/your_services" component={YourServices} exact />
          <Route path="/staff_management" exact component={StaffManagement} />
          <Route path="/add_staff_name" component={AddStaffName} exact />
          <Route path="/opening_hours" component={OpeningHours} exact />

          <Route path="/tabs/:id" component={Tabs} exact />
          <Redirect from="/tabs" to="/tabs/home" exact />

          <Route exact path="/add_booking" component={AddBooking} />
          <Route
            exact
            path="/tabs/transaction_details"
            component={TransactionDetails}
          />
        </IonRouterOutlet>
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

export default App;
