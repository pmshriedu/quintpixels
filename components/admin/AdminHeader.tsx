"use client";

import { useTransition } from "react";
import { logout } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0d0c0b]">
      <div>
        <h1 className="font-pixel text-[13px] tracking-widest text-white/90 uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="font-mono text-[10px] text-white/30 mt-0.5 uppercase tracking-wider">
            {subtitle}
          </p>
        )}
      </div>

      <button
        onClick={handleLogout}
        disabled={pending}
        className="flex items-center gap-2 px-3 py-1.5 text-white/30 hover:text-white/70 transition-colors rounded-sm hover:bg-white/5 group"
      >
        <span className="font-pixel text-[8px] tracking-widest uppercase hidden sm:block group-hover:text-white/50">
          LOGOUT
        </span>
        <LogOut size={13} />
      </button>
    </header>
  );
}
