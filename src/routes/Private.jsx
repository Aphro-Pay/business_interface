import React, { useContext } from "react";
import { useHistory, Outlet } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// import PrivateLayout from "Layouts/Private";
import { AuthContext } from "../providers/AuthProvider";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  console.log("Private");

  return user ? children : <Redirect to="/splash" />;
}

export default PrivateRoute;
