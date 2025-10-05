// src/pages/auth/SignupPage.tsx
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    // resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupForm) => {
    console.log("Signup request", data);
    // API call → dispatch loginSuccess
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80">
        <input {...register("email")} placeholder="Email" className="border p-2" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input type="password" {...register("password")} placeholder="Password" className="border p-2" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="bg-green-600 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
}
