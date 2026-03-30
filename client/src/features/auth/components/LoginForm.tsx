import { Link } from "react-router-dom"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLoginFacade } from "../auth.hooks"

export function LoginForm() {
  const { handleSubmit, submit, isPending, errors, register } = useLoginFacade()

  return (
    <div className="w-full max-w-md">
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-950">
          Welcome Back
        </h1>
        <p className="text-[15px] text-slate-500">
          Sign in to your account to continue
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
          {/* Email Address */}
          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            {...register("email")}
            error={errors.email}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="********"
            {...register("password")}
            error={errors.password}
          />

          {/* Submit Button */}
          <Button isLoading={isPending} type="submit">
            Sign In
            <ArrowRight weight="bold" className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-bold text-[#4534e1] hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}
