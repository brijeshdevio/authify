import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useAuth, useUpdateFacade } from "@/features/user/user.hooks";

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
    </>
  );
}
