import { useProfile } from "@/features/protect/protect.hooks";
import type { AuthContextT } from "@/types";
import { createContext, type ReactNode } from "react";

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextT>(initialState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, isSuccess } = useProfile();

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
        isAuthenticated: isSuccess,
        isLoading: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
