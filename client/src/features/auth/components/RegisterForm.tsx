import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRegisterFacade } from "../auth.hooks"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { Link } from "react-router-dom"

export function RegisterForm() {
  const { handleSubmit, submit, errors, register, isPending } =
    useRegisterFacade()

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-950">
          Create an account
        </h1>
        <p className="text-[15px] text-slate-500">
          Join the world's most secure authentication platform.
        </p>
      </div>
      <div className="mb-10 rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
          {/* Name */}
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            error={errors.name}
          />

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
            Create Account
            <ArrowRight weight="bold" className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </div>
      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-[#4534e1] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
