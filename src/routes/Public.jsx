import React, { useContext } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../providers/AuthProvider";

function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

  console.log("Public");

  return user ? <Redirect to="/" /> : children;
}

export default PublicRoute;
