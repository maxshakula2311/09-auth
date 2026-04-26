import { User } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  cleanIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  cleanIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));