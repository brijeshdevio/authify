import { ArrowLeft, ArrowRight, Lock, MailCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useVerifyEmailFacade } from "@/features/auth/auth.hooks";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const { token } = useParams();
  const { verify, isPending } = useVerifyEmailFacade(token ?? "");

  return (
    <main className="flex flex-grow items-center justify-center px-6 pt-24 pb-12">
      <div className="relative w-full max-w-md">
        {/* <!-- Decorative Background Element (Ethereal Anchor) --> */}
        <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="bg-secondary-container/20 absolute -right-12 -bottom-12 h-64 w-64 rounded-full blur-3xl"></div>
        {/* <!-- Verification Card --> */}
        <div className="bg-surface-container-lowest/85 tonal-layering-card border-outline-variant/10 relative rounded-xl border p-8 backdrop-blur-xl md:p-12">
          {/* <!-- Icon Header --> */}
          <div className="mb-5 flex flex-col items-center text-center">
            <div className="bg-primary-fixed mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <MailCheck />
            </div>
            <h1 className="text-on-surface headline-lg mb-3 text-3xl font-bold tracking-tight">
              Verify your email
            </h1>
            <p className="text-sm text-muted-foreground">
              Click the button below to verify your email address and activate
              your account.
            </p>
          </div>
          {/* <!-- Action Section --> */}
          <div className="space-y-6">
            <Button
              size={"lg"}
              className="w-full"
              onClick={verify}
              isLoading={isPending}
            >
              Verify Email Address
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div className="mt-5 text-center">
              <Link to="/login">
                <Button variant={"link"}>
                  <ArrowLeft />
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
          {/* <!-- Progressive Stepper (Whisper) --> */}
          <div className="bg-primary-fixed absolute top-0 left-0 h-0.5 w-full overflow-hidden rounded-t-xl">
            <div className="h-full w-2/3 bg-primary"></div>
          </div>
        </div>
        {/* <!-- Security Badge (Contextual Element) --> */}
        <div className="text-on-surface-variant/60 mt-8 flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase">
          <Lock />
          Securely encrypted by Authify
        </div>
      </div>
    </main>
  );
}
