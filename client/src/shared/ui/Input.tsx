import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { clsx } from "clsx";

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
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const id = useId();

  const handleTogglePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor={props?.id ?? id}
            className="text-neutral-content text-[13px] font-medium"
          >
            {label}
          </label>
        )}
        {leftEle && leftEle}
      </div>
      <div
        className={clsx(
          "input flex w-full items-center gap-2",
          wrapperClassName || "rounded-lg",
        )}
      >
        {leftIcon && (
          <span className="text-base-content/40 flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          {...props}
          id={props?.id ?? id}
          className={clsx("grow", props.className)}
          type={isVisiblePassword ? "text" : props.type}
        />
        {props.type === "password" && (
          <button
            type="button"
            className="text-base-content/40 hover:text-base-content flex items-center transition-colors"
            onClick={handleTogglePassword}
          >
            {isVisiblePassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-error mt-0.5 text-[13px]">{error?.message}</span>
      )}
    </div>
  );
}
