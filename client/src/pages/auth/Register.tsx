import { ArrowRight, Shield } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useRegisterFacade } from "@/features/auth/auth.hooks";

function Form() {
  const { handleSubmit, submit, register, isPending, errors } =
    useRegisterFacade();

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submit)}>
      <Input
        label="Full Name"
        placeholder="Alex Rivera"
        {...register("name")}
        error={errors.name}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="alex@example.com"
        {...register("email")}
        error={errors.email}
      />
      <div className="flex flex-col space-y-5 space-x-5 sm:flex-row">
        <Input
          label="Password"
          type="password"
          placeholder="**********"
          {...register("password")}
          error={errors.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="**********"
          {...register("confirmPassword")}
          error={errors.confirmPassword}
        />
      </div>
      <div className="flex items-start space-x-3">
        <input
          className="border-outline-variant/30 h-4 w-4 rounded text-primary focus:ring-primary/20"
          id="terms"
          type="checkbox"
        />
        <label
          className="text-on-surface-variant text-xs leading-relaxed"
          htmlFor="terms"
        >
          I agree to the{" "}
          <a className="text-primary hover:underline" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="text-primary hover:underline" href="#">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      <Button
        size={"lg"}
        className="w-full"
        type="submit"
        isLoading={isPending}
      >
        REGISTER ACCOUNT
        <ArrowRight className="h-5 w-5" />
      </Button>
    </form>
  );
}

export default function Register() {
  return (
    <>
      <main className="relative flex flex-grow items-center justify-center overflow-hidden p-6">
        {/* <!-- Abstract Background Elements --> */}
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-secondary/5 blur-[120px]"></div>
        <div className="glass-panel relative z-10 grid w-full max-w-[1100px] overflow-hidden rounded-xl shadow-[0_20px_40px_rgba(25,28,30,0.05)] md:grid-cols-2">
          {/* <!-- Left Side: Branding/Visual --> */}
          <div className="relative hidden flex-col justify-between bg-sky-600 p-12 text-white md:flex">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tighter">
                Authify
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl leading-tight font-bold tracking-tight">
                Secure your identity <br />
                with the next generation <br />
                of trust.
              </h1>
              <p className="text-on-primary-container/80 max-w-sm text-lg">
                Join over 10,000 teams securing their digital borders with
                Authify's ethereal infrastructure.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  <img
                    alt="User 1"
                    className="h-10 w-10 rounded-full border-2 border-primary"
                    data-alt="close-up portrait of a professional woman in a bright modern office setting, soft natural lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuqNsBgtEkegukTfXwaW-ALTDeHiwIcnmKR9BRn2gBjLN04reEhij3T6GTv_7qTyx8Il5ZLp5w2DuWVRhEeRktiqSCSvq2WwQUkWz1DGa-EgSu2V-U0XgGm--OLQ0qUxDzdumxMV7gP0AMJcsaGlrt6LjGAc3k75mQ2xLQRcK12KinBJbnm9ZFjYGu6ih26C16QMdFNUceJEsxSZTGONuBQW0pbE0dKiUxzOdixZ-7ppFxzY_bgGLbCM6zOdPX4gZA5vde1g1kS5E"
                  />
                  <img
                    alt="User 2"
                    className="h-10 w-10 rounded-full border-2 border-primary"
                    data-alt="close-up portrait of a creative professional man with glasses, smiling in a minimalist studio environment"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT6ZD07hoWBhRT9H-wzVEpz-UYDZY3oadLQwdGnoSGDG3OIHDMaVJ9TlFXpEsI5g5T5EVBm5NRiUqXCPtvEFPJJgSO_liIpWlOBOpsTq3Hpvj61Yj67gyYIGisR5WL9KuJVvlXVfDfuCNFa35oeT0JBnv6sLnEp9ftePOdEWkxcch-16fZx61L2aWZ56o52iHHQ5Oe6D8xarmsE7wGs0VFp5_RqCQAqCoxAL3qiQIz1TFSFGMcwaOhjui5i2BEvL7-CDToXn0EVN0"
                  />
                  <img
                    alt="User 3"
                    className="h-10 w-10 rounded-full border-2 border-primary"
                    data-alt="headshot of a diverse young professional tech worker in a sleek urban coworking space"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjmQ6wfmWE3_RYR_77xenjVm6I5eYMzYuHPSZUvJKPfN0EJHIEZhx4qtexGDb0ANiI-P1V_IJCoQW7Cofd25xQgPK0Dgw7X4ZFI0mvLxkzh9qO0843Dkm7Kwz0IEPAiSjrxnE6EYWomqHwV8xGdQcSRNnauPguoRT1O9uEqj51KQD7H0fM6BfEUIDZ632Rt_6ri8fIUCXH0crCQ4I9nED2ZM2Kp8k7492uqLzZFHA5ccAKkQbb2herFtpY2n5aLuUZn-d3jY-wNNA"
                  />
                </div>
                <span className="text-on-primary-container text-sm font-medium">
                  Trusted by world-className developers
                </span>
              </div>
            </div>
            <div className="text-on-primary-container/60 text-xs">
              © {new Date().getFullYear()} Authify Inc. Elevating security
              standards.
            </div>
            {/* <!-- Decorative Accent --> */}
            <div className="absolute right-0 bottom-0 p-8">
              <Shield />
            </div>
          </div>

          {/* <!-- Right Side: Registration Form --> */}
          <div className="bg-surface-container-lowest flex flex-col justify-center sm:p-8 md:p-12 lg:p-16">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-on-surface mb-2 text-2xl font-bold tracking-tight">
                Create your account
              </h2>
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="link text-primary">
                  Login
                </Link>
              </p>
            </div>
            {/* <!-- Social Signups --> */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              <Button size={"lg"}>
                <FcGoogle />
                <span className="text-sm font-semibold text-secondary">
                  Google
                </span>
              </Button>
              <Button size={"lg"}>
                <FaGithub />
                <span className="text-sm font-semibold text-secondary">
                  GitHub
                </span>
              </Button>
            </div>
            <div className="relative mb-8 flex flex-row items-center justify-center">
              <Separator className="!w-[25%]" />
              <div className="relative flex justify-center text-xs">
                <span className="bg-surface-container-lowest px-4 font-medium whitespace-nowrap text-muted-foreground">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
              <Separator className="!w-[25%]" />
            </div>
            <Form />
          </div>
        </div>
      </main>
    </>
  );
}
