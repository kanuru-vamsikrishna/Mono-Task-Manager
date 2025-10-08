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
import { ForgotPasswordInput, forgotPasswordSchema } from "../../../../../shared/auth/auth.schema";

export default function ForgotPasswordPage() {
  // --- State to manage the two views ---
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    // --- 2. Add Zod Resolver ---
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    console.log("Forgot password request for:", data.email);
    
    try {
        // TODO: Replace with your actual API call to send the reset link
        // Example: await yourApi.sendResetLink(data.email);

        // Simulate API delay/success
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        // --- 3. Update state on successful API response ---
        setSubmittedEmail(data.email);
        setEmailSent(true);

    } catch (error) {
        console.error("Error sending reset link:", error);
        // TODO: Handle error, maybe display a toast or error message on the form
    }
  };

  // --- 4. Render the Success View ---
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Check Your Email 📬
            </CardTitle>
            <CardDescription className="text-gray-500">
              We've sent a password reset link to **{submittedEmail}**. 
              Please check your inbox (and spam folder) to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/signin">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Back to Sign In
                </Button>
            </Link>
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
            <button 
                onClick={() => setEmailSent(false)}
                className="text-blue-600 font-medium hover:underline"
            >
              Didn't receive it? Try a different email
            </button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // --- 5. Render the Initial Form View (Your original code, updated) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Forgot your password?
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter your email to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button 
                type="submit" 
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
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