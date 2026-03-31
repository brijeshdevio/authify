import { isAxiosError } from "axios";

export function Error({ error }: { error: unknown }) {
  let message = "Something went wrong.";

  if (isAxiosError(error)) {
    message = error.response?.data?.message ?? error.message;
  }

  return (
    <div className="badge badge-error badge-soft border-error/5 mx-auto mt-3 w-full border py-5 text-center">
      <p className="text-error text-sm">{message}</p>
    </div>
  );
}
