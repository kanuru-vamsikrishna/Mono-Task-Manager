import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
// import DashboardPage from "../pages/DashboardPage";
// import UnauthorizedPage from "../pages/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      {AuthRoutes}

      {/* Protected routes */}
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      /> */}

      {/* Unauthorized */}
      {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
