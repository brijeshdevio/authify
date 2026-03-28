import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Warning } from "@phosphor-icons/react"

export default function Setting() {
  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* ─── Header ───────────────────────────────────────────── */}
      <header className="border-b border-slate-200/60 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Account Settings
          </h1>
          <p className="mt-2 text-[15px] text-slate-500">
            Manage your personal information, security preferences, and account
            status.
          </p>
        </div>
      </header>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* ── Profile Settings ─────────────────────────────── */}
          <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 rounded-t-2xl bg-slate-50 px-6 py-4 sm:px-8">
              <User weight="fill" className="h-5 w-5 text-slate-600" />
              <h2 className="text-base font-bold text-slate-900">
                Profile settings
              </h2>
            </div>

            <form
              className="flex flex-col gap-6 p-6 sm:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                    Full Name
                  </Label>
                  <Input
                    defaultValue="Alex Thompson"
                    className="h-12 border-slate-200 bg-white px-4 text-base shadow-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                    Email Address
                  </Label>
                  <Input
                    defaultValue="alex.t@authify.com"
                    className="h-12 border-slate-200 bg-white px-4 text-base shadow-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#4534e1] font-bold text-white shadow-md shadow-[#4534e1]/20 hover:bg-[#3b2cc2]">
                  Update Profile
                </Button>
              </div>
            </form>
          </section>

          {/* ── Password Settings ────────────────────────────── */}
          <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 rounded-t-2xl bg-slate-50 px-6 py-4 sm:px-8">
              <Lock weight="fill" className="h-5 w-5 text-slate-600" />
              <h2 className="text-base font-bold text-slate-900">
                Password settings
              </h2>
            </div>

            <form
              className="flex flex-col gap-6 p-6 sm:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex max-w-md flex-col gap-2">
                <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  Current Password
                </Label>
                <Input
                  type="password"
                  defaultValue="password1"
                  className="h-12 border-transparent bg-slate-50/80 px-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500"
                />
              </div>

              <div className="flex max-w-md flex-col gap-2">
                <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  New Password
                </Label>
                <Input
                  type="password"
                  defaultValue="password1"
                  className="h-12 border-transparent bg-slate-50/80 px-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500"
                />
              </div>

              <div className="flex max-w-md flex-col gap-2">
                <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  Confirm New Password
                </Label>
                <Input
                  type="password"
                  defaultValue="password1"
                  className="h-12 border-transparent bg-slate-50/80 px-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#4534e1] font-bold text-white shadow-md shadow-[#4534e1]/20 hover:bg-[#3b2cc2]">
                  Change password
                </Button>
              </div>
            </form>
          </section>

          {/* ── Danger Zone ──────────────────────────────────── */}
          <section className="overflow-hidden rounded-2xl border border-red-200 shadow-sm">
            <div className="flex items-center gap-3 bg-red-50 px-6 py-4 sm:px-8">
              <Warning weight="fill" className="h-5 w-5 text-red-600" />
              <h2 className="text-sm font-bold tracking-widest text-red-600 uppercase">
                Danger Zone
              </h2>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Delete Account
                </h3>
                <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-slate-500">
                  Once you delete your account, there is no going back. Please
                  be certain of this action as all your security keys and audit
                  logs will be wiped from our servers.
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full shrink-0 border-red-200 font-bold text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto"
              >
                Delete My Account
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}