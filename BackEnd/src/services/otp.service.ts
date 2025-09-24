// import nodemailer from "nodemailer";
// For SMS: import Twilio or another provider

export const sendOtpEmail = async (email: string, otp: string) => {
  console.log(`Sending OTP ${otp} to phone ${email}`);
};

export const sendOtpSms = async (phone: string, otp: string) => {
  // Example Twilio call
  console.log(`Sending OTP ${otp} to phone ${phone}`);
};
