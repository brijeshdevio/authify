import { MailCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { useVerifyEmailFacade } from "@/features/auth/auth.hooks";

export default function VerifyEmail() {
  const { token } = useParams();
  const { verify, isPending } = useVerifyEmailFacade(token ?? "");

  return (
    <>
      <div className="card bg-base-200 border-base-content/10 w-full border">
        <div className="card-body flex flex-col gap-y-5 shadow-2xl">
          {/* Icon */}
          <div className="flex flex-col text-center">
            <div className="avatar avatar-placeholder mx-auto w-fit">
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                <MailCheck className="text-primary" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-y-2 text-center">
            <h1 className="card-title mx-auto w-fit">Verify your email</h1>
            <p className="text-neutral-content">
              We've sent a verification link to your email. Please click the
              link to confirm your account.
            </p>
          </div>

          {/* Verify Button */}
          <Button
            className="btn-primary"
            isLoading={isPending}
            onClick={verify}
          >
            Verify Email
          </Button>
        </div>
      </div>
    </>
  );
}
