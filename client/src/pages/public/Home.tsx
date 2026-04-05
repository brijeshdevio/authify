import { Button } from "@/components/ui/button";
import { Clock, Fingerprint, Key, Mail, Shield, Verified } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="relative mx-auto max-w-7xl overflow-hidden px-8 py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="z-10">
            <h1 className="text-on-surface mb-6 text-5xl font-extrabold tracking-tighter md:text-7xl">
              Secure by design.
              <br />
              <span className="text-">Built for trust.</span>
            </h1>
            <p className="text-on-surface-variant mb-10 max-w-xl text-lg leading-relaxed md:text-xl">
              The ethereal anchor for your application's security. Integrate
              enterprise-grade authentication in minutes, not months.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size={"lg"} variant={"default"}>
                  Create Free Account
                </Button>
              </Link>
              <Button size={"lg"} variant={"outline"}>
                View API Docs
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                <img
                  className="border-surface h-10 w-10 rounded-full border-2"
                  data-alt="Portrait of a professional software engineer smiling, soft studio lighting, clean background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA81wH3dWB3wTLLXU1siqI3xaJoHhm2ZQ_wpsOZLCUO2xQ-kid95zU8rSx_NTTHNk-ZpxmCaCUlsmc2w0-G67UHBF7WGCZBaobl4xdpSf1nXBKds4Ff5RYei1IO1guGngBfUy-oNKdkOuUTwbV3vK9QDwylGkUZ4uPpc1_ZTpmgn_YWjpdVAcuo62_X_F9dWG5g597Gj55jgSEIJlybl0bPgrpNMi_fmr_sXgWLIxEeciYts8m9PUXkKDr9c3BZARwj3z1ruBM86fc"
                />
                <img
                  className="border-surface h-10 w-10 rounded-full border-2"
                  data-alt="Close-up portrait of a young male developer in a modern tech office environment"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5PQPDyC0PfU-6h-DwImqUYoZr8pXGZiQ3Bb42JEZXLrPV6NUHdyRcJ3o6G7Dwn17t4O84jaGw46jSgpOfp-MI6cbfscOzVnbtMfVZxivRGhqNHvNSix_Sfjn6xoCV6OT6KYCZPgD5SmgA3aAUym7Nl9QD8mwKhlcYhK3kKEhJbU48LggZu86JB_2yf1NgLMk3GiF6xclH8hy4qrzUvbSKh4uQ7CDmJMeS5UIZVOQfrnsjqUVq4k1Mt7XrljyrWF4fP6QlpOdZISY"
                />
                <img
                  className="border-surface h-10 w-10 rounded-full border-2"
                  data-alt="Smiling female tech executive in a bright, minimalist office setting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAaO8jTT5nxqgkrBBYNxDUt0bWwZIiE-py0k6MJZnmClDEU3TJPRBcUO8lelWy0ip9aQi-sR6aGGw_qMYnaTleNkK01uewi857JYNmHCdPoPIjv4n4HuvqC3rn77RFFEgyhGg_soictOQYzGVtGBGa2i8iHuE4z58YJwD_quN9ZzswjKpoTG-jXOm7BdvFBiNFgqF5ybGIV9cWanBDujnQlyA49N2UiZiexpUHtxIQfLMrxlHuKomkPOHczd85wIHrS3UX-sPl7TA"
                />
              </div>
              <p className="text-on-surface-variant text-sm">
                Trusted by{" "}
                <span className="text-on-surface font-bold">2,500+</span>{" "}
                developers worldwide
              </p>
            </div>
          </div>
          {/* <!-- Abstract UI Visual --> */}
          <div className="relative">
            <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="glass-card ambient-shadow border-outline-variant/15 relative z-10 rounded-xl border p-8">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="bg-error/20 h-3 w-3 rounded-full"></div>
                  <div className="h-3 w-3 rounded-full bg-primary/20"></div>
                  <div className="h-3 w-3 rounded-full bg-secondary/20"></div>
                </div>
                <div className="text-on-surface-variant font-mono text-xs">
                  authify_config.v2.js
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container-high h-4 w-3/4 rounded"></div>
                <div className="bg-surface-container-high h-4 w-full rounded"></div>
                <div className="h-4 w-1/2 rounded bg-primary/10"></div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-low flex h-24 flex-col justify-between rounded-lg p-4">
                    <Verified />
                    <div className="h-2 w-full rounded bg-primary/20"></div>
                  </div>
                  <div className="bg-surface-container-low flex h-24 flex-col justify-between rounded-lg p-4">
                    <Fingerprint />
                    <div className="h-2 w-full rounded bg-secondary/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-low px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to secure your app
            </h2>
            <p className="text-on-surface-variant">
              A comprehensive suite of authentication tools designed for the
              modern web.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* <!-- OAuth Card --> */}
            <div className="bg-surface-container-lowest ambient-shadow border-outline-variant/10 group rounded-xl border p-10 md:col-span-2">
              <div className="flex h-full flex-col">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <Key />
                </div>
                <h3 className="mb-4 text-2xl font-bold">
                  OAuth &amp; Social Identity
                </h3>
                <p className="text-on-surface-variant mb-8 max-w-md leading-relaxed">
                  Connect with Google, GitHub, Apple, and more with a single
                  click. Our pre-built integrations handle the complexities of
                  tokens and redirects.
                </p>
                <div className="mt-auto flex gap-4">
                  <div className="bg-surface border-outline-variant/10 rounded-lg border p-3">
                    <FcGoogle size={20} />
                  </div>
                  <div className="bg-surface border-outline-variant/10 rounded-lg border p-3">
                    <FaGithub size={20} />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Session Card --> */}
            <div className="bg-surface-container-lowest ambient-shadow border-outline-variant/10 rounded-xl border p-10">
              <div className="bg-tertiary-fixed-dim/20 text-tertiary mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                <Clock />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Session Control</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Granular session management with JWT support. Monitor active
                sessions and revoke access instantly across all devices.
              </p>
            </div>
            {/* <!-- Email Verification Card --> */}
            <div className="bg-surface-container-lowest ambient-shadow border-outline-variant/10 rounded-xl border p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary">
                <Mail />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Smart Verification</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Automated email verification workflows with customizable
                templates and magic link support for passwordless login.
              </p>
            </div>
            {/* <!-- Security Card --> */}
            <div className="ambient-shadow text-on-primary relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 to-primary p-10 md:col-span-2">
              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-bold">
                  Global Security Standards
                </h3>
                <p className="text-on-primary-container mb-8 max-w-lg leading-relaxed">
                  We adhere to the strictest security protocols, including SOC2
                  compliance, 2FA/MFA by default, and encrypted-at-rest data
                  storage.
                </p>
                <Button size={"lg"} variant={"outline"}>
                  Explore Security Portal
                </Button>
              </div>
              <Shield className="material-symbols-outlined absolute -right-10 -bottom-10 text-[200px] opacity-10" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
