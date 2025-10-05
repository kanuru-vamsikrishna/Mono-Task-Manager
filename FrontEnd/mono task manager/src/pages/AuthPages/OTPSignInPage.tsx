import { useForm } from "react-hook-form";
import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
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

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 characters").max(6),
});

type OtpForm = z.infer<typeof otpSchema>;

export default function OTPSignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpForm>({
    // resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OtpForm) => {
    console.log("OTP verification request", data);
    // API call to verify OTP
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Check your email
          </CardTitle>
          <CardDescription className="text-gray-500">
            We've sent a one-time password to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input id="otp" placeholder="••••••" {...register("otp")} />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <p className="text-gray-600">
            Didn't receive the code?{" "}
            <button className="text-blue-600 font-medium hover:underline focus:outline-none">
              Resend
            </button>
          </p>
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </CardFooter>
    </Card>
    </div>
  );
}