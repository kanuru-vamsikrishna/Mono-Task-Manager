// src/pages/auth/OtpLoginPage.tsx
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const otpSchema = z.object({
  identifier: z.string().min(5, "Email or phone required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type OtpForm = z.infer<typeof otpSchema>;

export default function OtpSignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<OtpForm>({
    // resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OtpForm) => {
    console.log("OTP login request", data);
    // API → verify OTP → dispatch loginSuccess
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Login with OTP</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80">
        <input {...register("identifier")} placeholder="Email or phone" className="border p-2" />
        {errors.identifier && <p className="text-red-500">{errors.identifier.message}</p>}

        <input {...register("otp")} placeholder="Enter OTP" className="border p-2" />
        {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}

        <button type="submit" className="bg-orange-600 text-white p-2 rounded">Verify OTP</button>
      </form>
    </div>
  );
}
