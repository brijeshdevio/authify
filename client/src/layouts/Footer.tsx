import { BrickWallShield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-base-100/70 text-base-content/70 rounded-t-xl border-t border-white/10 px-4 py-8 text-sm">
      <div className="mx-auto max-w-md space-y-3 text-center">
        {/* Logo and Name */}
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <BrickWallShield className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight">
              Authify
            </span>
            <span className="text-base-content/50 text-[11px] font-medium tracking-[0.18em] uppercase">
              Security, at your fingertips
            </span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-neutral-content text-xs">
          &copy; {new Date().getFullYear()} Authify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
