import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAuthenticated, isAdmin, ...rest }) => {
  const { path = "" } = rest;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (path.includes("add-") && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return element; // Return the element directly
};

export default ProtectedRoute;
