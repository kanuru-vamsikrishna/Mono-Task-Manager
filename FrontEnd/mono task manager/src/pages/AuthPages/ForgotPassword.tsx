// src/pages/auth/ForgotPasswordPage.tsx
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const forgotSchema = z.object({
  email: z.string().email("Valid email required"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>({
    // resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotForm) => {
    console.log("Forgot password request", data);
    // API call → backend sends reset link
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80">
        <input {...register("email")} placeholder="Enter your email" className="border p-2" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <button type="submit" className="bg-purple-600 text-white p-2 rounded">Send Reset Link</button>
      </form>
    </div>
  );
}
