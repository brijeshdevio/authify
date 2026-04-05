export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isVerified: boolean;
};

export type AuthContextT = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export type Device = "laptop" | "phone" | "tablet";

export interface Session {
  id: string;
  isCurrent: boolean;
  deviceName: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
  type: Device;
}
