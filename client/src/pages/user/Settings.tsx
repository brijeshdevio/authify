import { Lock } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import {
  useAuth,
  useChangePasswordFacade,
  useUpdateFacade,
} from "@/features/user/user.hooks";

function Profile() {
  const { user } = useAuth();
  const { handleSubmit, submit, register, isPending, errors } =
    useUpdateFacade();

  return (
    <section className="card bg-base-200 border-base-content/5 mt-5 border">
      <div className="card-body gap-y-5">
        <div className="flex flex-row items-center gap-x-5">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-1 ring-offset-2">
              <img src={`https://placehold.co/200x200?text=K`} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <p className="text-neutral-content text-sm">
              Update your public profile and email address.
            </p>
          </div>
        </div>
        <form
          className="flex flex-col gap-y-3 md:max-w-1/2"
          onSubmit={handleSubmit(submit)}
        >
          <Input
            label="Full Name"
            defaultValue={user?.name}
            placeholder="Jonson Paul"
            {...register("name")}
            error={errors.name}
          />
          <Input label="Email Address" defaultValue={user?.email} disabled />
          <div className="ml-auto">
            <Button type="submit" className="btn-primary" isLoading={isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ChangePassword() {
  const { handleSubmit, submit, register, isPending, errors } =
    useChangePasswordFacade();

  return (
    <section className="card bg-base-200 border-base-content/5 mt-5 border">
      <div className="card-body gap-y-5">
        <div className="flex flex-row items-center gap-x-5">
          <div className="bg-base-100 border-base-content/5 rounded-xl border p-3">
            <Lock className="text-primary h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Change Password</h3>
            <p className="text-neutral-content text-sm">
              Ensure your account is using a long, random password to stay
              secure.
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(submit)}>
          <Input
            label="Current Password"
            type="password"
            placeholder="**********"
            {...register("oldPassword")}
            error={errors.oldPassword}
            disabled={isPending}
          />
          <div className="flex flex-col gap-x-5 gap-y-3 md:flex-row">
            <Input
              label="New Password"
              type="password"
              placeholder="**********"
              {...register("newPassword")}
              error={errors.newPassword}
              disabled={isPending}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="**********"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
              disabled={isPending}
            />
          </div>
          <div className="ml-auto">
            <Button type="submit" className="btn-primary" isLoading={isPending}>
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function Settings() {
  return (
    <>
      <section>
        <div>
          <h1 className="text-2xl font-semibold">Account Settings</h1>
          <p className="text-neutral-content/80 text-sm">
            Manage your digital identity and security preferences within the
            Sentinel ecosystem.
          </p>
        </div>
      </section>
      <Profile />
      <ChangePassword />
    </>
  );
}
