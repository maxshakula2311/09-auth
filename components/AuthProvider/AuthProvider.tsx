"use client";

import { useEffect } from "react";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const cleanIsAuthenticated = useAuthStore(
    (state) => state.cleanIsAuthenticated,
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const isOkay = await checkSession();
        if (isOkay) {
          const user = await getMe();
          if (user) {
            setUser(user);
          } else {
            cleanIsAuthenticated();
          }
        } else {
          cleanIsAuthenticated();
        }
      } catch (error) {
        cleanIsAuthenticated();
      }
    }
    fetchUser();
  }, [cleanIsAuthenticated, setUser]);
  return children;
};
export default AuthProvider;