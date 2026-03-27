export const USER_PROFILE = {
  name: "Alex Rivera",
  email: "alex.r@authify.com",
  status: "Pro Tier",
  mfa: "Active",
  avatarUrl: "https://i.pravatar.cc/150?u=alex", // Placeholder or handled via UI fallback
}

export const VAULT_HEALTH = {
  score: "98%",
  message:
    "Your security settings are optimal. Two-factor authentication is protecting 3 connected services.",
}

export type DeviceType = "laptop" | "phone" | "tablet"

export interface Session {
  id: string
  device: string
  isCurrent: boolean
  browser: string
  location: string
  time: string
  type: DeviceType
}

export const ACTIVE_SESSIONS: Session[] = [
  {
    id: "1",
    device: 'MacBook Pro 14"',
    isCurrent: true,
    browser: "Chrome",
    location: "San Francisco, CA",
    time: "Active now",
    type: "laptop",
  },
  {
    id: "2",
    device: "iPhone 15 Pro",
    isCurrent: false,
    browser: "Authify App",
    location: "London, UK",
    time: "2 hours ago",
    type: "phone",
  },
  {
    id: "3",
    device: "iPad Air",
    isCurrent: false,
    browser: "Safari",
    location: "New York, NY",
    time: "Yesterday at 4:32 PM",
    type: "tablet",
  },
]
