import { useProfile } from "@/features/user/user.hooks";
import type { User } from "@/features/user/user.types";
import { createContext, type ReactNode } from "react";

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContext>(initialState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, isSuccess } = useProfile();

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        isLoading: isPending,
        isAuthenticated: isSuccess && !!data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
