import { cn } from "../lib/cn.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../lib/auth.ts";
import { Logomark } from "../components/Logomark.tsx";
import { Grain } from "../components/Grain.tsx";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (signIn(email, pass)) {
      nav("/admin");
    } else {
      setErr("Invalid email or password");
    }
  };

  return (
    <div
      className={cn(
        "relative min-h-screen flex items-center justify-center p-4",
      )}
    >
      <Grain />

      {/* Card */}
      <div
        className={cn(
          "w-full max-w-md rounded-sm border border-bone/15 bg-panel shadow-lg",
        )}
      >
        {/* Tri-color bar */}
        <div className={cn("flex h-1 w-full rounded-t-sm overflow-hidden")}>
          <span className={cn("flex-1 bg-em-yellow")} />
          <span className={cn("flex-1 bg-em-red")} />
          <span className={cn("flex-1 bg-em-blue")} />
        </div>

        <form
          onSubmit={handleSubmit}
          className={cn("flex flex-col gap-5 p-6 lg:p-8")}
        >
          {/* Brand */}
          <div className={cn("flex items-center gap-3")}>
            <Logomark size={28} />
          </div>

          {/* Title */}
          <h1 className={cn("text-2xl font-extrabold tracking-tight text-bone")}>
            Front desk
          </h1>
          <p className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50")}>
            Demo: <strong>admin@emmatos.ng</strong> / <strong>front-desk</strong>
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-sm border border-bone/20 bg-ink text-bone",
              "font-mono text-sm tracking-wider outline-none transition-colors duration-200",
              "focus:border-em-yellow focus:ring-1 focus:ring-em-yellow/20",
            )}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-sm border border-bone/20 bg-ink text-bone",
              "font-mono text-sm tracking-wider outline-none transition-colors duration-200",
              "focus:border-em-yellow focus:ring-1 focus:ring-em-yellow/20",
            )}
          />

          {/* Submit */}
          <button
            type="submit"
            className={cn(
              "w-full py-3 rounded-sm font-mono text-xs uppercase tracking-[0.25em] font-bold",
              "bg-em-yellow text-ink cursor-pointer",
              "hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150",
            )}
          >
            Sign in
          </button>

          {/* Error */}
          {err && (
            <p className={cn("font-mono text-2xs uppercase tracking-wider text-em-red/70")}>
              {err}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}