import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, refreshAccessToken, registerUser } from "../api/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useRefreshAccessToken = () => {
  return useQuery({
    queryKey: ["auth", "refreshToken"],
    queryFn: refreshAccessToken,
    retry: false,
  });
};
