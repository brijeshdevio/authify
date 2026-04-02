import { ArrowRight, MailCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import {
  useRegisterFacade,
  useResendVerifyEmail,
} from "@/features/auth/auth.hooks";

function CheckEmail({ email }: { email: string }) {
  const { mutate, isPending } = useResendVerifyEmail({ email });

  function handleSubmit() {
    mutate();
  }

  return (
    <>
      <div className="card bg-base-200 border-base-content/10 w-full border">
        <div className="card-body flex flex-col gap-y-5 shadow-2xl">
          <div className="flex flex-col text-center">
            <div className="avatar avatar-placeholder mx-auto w-fit">
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                <MailCheck className="text-primary" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 text-center">
            <div>
              <h2 className="card-title mx-auto w-fit">Check your email</h2>
              <p className="text-neutral-content">
                We've sent a verification link to {email}.
              </p>
            </div>
            <Button
              className="btn-primary"
              isLoading={isPending}
              onClick={handleSubmit}
            >
              Resend Email
            </Button>
          </div>
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

export default function Register() {
  const {
    handleSubmit,
    submit,
    register,
    isPending,
    errors,
    isSuccess,
    getValues,
  } = useRegisterFacade();

  if (isSuccess && getValues("email")) {
    return <CheckEmail email={getValues("email")} />;
  }

  return (
    <>
      <div className="card bg-base-200 border-base-content/10 w-full border">
        <div className="card-body flex flex-col gap-y-5 shadow-2xl">
          <div className="flex flex-col text-center">
            <h1 className="card-title mx-auto w-fit">Join Authify</h1>
            <p className="text-neutral-content">
              Experience the next generation of security architecture.
            </p>
          </div>
          <form
            className="flex flex-col gap-y-3"
            onSubmit={handleSubmit(submit)}
          >
            <Input
              label="Full Name"
              placeholder="Jonson Poul"
              {...register("name")}
              error={errors.name}
            />
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
              Create Account
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to={"/auth/login"} className="link hover:text-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
