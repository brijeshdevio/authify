import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  Eye, 
  EnvelopeSimple, 
  Lock, 
  WarningCircle, 
  ArrowRight,
  GoogleLogo,
  UserFocus
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md">
      
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-950">
          Welcome Back
        </h1>
        <p className="text-[15px] text-slate-500">
          Enter your credentials to access the secure vault.
        </p>
      </div>

      {/* Error Banner */}
      <div className="mb-8 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/50 p-4 text-red-600 shadow-xs">
        <WarningCircle weight="fill" className="h-5 w-5" />
        <span className="text-sm font-semibold">Invalid email or password</span>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <EnvelopeSimple weight="bold" className="h-5 w-5" />
              </div>
              <Input 
                placeholder="name@company.com" 
                className="h-12 border-transparent bg-slate-50/80 pl-11 px-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500" 
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Password
              </Label>
              <Link to="#" className="text-[11px] font-bold tracking-tight text-[#4534e1] hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <Lock weight="bold" className="h-5 w-5" />
              </div>
              <Input 
                type={showPassword ? "text" : "password"}
                defaultValue="secret12" 
                className="h-12 border-transparent bg-slate-50/80 pl-11 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-blue-500" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center justify-center p-4 text-slate-400 hover:text-slate-600"
              >
                <Eye weight="bold" className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Remember this device */}
          <div className="mt-1 flex items-center gap-3">
             <div className="flex h-5 items-center">
               <input 
                 id="remember" 
                 type="checkbox" 
                 className="h-4 w-4 rounded border-slate-300 text-[#4534e1] focus:ring-[#4534e1]" 
               />
             </div>
             <label htmlFor="remember" className="text-[13px] font-medium text-slate-700">
               Remember this device
             </label>
          </div>

          {/* Submit Button */}
          <Button 
            className="mt-2 h-14 w-full bg-[#4534e1] text-base font-bold text-white shadow-lg shadow-[#4534e1]/20 hover:bg-[#3b2cc2]" 
          >
            Sign In
            <ArrowRight weight="bold" className="ml-2 h-5 w-5" />
          </Button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          {/* Social Auth */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1 h-12 border-transparent bg-slate-50/80 text-sm font-bold text-slate-700 hover:bg-slate-100 shadow-none"
            >
               <GoogleLogo weight="fill" className="mr-2 h-4 w-4 text-slate-400" />
               Google
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 border-transparent bg-slate-50/80 text-sm font-bold text-slate-700 hover:bg-slate-100 shadow-none"
            >
               <UserFocus weight="fill" className="mr-2 h-4 w-4 text-slate-800" />
               Passkey
            </Button>
          </div>

        </form>
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        Don't have an account? <Link to="/register" className="font-bold text-[#4534e1] hover:underline">Create your vault</Link>
      </p>

    </div>
  )
}
