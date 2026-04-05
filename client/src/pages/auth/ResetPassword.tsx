import { ArrowLeft, ArrowRight, Verified } from "lucide-react";
import { Link } from "react-router-dom";
import { useResetPasswordFacade } from "@/features/auth/auth.hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcSupport } from "react-icons/fc";

export default function ResetPassword() {
  const { handleSubmit, submit, register, isPending, errors } =
    useResetPasswordFacade();

  return (
    <>
      <main className="relative flex flex-grow items-center justify-center overflow-hidden px-6 pt-24 pb-12">
        {/* <!-- Background Decorative Elements --> */}
        <div className="absolute top-[-10%] left-[-5%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute right-[-5%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-secondary/5 blur-[100px]"></div>
        <div className="relative w-full max-w-md">
          {/* <!-- Reset Card --> */}
          <div className="bg-surface-container-lowest/85 border-outline-variant/15 rounded-xl border p-10 shadow-[0_20px_40px_rgba(25,28,30,0.06)] backdrop-blur-xl">
            <div className="mb-10 text-center">
              <h1 className="text-on-surface mb-2 text-3xl leading-tight font-extrabold tracking-tighter">
                Reset Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Please enter your new credentials to regain access to your
                Authify account.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit(submit)}>
              <Input
                label="New Password"
                type="password"
                placeholder="********"
                {...register("password")}
                error={errors.password}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="********"
                {...register("confirmPassword")}
                error={errors.confirmPassword}
              />
              <Button
                size={"lg"}
                type="submit"
                className="w-full"
                isLoading={isPending}
              >
                Reset Password
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
            <div className="mt-8 text-center">
              <Link to="/login">
                <Button variant={"link"}>
                  <ArrowLeft />
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
          {/* <!-- Social/Support Metadata --> */}
          <div className="mt-8 flex justify-center gap-8 text-xs font-medium tracking-tight text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Verified />
              Secure Encryption
            </span>
            <span className="flex items-center gap-1.5">
              <FcSupport />
              24/7 Support
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
