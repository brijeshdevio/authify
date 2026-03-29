import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Lock, Warning } from "@phosphor-icons/react"

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Expired Banner */}
        <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border-l-[3px] border-amber-700 bg-amber-50/50 px-5 py-4">
          <div className="flex items-start gap-3">
            <Warning
              weight="fill"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Reset link expired
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                For your security, password reset links expire after 30 minutes.
                Please request a new link.
              </p>
            </div>
          </div>
          <button className="shrink-0 text-xs font-black tracking-widest text-red-600 uppercase hover:underline">
            Resend
          </button>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
          <h1 className="mb-3 text-2xl font-black tracking-tight text-slate-950">
            Create new password
          </h1>
          <p className="mb-8 max-w-sm text-[15px] leading-relaxed text-slate-500">
            Ensure your new password is at least 12 characters long and contains
            a mix of characters.
          </p>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* New Password */}
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  defaultValue="securepassword"
                  className="h-12 border-transparent bg-slate-50/80 px-4 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center p-4 text-slate-400 hover:text-slate-600"
                >
                  <Eye weight="bold" className="h-5 w-5" />
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="mt-1 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>Security Strength</span>
                  <span className="text-amber-700">Medium</span>
                </div>
                <div className="flex h-1.5 w-full gap-1">
                  <div className="h-full flex-1 rounded-full bg-slate-900"></div>
                  <div className="h-full flex-1 rounded-full bg-slate-900"></div>
                  <div className="h-full flex-1 rounded-full bg-blue-100"></div>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Confirm Password
              </Label>
              <Input
                type="password"
                defaultValue="securepassword"
                className="h-12 border-transparent bg-slate-50/80 px-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <Button className="mt-2 h-14 w-full bg-[#4534e1] text-base font-bold text-white shadow-lg shadow-[#4534e1]/20 hover:bg-[#3b2cc2]">
              Reset Password
            </Button>
          </form>

          {/* Encryption note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-slate-400">
            <Lock weight="fill" className="h-4 w-4" />
            <span className="font-medium">
              Secure end-to-end encryption active
            </span>
          </div>
        </div>

        {/* Help Link */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Having trouble?{" "}
          <Link
            to="#"
            className="font-semibold text-[#4534e1] underline hover:text-[#3b2cc2]"
          >
            Contact Security Support
          </Link>
        </p>
      </div>
    </div>
  )
}
