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

// ─── Session Page ───────────────────────────────────────────

export interface DetailedSession {
  id: string
  browser: string
  os: string
  isCurrent: boolean
  ip: string
  location: string
  time: string
  type: DeviceType
}

export const SESSION_DEVICES: DetailedSession[] = [
  {
    id: "s1",
    browser: "Chrome",
    os: "macOS",
    isCurrent: true,
    ip: "192.168.1.1",
    location: "London, UK",
    time: "Active now",
    type: "laptop",
  },
  {
    id: "s2",
    browser: "Safari",
    os: "iPhone 15 Pro",
    isCurrent: false,
    ip: "82.44.12.91",
    location: "Manchester, UK",
    time: "2 hours ago",
    type: "phone",
  },
  {
    id: "s3",
    browser: "Edge",
    os: "Windows 11",
    isCurrent: false,
    ip: "212.58.244.70",
    location: "Berlin, Germany",
    time: "Last active 3 days ago",
    type: "laptop",
  },
  {
    id: "s4",
    browser: "Firefox",
    os: "Samsung Galaxy Tab",
    isCurrent: false,
    ip: "103.25.122.1",
    location: "Paris, France",
    time: "Last active Dec 12, 2023",
    type: "tablet",
  },
]

export const SESSION_SIDEBAR = [
  { label: "Active Devices", icon: "devices", active: true },
  { label: "Access Logs", icon: "logs", active: false },
  { label: "Security Keys", icon: "keys", active: false },
] as const
