import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Error } from "@/components/ui/error";
import { Spinner } from "@/components/ui/spinner";
import { useSessions } from "@/features/protect/protect.hooks";
import { useAuth } from "@/hooks/useAuth";
import type { Device, Session } from "@/types";
import { formatTime } from "@/utils/formatTime";
import {
  Check,
  CheckCircle,
  Edit,
  Monitor,
  Smartphone,
  Tablet,
  Verified,
} from "lucide-react";

function Device({ device }: { device: Device }) {
  if (device === "laptop") return <Monitor className="h-5 w-5" />;
  if (device === "phone") return <Smartphone className="h-5 w-5" />;
  if (device === "tablet") return <Tablet className="h-5 w-5" />;
  return <Monitor />;
}

function Profile() {
  const { user } = useAuth();

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="relative">
            <img
              alt="Alex Rivera Large"
              className="h-32 w-32 rounded-xl object-cover shadow-sm"
              data-alt="Detailed close-up portrait of a man in his 30s with clean features against a minimalist light grey architectural background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDovBbPb4h3l_9JcCplBcPNLPl9H_MstRH3FqBD0TMhUCJapaOFI_YB67s4qdc0oTSnBTfMyl-t35n1PUZiWjJIxwnFY08h22OBXSMsxKvS7PO7HHPjzAPBlbc6tqKaULoY3bkY-jaHCGPfmC5hCH2c7mzWyXwBceucpliutPz5O7VuxAQYyqusjZ1M74EJC47x-kgSA5MEKOMxnqu4nAlA62f7d5MWIk3xLZQsfZ_1Dv5jEpvaFyQqYr-cNF4GeSMQLVtAAq33mDk"
            />
            <Button className="absolute right-2 -bottom-2">
              <Edit />
            </Button>
          </div>
          <div className="flex-grow">
            <div className="mb-1 flex items-center gap-3">
              <h2 className="text-on-surface text-2xl font-bold">
                {user?.name}
              </h2>
              {user?.isVerified && (
                <Badge>
                  <Verified />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-on-surface-variant mb-4 font-medium">
              {user?.email}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-surface-container-low rounded-lg px-4 py-2 text-sm">
                <span className="text-on-surface-variant block text-xs">
                  Joined
                </span>
                <span className="font-semibold">
                  {user?.createdAt && formatTime(user?.createdAt)}
                </span>
              </div>
              <div className="bg-surface-container-low rounded-lg px-4 py-2 text-sm">
                <span className="text-on-surface-variant block text-xs">
                  Auth Method
                </span>
                <span className="font-semibold">OAuth / SSO</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Session() {
  const { data, isPending, isError, error } = useSessions();

  if (isPending) {
    return <Spinner className="h-64" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className="space-y-4">
      {data?.sessions?.map((session: Session) => (
        <Card key={session.id}>
          <CardContent>
            <div className="group flex flex-col items-center gap-5 sm:flex-row">
              <div className="bg-base-100 border-base-content/5 w-fit rounded-xl border p-3">
                <Device device={session.type} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <span className="font-bold whitespace-nowrap">
                      {session?.deviceName}
                    </span>
                    <span className="mt-2 block text-sm text-muted-foreground">
                      {session?.userAgent}
                    </span>
                  </div>
                  {session.isCurrent && (
                    <Badge className="badge badge-sm badge-primary">
                      Current
                    </Badge>
                  )}
                </div>
                <div className="text-neutral-content/80 mt-1 text-[13px]">
                  • {session?.ipAddress} •{" "}
                  <span className="text-neutral-content/70 font-medium">
                    {formatTime(session.createdAt)}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <Button variant={"destructive"}>Delete</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Dashbaord() {
  return (
    <>
      <header className="mb-5">
        <h1 className="text-on-surface mb-2 text-4xl font-extrabold tracking-tighter">
          Account Overview
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your personal information and security preferences.
        </p>
      </header>

      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-12">
        <section className="space-y-8 md:col-span-8">
          <Profile />
          <div>
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-on-surface text-xl font-bold">
                    Active Sessions
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Devices currently logged into your Authify account.
                  </p>
                </div>
                <Button size={"lg"} variant={"destructive"}>
                  Sign out all devices
                </Button>
              </div>

              <Session />
            </div>
          </div>
        </section>
        <aside className="space-y-8 md:col-span-4">
          <Card className="bg-sky-600">
            <CardContent>
              <h3 className="mb-2 text-lg font-bold">Upgrade to Pro</h3>
              <p className="text-on-primary/80 mb-6 text-sm leading-relaxed">
                Get advanced security auditing, custom domains, and 24/7
                priority support.
              </p>
              <Button size={"lg"} variant={"default"}>
                Go Premium
              </Button>
            </CardContent>
          </Card>

          <div className="bg-surface-container-low rounded-xl p-6">
            <h3 className="text-on-surface mb-4 text-sm font-bold tracking-wider uppercase">
              Security Checklist
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle />
                <div>
                  <p className="text-sm font-bold">Email verified</p>
                  <p className="text-on-surface-variant text-xs">
                    Your email is secure.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check />
                <div>
                  <p className="text-sm font-bold">Two-factor auth</p>
                  <p className="text-xs text-muted-foreground">
                    Not enabled yet.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check />
                <div>
                  <p className="text-sm font-bold">Recovery codes</p>
                  <p className="text-xs text-muted-foreground">
                    Generate for safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl shadow-sm">
            <img
              alt="Security Tips"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="Modern digital security visualization with blue glowing circuits and cyber security abstract background representing data protection"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7pvJjXqOPKGEL5WY-f9sBSoISXJVAXwMAwg60BK_ZxYe60mizsMLdfPTXee2DN_DZfZbYFD8_wGrcSEph_iY-VRx2PV9nEtuL_TgTb3Q0ZqWnSB1teIxIZn2_uD7XhyObHcj15XNNyJeIv9605VvsgI6d9HCTYRbuej9SQ6e7DAeEuQNyF8UnbVokaRlB_LcDhCbi6x40aS8PzRN1bLwS12HWaH-qP4OboSjdUWtl6wiiPcF4szNz7GqeqQx6DMYvAmVeYNF6Jtc"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
              <span className="mb-1 text-xs font-bold tracking-tighter text-white uppercase">
                New Update
              </span>
              <p className="text-sm font-medium text-white">
                How to secure your login from anywhere.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
