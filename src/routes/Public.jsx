import { IonRouterOutlet } from "@ionic/react";
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../providers/AuthProvider";

function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

  console.log("Public");

  return user ? <Redirect to="/" /> : children;
}

export default PublicRoute;
