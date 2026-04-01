import {
  BadgeCheck,
  Edit,
  FingerprintPattern,
  Monitor,
  ShieldAlert,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Loader } from "@/shared/ui/Loader";
import { Error } from "@/shared/ui/Error";
import { formatTime } from "@/utils/formatTime";
import { useAuth, useSessions } from "@/features/user/user.hooks";
import { Link } from "react-router-dom";

export interface Session {
  id: string;
  isCurrent: boolean;
  deviceName: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
  type: Device;
}

type Device = "laptop" | "phone" | "tablet";

function Device({ device }: { device: Device }) {
  if (device === "laptop") return <Monitor className="h-5 w-5" />;
  if (device === "phone") return <Smartphone className="h-5 w-5" />;
  if (device === "tablet") return <Tablet className="h-5 w-5" />;
  return <Monitor />;
}

function Sessions() {
  const { data, isPending, isError, error } = useSessions();

  if (isPending) {
    return <Loader className="h-64" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <div className="mt-3 flex flex-col gap-y-2">
        {data?.sessions?.map((session: Session) => (
          <div
            key={session.id}
            className="card bg-base-200 border-base-content/5 border"
          >
            <div className="card-body group items-center gap-5 md:flex-row">
              <div className="bg-base-100 border-base-content/5 rounded-xl border p-3">
                <Device device={session.type} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <span className="font-bold whitespace-nowrap">
                      {session?.deviceName}
                    </span>
                    <span className="block text-sm font-light">
                      {session?.userAgent}
                    </span>
                  </div>
                  {session.isCurrent && (
                    <span className="badge badge-sm badge-primary">
                      Current
                    </span>
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
                <Button className="btn-error btn-sm md:invisible md:group-hover:visible">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center">
        <Button className="btn-error">
          <ShieldAlert className="h-5 w-5" />
          Logout all sessions
        </Button>
        <p className="text-neutral-content/80 mt-2 text-xs italic">
          This will end all your current sessions, except for the one you're
          currently using.
        </p>
      </div>
    </>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <section>
        <div>
          <h1 className="text-2xl font-semibold">Security Dashboard</h1>
          <p className="text-neutral-content/80 text-sm">
            Manage your profile information and oversee active sessions to keep
            your digital identity secure.
          </p>
        </div>
      </section>
      <section className="card bg-base-200 border-base-content/5 mt-5 border">
        <div className="card-body items-center gap-x-5 sm:flex-row">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-1 ring-offset-2">
              <img
                src={`https://placehold.co/200x200?text=${user?.name[0].toUpperCase()}`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-0.5">
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <h4 className="text-neutral-content text-sm">{user?.email}</h4>
            <div className="mt-2 flex flex-row flex-wrap gap-2">
              <div className="badge badge-soft badge-primary">
                <BadgeCheck className="text-primary h-4 w-4" />
                <span className="text-xs">Identity Verified</span>
              </div>
              <div className="badge badge-soft badge-primary">
                <FingerprintPattern className="text-primary h-4 w-4" />
                <span className="text-xs">2FA Enabled</span>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <Link to="/settings">
              <Button className="btn-primary btn-sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div>
          <h2 className="text-xl font-semibold">Active Sessions</h2>
          <p className="text-neutral-content/80 text-sm">
            Devices currently logged into your account.
          </p>
        </div>
        <Sessions />
      </section>
    </>
  );
}
