import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForgotPasswordFacade } from "@/features/auth/auth.hooks";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { handleSubmit, submit, isPending, errors, register } =
    useForgotPasswordFacade();

  return (
    <main className="flex flex-grow items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-[480px]">
        <div className="bg-surface-container-lowest tonal-shift relative overflow-hidden rounded-xl p-10">
          {/* <!-- Branding Whisper --> */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="bg-surface-container-lowest/85 border-outline-variant/15 rounded-xl border p-10 shadow-[0_20px_40px_rgba(25,28,30,0.06)] backdrop-blur-xl">
            <div className="mb-8 text-center">
              <h1 className="text-on-surface mb-3 text-3xl font-bold tracking-tight">
                Forgot password?
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the email address associated with your account and we'll
                send you a link to reset your password.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit(submit)}>
              <Input
                label="Email Address"
                type="email"
                placeholder="alex@example.com"
                {...register("email")}
                error={errors.email}
              />
              <Button
                type="submit"
                size={"lg"}
                className="w-full"
                isLoading={isPending}
              >
                Send reset link
                <ArrowRight />
              </Button>
            </form>
            <Separator className="my-5" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?
                <Link
                  className="ml-1 font-semibold text-primary hover:underline"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
