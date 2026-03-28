import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Laptop,
  DeviceMobile,
  DeviceTablet,
  Globe,
  ClockCounterClockwise,
  ShieldCheck,
  X,
  WarningCircle,
} from "@phosphor-icons/react"
import {
  SESSION_DEVICES,
  SESSION_SIDEBAR,
  type DeviceType,
} from "../constants"

function DeviceIcon({ type, current }: { type: DeviceType; current: boolean }) {
  const cls = `h-5 w-5 ${current ? "text-[#4534e1]" : "text-slate-500"}`
  switch (type) {
    case "laptop":
      return <Laptop weight="fill" className={cls} />
    case "phone":
      return <DeviceMobile weight="fill" className={cls} />
    case "tablet":
      return <DeviceTablet weight="fill" className={cls} />
  }
}

function SidebarIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "devices":
      return <Laptop weight="fill" className="h-4 w-4" />
    case "logs":
      return <ClockCounterClockwise weight="bold" className="h-4 w-4" />
    case "keys":
      return <ShieldCheck weight="fill" className="h-4 w-4" />
    default:
      return null
  }
}

export default function Session() {
  const [showTip, setShowTip] = useState(true)

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* ─── Header ───────────────────────────────────────────── */}
      <header className="border-b border-slate-200/60 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Active Sessions
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-500">
            Manage and monitor every device that has access to your Authify
            account. If you see an unfamiliar device, revoke its access
            immediately.
          </p>
        </div>
      </header>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left Sidebar */}
          <nav className="flex w-full shrink-0 flex-col gap-1 lg:w-[240px]">
            {SESSION_SIDEBAR.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  item.active
                    ? "bg-indigo-50 text-[#4534e1]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <SidebarIcon icon={item.icon} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right – Session List */}
          <div className="flex w-full flex-col gap-4">
            {SESSION_DEVICES.map((session) => (
              <div
                key={session.id}
                className={`flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8 ${
                  session.isCurrent
                    ? "border-indigo-100 bg-indigo-50/30"
                    : "border-slate-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                      session.isCurrent
                        ? "border-indigo-100 bg-indigo-50"
                        : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <DeviceIcon
                      type={session.type}
                      current={session.isCurrent}
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {session.browser} on {session.os}
                      </span>
                      {session.isCurrent && (
                        <span className="rounded bg-[#4534e1] px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                          Current Session
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-500">
                      <Globe weight="bold" className="h-3.5 w-3.5" />
                      {session.ip} • {session.location}
                    </div>
                    <p
                      className={`mt-0.5 text-[13px] font-medium ${
                        session.isCurrent
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    >
                      {session.time}
                    </p>
                  </div>
                </div>

                {session.isCurrent ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-200 font-semibold text-slate-500 sm:w-auto"
                    disabled
                  >
                    Revoke
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs font-bold tracking-widest text-red-500 uppercase hover:bg-red-50 hover:text-red-600 sm:w-auto"
                  >
                    Revoke session
                  </Button>
                )}
              </div>
            ))}

            {/* Security Recommendation Toast */}
            {showTip && (
              <div className="relative mt-2 flex items-start gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50">
                  <WarningCircle
                    weight="fill"
                    className="h-5 w-5 text-orange-600"
                  />
                </div>
                <div className="pr-8">
                  <h4 className="text-sm font-bold text-slate-900">
                    Security Recommendation
                  </h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                    We noticed 2 sessions that haven't been active for over 30
                    days. Consider revoking them to maintain optimal security.
                  </p>
                </div>
                <button
                  onClick={() => setShowTip(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X weight="bold" className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Revoke All Banner */}
            <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Sign out of all other sessions
                </h3>
                <p className="mt-1 text-[13px] text-slate-500">
                  This will log you out from all devices except the one you are
                  currently using.
                </p>
              </div>
              <Button className="w-full shrink-0 bg-[#4534e1] font-bold tracking-widest text-white uppercase shadow-md shadow-[#4534e1]/20 hover:bg-[#3b2cc2] sm:w-auto">
                Revoke All Others
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}