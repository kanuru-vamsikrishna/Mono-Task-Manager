// src/pages/auth/LoginPage.tsx
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginSchema = z.object({
  identifier: z.string().min(5, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  // const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login request", data);
    // call API → then dispatch(loginSuccess({ user, token }))
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80">
        <input {...register("identifier")} placeholder="Email or phone" className="border p-2" />
        {errors.identifier && <p className="text-red-500">{errors.identifier.message}</p>}

        <input type="password" {...register("password")} placeholder="Password" className="border p-2" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
