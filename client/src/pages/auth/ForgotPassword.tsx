import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useForgotPasswordFacade } from "@/features/auth/auth.hooks";

export default function ForgotPassword() {
  const { handleSubmit, submit, register, isPending, errors } =
    useForgotPasswordFacade();

  return (
    <>
      <div className="card bg-base-200 border-base-content/10 w-full border">
        <div className="card-body flex flex-col gap-y-5 shadow-2xl">
          <div className="flex flex-col text-center">
            <h1 className="card-title mx-auto w-fit">Forgot Password</h1>
            <p className="text-neutral-content">
              Enter your email address and we'll send you a link to reset your
              account.
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
            <Button type="submit" className="btn-primary" isLoading={isPending}>
              Send Reset Link
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
          <div className="text-center">
            <Link to={"/auth/login"} className="link hover:text-primary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
