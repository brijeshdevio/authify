import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useLoginFacade } from "@/features/auth/auth.hooks";

export default function Login() {
  const { handleSubmit, submit, register, isPending, errors } =
    useLoginFacade();

  return (
    <>
      <div className="card bg-base-200 border-base-content/10 w-full border">
        <div className="card-body flex flex-col gap-y-5 shadow-2xl">
          <div className="flex flex-col text-center">
            <h1 className="card-title mx-auto w-fit">Login to Authify</h1>
            <p className="text-neutral-content">
              Welcome back. Enter your credentials to access your account
            </p>
          </div>

          <form
            className="flex flex-col gap-y-3"
            onSubmit={handleSubmit(submit)}
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="jonsonpoul@ex.com"
              {...register("email")}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="********"
              {...register("password")}
              error={errors.password}
            />
            <Button type="submit" className="btn-primary" isLoading={isPending}>
              Login
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to={"/auth/register"} className="link hover:text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
