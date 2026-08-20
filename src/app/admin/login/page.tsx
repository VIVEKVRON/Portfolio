"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(searchParams.get('error') === 'unauthorized' ? 'UNAUTHORIZED ACCESS' : '');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "INVALID PASSCODE");
        setPasscode("");
      }
    } catch (err) {
      setError("SYSTEM ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blueprint min-h-screen text-muted-foreground font-mono text-xs uppercase flex justify-center items-center px-4">
      <div className="w-[400px] border border-border bg-background/50 backdrop-blur-md p-8 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foreground to-transparent opacity-50"></div>
        
        <h1 className="text-2xl font-sans tracking-widest text-foreground mb-2">{t.adminPortal}</h1>
        <p className="mb-8 lowercase">Enter secret passcode to access CMS.</p>

        {error && (
          <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 text-red-500 animate-pulse">
            [ERROR] {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input 
            type="password" 
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="ACCESS CODE" 
            required 
            className="w-full bg-transparent border-b border-border pb-4 outline-none focus:border-foreground transition-colors tracking-[0.5em] text-center text-foreground" 
          />
          <button 
            type="submit"
            disabled={loading}
            className="w-full border border-border h-[50px] flex items-center justify-center gap-4 hover:bg-foreground hover:text-background transition-all group disabled:opacity-50"
          >
            <span className="tracking-widest">{loading ? "VERIFYING..." : "AUTHENTICATE"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
