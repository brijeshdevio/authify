import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: { message?: string }
}

export function Input({
  label,
  error,
  className,
  type,
  id,
  ...props
}: InputProps) {
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false)
  const generatedId = React.useId()

  const inputId = id ?? generatedId

  const handleTogglePassword = () => {
    setIsVisiblePassword((prev) => !prev)
  }

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <Label
          htmlFor={inputId}
          className="text-sm font-bold tracking-widest text-slate-500 uppercase"
        >
          {label}
        </Label>
      )}

      <div
        className={cn(
          "flex items-center border border-input bg-transparent px-2.5 py-2",
          "focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/50",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20",
          "dark:bg-input/30 dark:disabled:bg-input/80",
          className
        )}
      >
        <input
          {...props}
          id={inputId}
          type={isVisiblePassword ? "text" : type}
          className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground md:text-xs"
        />

        {type === "password" && (
          <button type="button" onClick={handleTogglePassword}>
            {isVisiblePassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  )
}
