import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  ShieldCheck,
  ArrowRight,
  Laptop,
  DeviceMobile,
  DeviceTabletIcon,
  User,
  Circle,
} from "@phosphor-icons/react"
import {
  USER_PROFILE,
  VAULT_HEALTH,
  ACTIVE_SESSIONS,
  type DeviceType,
} from "../constants"
import { useAuth } from "@/hooks/useAuth"

function DeviceIcon({ type }: { type: DeviceType }) {
  switch (type) {
    case "laptop":
      return <Laptop weight="fill" className="h-5 w-5 text-[#4534e1]" />
    case "phone":
      return <DeviceMobile weight="fill" className="h-5 w-5 text-slate-500" />
    case "tablet":
      return (
        <DeviceTabletIcon weight="fill" className="h-5 w-5 text-slate-500" />
      )
    default:
      return <Laptop weight="fill" className="h-5 w-5 text-slate-500" />
  }
}

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* ─── Header ───────────────────────────────────────────── */}
      <header className="border-b border-slate-200/60 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            SECURITY DASHBOARD
          </h1>
          <p className="mt-1 font-medium text-slate-500">
            Manage your active sessions and account security preferences.
          </p>
        </div>
      </header>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left Column - Profile & Vault Health */}
          <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[320px]">
            {/* Profile Card */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="relative mb-4">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-orange-100 text-orange-500 shadow-inner">
                  {/* Avatar Placeholder */}
                  <User weight="fill" className="h-12 w-12 text-orange-200" />
                  {/* Decorative circle based on design */}
                  <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400">
                      Your profile
                    </span>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#4534e1] text-white shadow-sm">
                  <ShieldCheck weight="fill" className="h-4 w-4" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>

              <div className="mt-8 flex w-full justify-between border-t border-slate-100 pt-6">
                <div className="flex flex-col items-center">
                  <span className="mb-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Status
                  </span>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#4534e1]">
                    {USER_PROFILE.status}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mb-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    MFA
                  </span>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                    {USER_PROFILE.mfa}
                  </span>
                </div>
              </div>
            </div>

            {/* Vault Health */}
            <div className="relative overflow-hidden rounded-2xl border-l-[3px] border-[#4534e1] bg-slate-50 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-widest text-slate-600 uppercase">
                  Vault Health
                </h3>
                <ShieldCheck weight="fill" className="h-5 w-5 text-[#4534e1]" />
              </div>

              <div className="mt-4 text-4xl font-extrabold text-[#4534e1]">
                {VAULT_HEALTH.score}
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                {VAULT_HEALTH.message}
              </p>

              <Link
                to="#"
                className="mt-6 flex items-center text-xs font-bold tracking-widest text-[#4534e1] uppercase hover:underline"
              >
                Security Audit{" "}
                <ArrowRight weight="bold" className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Right Column - Sessions & Geography */}
          <div className="flex w-full flex-col gap-6">
            {/* Active Sessions */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 p-6 sm:p-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Active Sessions
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Devices currently logged into your Authify account
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-indigo-50 font-bold tracking-wide text-[#4534e1] hover:bg-indigo-100"
                >
                  Refresh
                </Button>
              </div>

              <div className="flex flex-col">
                {ACTIVE_SESSIONS.map((session, index) => (
                  <div
                    key={session.id}
                    className={`flex items-center justify-between p-6 sm:px-8 ${index !== ACTIVE_SESSIONS.length - 1 ? "border-b border-slate-50" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 ${session.isCurrent ? "border-indigo-100 bg-indigo-50/50" : ""}`}
                      >
                        <DeviceIcon type={session.type} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">
                            {session.device}
                          </span>
                          {session.isCurrent && (
                            <span className="rounded bg-[#4534e1] px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-[13px] text-slate-500">
                          {session.browser} • {session.location} •{" "}
                          <span className="font-medium text-slate-800">
                            {session.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden text-xs font-bold tracking-widest text-red-500 uppercase hover:bg-red-50 hover:text-red-600 sm:flex"
                    >
                      Sign Out
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse justify-end gap-4 border-t border-slate-100 p-6 sm:flex-row sm:px-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 w-full border-slate-200 font-bold tracking-widest text-slate-600 uppercase sm:w-auto"
                >
                  Cancel all sessions
                </Button>
                <Button
                  size="lg"
                  className="h-12 w-full bg-[#4534e1] font-bold tracking-widest text-white uppercase shadow-md shadow-[#4534e1]/20 hover:bg-[#3b2cc2] sm:w-auto"
                >
                  Secure account now
                </Button>
              </div>
            </div>

            {/* Login Geography */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-base font-bold tracking-widest text-slate-900 uppercase">
                  Login Geography
                </h2>
                <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1">
                  <Circle
                    weight="fill"
                    className="h-2 w-2 animate-pulse text-[#4534e1]"
                  />
                  <span className="text-[11px] font-bold text-[#4534e1]">
                    Live Monitoring
                  </span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-slate-200/50">
                {/* Actual Map graphic mimicking the design */}
                <div
                  className="absolute inset-0 opacity-80 mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "url('data:image/svg+xml,%3Csvg width=\\'100%25\\' height=\\'100%25\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cdefs%3E%3Cpattern id=\\'a\\' patternUnits=\\'userSpaceOnUse\\' width=\\'20\\' height=\\'20\\'%3E%3Cpath d=\\'M0 20L20 0ZM20 20L0 0Z\\' stroke=\\'%2394a3b8\\' stroke-width=\\'0.5\\' fill=\\'none\\' opacity=\\'0.3\\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'url(%23a)\\'/%3E%3C/svg%3E')",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-300 to-indigo-100 opacity-60"></div>

                {/* Map Points/Pins */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 800 400"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* Connecting lines */}
                  <path
                    d="M 200 150 L 580 150 L 300 280 Z"
                    fill="none"
                    stroke="#fcd34d"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="opacity-70"
                  />

                  {/* Dark Dot Central */}
                  <circle cx="280" cy="140" r="8" fill="#4534e1" />

                  {/* Yellow Pin 1 */}
                  <path
                    d="M 200 150 C 200 150 180 110 200 90 C 220 70 240 100 200 150 Z"
                    fill="#fde68a"
                  />
                  <circle cx="200" cy="110" r="15" fill="#fcd34d" />
                  <circle cx="200" cy="110" r="6" fill="#f59e0b" />

                  {/* Yellow Pin 2 */}
                  <path
                    d="M 580 150 C 580 150 560 110 580 90 C 600 70 620 100 580 150 Z"
                    fill="#fde68a"
                  />
                  <circle cx="580" cy="110" r="15" fill="#fcd34d" />
                  <circle cx="580" cy="110" r="6" fill="#f59e0b" />

                  {/* Yellow Pin 3 */}
                  <path
                    d="M 300 280 C 300 280 280 240 300 220 C 320 200 340 230 300 280 Z"
                    fill="#fde68a"
                  />
                  <circle cx="300" cy="240" r="15" fill="#fcd34d" />
                  <circle cx="300" cy="240" r="6" fill="#f59e0b" />

                  {/* Faded dot */}
                  <circle cx="650" cy="220" r="6" fill="#94a3b8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
