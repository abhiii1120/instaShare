import api from "./axios.js";

export const registerUser = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await api.post(
    "/auth/refresh-token",
    {},
    {
      skipAuthRefresh: true,
    },
  );
  return res.data;
};
