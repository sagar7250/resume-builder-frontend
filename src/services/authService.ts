import api from "./api";
import { AuthResponse } from "../types";

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data.data;
  },

  register: async (firstName: string, lastName: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", { firstName, lastName, email, password });
    return response.data.data;
  },
};