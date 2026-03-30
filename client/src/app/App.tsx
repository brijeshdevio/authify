import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./Provider"
import { AppRoutes } from "./Router"
import { Toaster } from "sonner"

const queryClient = new QueryClient()

export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default App
