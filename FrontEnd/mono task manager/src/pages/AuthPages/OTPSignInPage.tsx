import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { RequestOtpInput, requestOtpSchema, VerifyOtpInput, verifyOtpSchema } from "../../../../../shared/auth/auth.schema";


export default function OTPSignInPage() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [identifier, setIdentifier] = useState<string>("");
  const [channel, setChannel] = useState<"email" | "sms">("email");

  // --- Request OTP Form Handlers and State ---
  const {
    register: requestRegister,
    handleSubmit: handleRequestSubmit,
    formState: { errors: requestErrors },
    watch: watchRequest,
  } = useForm<RequestOtpInput>({
    resolver: zodResolver(requestOtpSchema),
    defaultValues: {
      identifier: "",
      channel: "email",
    },
  });

  const selectedChannel = watchRequest("channel");

  const onRequestOtp = (data: RequestOtpInput) => {
    console.log("OTP request data:", data);
    // TODO: 1. API call to send OTP to the identifier (email/phone)
    // On success:
    setIdentifier(data.identifier);
    setChannel(data.channel);
    setIsOtpSent(true);
  };
  // -------------------------------------------

  // --- Verify OTP Form Handlers and State ---
  const {
    register: verifyRegister,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors },
  } = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const onVerifyOtp = (data: VerifyOtpInput) => {
    console.log("OTP verification request", { identifier, otp: data.otp });
    // TODO: 2. API call to verify OTP
    // On success, redirect the user or set their session
  };
  // ------------------------------------------

  const handleResend = () => {
      // Logic to resend OTP
      console.log(`Resending OTP to ${identifier} via ${channel}`);
      // TODO: 3. API call to resend OTP
  }

  // --- Render based on state ---
  if (isOtpSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Check your {channel}
            </CardTitle>
            <CardDescription className="text-gray-500">
              We've sent a one-time password to **{identifier}**.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifySubmit(onVerifyOtp)} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  placeholder="••••••"
                  {...verifyRegister("otp")}
                  maxLength={6}
                />
                {verifyErrors.otp && (
                  <p className="text-red-500 text-sm mt-1">
                    {verifyErrors.otp.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Verify
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 text-sm">
            <p className="text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-medium hover:underline focus:outline-none"
              >
                Resend
              </button>
            </p>
            <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="text-blue-600 font-medium hover:underline"
              >
                Change identifier
              </button>
            <Link
              to="/signin"
              className="text-blue-600 font-medium hover:underline"
            >
              Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // --- Request OTP View (Initial view) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Sign In with OTP
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter your email or phone number to receive a one-time password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRequestSubmit(onRequestOtp)} className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="identifier">Email or Phone Number</Label>
              <Input
                id="identifier"
                placeholder="email@example.com or 123-456-7890"
                {...requestRegister("identifier")}
              />
              {requestErrors.identifier && (
                <p className="text-red-500 text-sm mt-1">
                  {requestErrors.identifier.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Send via</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="channel-email"
                    value="email"
                    checked={selectedChannel === "email"}
                    {...requestRegister("channel")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Label htmlFor="channel-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="channel-sms"
                    value="sms"
                    checked={selectedChannel === "sms"}
                    {...requestRegister("channel")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Label htmlFor="channel-sms">SMS</Label>
                </div>
              </div>
              {requestErrors.channel && (
                <p className="text-red-500 text-sm mt-1">
                  {requestErrors.channel.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Send OTP
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Password Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}