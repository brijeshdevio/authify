import { createContext, type ReactNode } from "react"
import { useUser } from "@/hooks/useUser"
import type { User } from "@/types/user"

type AuthContext = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
}

export const AuthContext = createContext<AuthContext>(initialState)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, isSuccess } = useUser()
  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading: isPending,
        isAuthenticated: isSuccess && !!data,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
