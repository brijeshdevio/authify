import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  LockKey,
  ArrowRight,
  CaretLeft,
  Info,
  ShieldCheck,
} from "@phosphor-icons/react"

export default function ForgotPassword() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-[#4534e1]">
            <LockKey weight="bold" className="h-7 w-7" />
          </div>

          <h1 className="mb-3 text-center text-2xl font-black tracking-tight text-slate-950">
            Forgot Password
          </h1>
          <p className="mx-auto mb-8 max-w-xs text-center text-[15px] leading-relaxed text-slate-500">
            Enter your email address and we'll send you a secure link to reset
            your account credentials.
          </p>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Work Email Address
              </Label>
              <Input
                placeholder="name@company.com"
                className="h-12 border-transparent bg-slate-50/80 px-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500"
              />
            </div>

            <Button className="h-14 w-full bg-[#4534e1] text-base font-bold text-white shadow-lg shadow-[#4534e1]/20 hover:bg-[#3b2cc2]">
              Send reset link
              <ArrowRight weight="bold" className="ml-2 h-5 w-5" />
            </Button>
          </form>

          {/* Info Banner */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border-l-[3px] border-[#4534e1] bg-slate-50 px-4 py-3">
            <Info
              weight="fill"
              className="mt-0.5 h-5 w-5 shrink-0 text-[#4534e1]"
            />
            <p className="text-[13px] leading-relaxed text-slate-600">
              If an account exists for that email, you will receive a password
              reset link shortly.
            </p>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-bold text-[#4534e1] hover:underline"
            >
              <CaretLeft weight="bold" className="mr-1 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>

        {/* Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
          <ShieldCheck weight="fill" className="h-4 w-4" />
          Secure Vault Protocol 2.0
        </div>
      </div>
    </div>
  )
}
