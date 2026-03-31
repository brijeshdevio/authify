import { Button } from "@/shared/ui/Button";
import {
  ArrowRight,
  CloudLightning,
  Fingerprint,
  Key,
  MotorbikeIcon,
  ShieldCheck,
  Terminal,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mb-20 flex flex-col">
      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center px-4 pt-24 pb-20 text-center sm:pt-32 sm:pb-24 lg:pb-32">
        {/* Subtle background glow effect if desired */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-20"></div>

        <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-widest text-blue-700 uppercase">
          <ShieldCheck className="mr-2 h-4 w-4" />
          V2.0 Now Production Ready
        </div>

        <h1 className="max-w-4xl text-5xl font-black tracking-tighter text-slate-950 sm:text-7xl md:leading-tight">
          Your most secure way <span className="block">to authenticate.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed font-medium text-slate-600 sm:text-xl">
          A production-ready UI system for a modern web. Built for speed,
          designed for security, and crafted for developers.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Button className="w-full sm:w-auto">
            <Link to="/register">Get Started</Link>
          </Button>

          <Button className="group w-full sm:w-auto">
            <Link to="/login">
              Login
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ─── Feature Grid ────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Box 1: Encrypted Vault */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10 md:col-span-7">
            <div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                Encrypted Identity Vault
              </h3>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-500">
                Our architecture ensures user data never leaves your environment
                unencrypted. Zero-knowledge by design.
              </p>
            </div>

            {/* Visual Stub */}
            <div className="mt-10 flex gap-4">
              <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Key className="h-4 w-4" />
                  </div>
                  <div className="h-2 w-16 rounded-full bg-slate-200"></div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100"></div>
                <div className="h-2 w-3/4 rounded-full bg-slate-100"></div>
              </div>

              <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 opacity-60 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="h-2 w-16 rounded-full bg-slate-200"></div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100"></div>
                <div className="h-2 w-3/4 rounded-full bg-slate-100"></div>
              </div>
            </div>
          </div>

          {/* Box 2: Lightning Fast */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#2e26b1] bg-linear-to-br from-[#4534e1] to-[#2e26b1] p-8 text-white shadow-lg sm:p-10 md:col-span-5">
            <CloudLightning className="absolute top-8 right-8 h-16 w-16 -rotate-12 text-white/20" />

            <div className="mt-auto pt-32">
              <h3 className="mb-3 text-2xl font-bold tracking-tight">
                Lightning Fast
              </h3>
              <p className="text-[15px] leading-relaxed text-blue-100/80">
                Under 50ms latency for all authentication global handshakes.
              </p>
            </div>
          </div>

          {/* Box 3: SDK First */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-blue-100 bg-[#dcedff] p-8 text-center text-slate-900 shadow-sm sm:p-10 md:col-span-4">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white text-[#4534e1] shadow-sm">
              <Terminal className="h-8 w-8" />
            </div>

            <h3 className="mb-2 text-xl font-bold">SDK First</h3>
            <p className="mt-1 font-mono text-sm text-slate-600">
              npm install @authify/core
            </p>
          </div>

          {/* Box 4: Multi-Factor */}
          <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:flex-row sm:p-10 md:col-span-8">
            <div className="flex-1">
              <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">
                Multi-Factor Anywhere
              </h3>
              <p className="mb-8 max-w-sm text-[15px] leading-relaxed text-slate-500">
                Seamlessly integrate biometrics, hardware keys, and magic links
                with a single component.
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-[#f0f4f8] text-[#4534e1]">
                  <Fingerprint className="h-6 w-6" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4534e1] text-white shadow-md shadow-[#4534e1]/20">
                  <MotorbikeIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Shield Visual Placeholder replacing the complex 3D image */}
            <div className="relative flex h-64 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-slate-800 to-slate-950 p-6 shadow-xl sm:w-64">
              <div className="absolute inset-0 m-2 rounded-2xl border border-white/10 bg-white/5"></div>

              {/* Simulated metal shield lines */}
              <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-700/50"></div>
              <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-600/50"></div>

              <div className="absolute left-1/2 h-full w-[2px] -translate-x-1/2 bg-slate-700/50"></div>
              <div className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 bg-slate-700/50"></div>

              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trusted By Logos ──────────────────────────────────────────── */}
      <section className="container mx-auto max-w-7xl px-4 pt-16 pb-12 text-center">
        <p className="mb-10 text-xs font-bold tracking-widest text-[#9ca3af] uppercase">
          Trusted by the next generation of builders
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale transition-all hover:grayscale-0 md:gap-16">
          <span className="text-2xl font-black tracking-tighter text-slate-800 italic">
            VENTURE
          </span>
          <span className="text-2xl font-bold tracking-widest text-slate-800 uppercase">
            QUANTUM
          </span>
          <span className="text-2xl font-black tracking-tighter text-slate-800">
            NEXUS
          </span>
          <span className="text-2xl font-bold text-slate-800 italic">
            STARK
          </span>
          <span className="text-2xl font-black tracking-widest text-slate-800 italic">
            ORBIT
          </span>
        </div>
      </section>
    </div>
  );
}
