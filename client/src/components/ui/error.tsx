import { isAxiosError } from "axios";
import { Badge } from "./badge";

export function Error({ error }: { error: unknown }) {
  let message = "Something went wrong.";

  if (isAxiosError(error)) {
    message = error.response?.data?.message ?? error.message;
  }

  return (
    <Badge
      variant={"destructive"}
      className="mx-auto mt-3 w-full border border-destructive/5 py-5 text-center"
    >
      <p className="text-error text-sm">{message}</p>
    </Badge>
  );
}
