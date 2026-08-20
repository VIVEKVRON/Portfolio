"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-colors">
      TERMINATE SESSION
    </button>
  );
}
