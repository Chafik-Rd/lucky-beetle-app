import { create } from "zustand";
import { UserStateType } from "../types/auth.type";

export const useUserStore = create<UserStateType>((set) => ({
  isAuthenticated: false,
  role: "guest",

  setAuthState: (isAuthenticated, role) =>
    set({
      isAuthenticated: isAuthenticated,
      role: role,
    }),
}));
