import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import clsx from "clsx";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

function InputField({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-5 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  );
}

export interface InputDto extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: { message?: string };
  leftIcon?: React.ReactNode;
  leftEle?: React.ReactNode;
  wrapperClassName?: string;
}

export function Input({
  label,
  error,
  leftIcon,
  leftEle,
  wrapperClassName,
  ...props
}: InputDto) {
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const id = React.useId();

  const handleTogglePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex items-center justify-between">
        {label && (
          <Label
            htmlFor={props?.id ?? id}
            className="text-neutral-content text-[13px] font-medium"
          >
            {label}
          </Label>
        )}
        {leftEle && leftEle}
      </div>
      <div
        className={clsx(
          "input flex w-full items-center gap-2",
          wrapperClassName || "rounded-lg"
        )}
      >
        {leftIcon && (
          <span className="text-base-content/40 flex items-center">
            {leftIcon}
          </span>
        )}
        <InputField
          {...props}
          id={props?.id ?? id}
          className={clsx("grow", props.className)}
          type={isVisiblePassword ? "text" : props.type}
        />
        {props.type === "password" && (
          <Button type="button" onClick={handleTogglePassword}>
            {isVisiblePassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        )}
      </div>
      {error && (
        <span className="mt-0.5 text-[13px] text-destructive">
          {error?.message}
        </span>
      )}
    </div>
  );
}
