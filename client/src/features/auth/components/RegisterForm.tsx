import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, ShieldCheck, LockKey, CircleNotch, WarningCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md">
      <div className="mb-10 rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
        <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-950">
          Create an account
        </h1>
        <p className="mb-8 text-sm text-slate-500">
          Join the world's most secure authentication platform.
        </p>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Full Name
            </Label>
            <Input 
              placeholder="John Doe" 
              className="h-12 border-transparent bg-slate-50/80 px-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500" 
            />
          </div>

          {/* Email Address - Error State */}
          <div className="flex flex-col gap-2">
            <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Email Address
            </Label>
            <Input 
              defaultValue="alex@example.com" 
              className="h-12 border-red-200 bg-red-50/30 px-4 text-base text-red-900 shadow-none focus-visible:border-red-500 focus-visible:ring-red-500/20" 
            />
            <p className="flex items-center gap-1.5 text-xs font-bold text-red-600">
              <WarningCircle weight="fill" className="h-3.5 w-3.5" />
              Email is already in use
            </p>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Password
            </Label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"}
                defaultValue="secret123" 
                className="h-12 border-transparent bg-slate-50/80 px-4 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-0 right-0 flex h-12 w-12 items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <Eye weight="bold" className="h-5 w-5" />
              </button>
            </div>
            
            {/* Password Strength */}
            <div className="mt-1 flex flex-col gap-2">
              <div className="flex h-1.5 w-full gap-1">
                <div className="h-full flex-1 rounded-full bg-amber-700"></div>
                <div className="h-full flex-1 rounded-full bg-amber-700"></div>
                <div className="h-full flex-1 rounded-full bg-blue-100"></div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span className="text-amber-700">Strength: Medium</span>
                <span className="normal-case tracking-normal">Use 12+ characters</span>
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mt-2 flex items-start gap-3">
             <div className="flex h-5 items-center">
               <input 
                 id="terms" 
                 type="checkbox" 
                 defaultChecked
                 className="h-4 w-4 rounded border-slate-300 text-[#4534e1] focus:ring-[#4534e1]" 
               />
             </div>
             <label htmlFor="terms" className="text-xs text-slate-600">
               I agree to the <Link to="#" className="font-semibold text-[#4534e1] hover:underline">Terms of Service</Link> and <Link to="#" className="font-semibold text-[#4534e1] hover:underline">Privacy Policy</Link>.
             </label>
          </div>

          {/* Submit Button */}
          <Button 
            className="mt-2 h-14 w-full bg-[#4534e1] text-base font-bold text-white shadow-lg shadow-[#4534e1]/20 hover:bg-[#3b2cc2]" 
          >
            <CircleNotch weight="bold" className="mr-2 h-5 w-5 animate-spin text-white/70" />
            Creating account...
          </Button>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="font-bold text-[#4534e1] hover:underline">Log in</Link>
          </p>

        </form>
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-6 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
        <div className="flex items-center gap-2">
           <ShieldCheck weight="fill" className="h-4 w-4 text-slate-400" />
           SOC2 TYPE II
        </div>
        <div className="h-3 w-px bg-slate-300"></div>
        <div className="flex items-center gap-2">
           <LockKey weight="fill" className="h-4 w-4 text-slate-400" />
           AES-256
        </div>
      </div>
    </div>
  )
}
