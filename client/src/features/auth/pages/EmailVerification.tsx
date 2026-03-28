import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { EnvelopeSimple, CheckCircle } from "@phosphor-icons/react"

export default function EmailVerification() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-[#4534e1]">
            <EnvelopeSimple weight="bold" className="h-7 w-7" />
          </div>

          <h1 className="mb-3 text-2xl font-black tracking-tight text-slate-950">
            Check your email
          </h1>
          <p className="mx-auto max-w-xs text-[15px] leading-relaxed text-slate-500">
            We've sent a verification link to your email address. Please click
            the link to confirm your account and secure your data vault.
          </p>

          {/* Success Banner */}
          <div className="mt-8 flex items-center gap-3 rounded-xl border-l-[3px] border-[#4534e1] bg-slate-50 px-4 py-3 text-left">
            <CheckCircle
              weight="fill"
              className="h-5 w-5 shrink-0 text-[#4534e1]"
            />
            <span className="text-sm font-semibold text-slate-700">
              Email resent successfully!
            </span>
          </div>

          {/* Open Email App */}
          <Button className="mt-8 h-14 w-full bg-[#4534e1] text-base font-bold text-white shadow-lg shadow-[#4534e1]/20 hover:bg-[#3b2cc2]">
            Open Email App
          </Button>

          {/* Resend */}
          <div className="mt-6">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Didn't receive it?
            </p>
            <button className="mt-1 text-sm font-bold text-[#4534e1] hover:underline">
              Resend email
            </button>
          </div>
        </div>

        {/* Help Link */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Need help?{" "}
          <Link
            to="#"
            className="font-semibold text-[#4534e1] underline hover:text-[#3b2cc2]"
          >
            Visit our Security Audit guide
          </Link>
        </p>
      </div>
    </div>
  )
}
