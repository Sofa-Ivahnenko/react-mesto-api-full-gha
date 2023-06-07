import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ component: Component, ...props }) => {
  return props.isLogged ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRouteElement;
