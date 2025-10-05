import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/AuthPages/SignUpPage";
import SignInPage from "../pages/AuthPages/SignInPage";
import ForgotPasswordPage from "../pages/AuthPages/ForgotPassword";
import OtpSignInPage from "../pages/AuthPages/OTPSignInPage";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp-login" element={<OtpSignInPage />} />
    </Routes>
  );
};

export default AuthRoutes;
