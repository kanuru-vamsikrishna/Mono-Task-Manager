import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

interface LoginPayload {
  email: string;
  password: string;
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const response = await api.post("/auth/user/signIn", data);
      return response.data;
    },
  });
}
