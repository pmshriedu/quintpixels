"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  Briefcase,
  Package,
  Users,
  MessageSquare,
  Settings,
  Shield,
  Globe,
  Menu,
  X,
  ChevronRight,
  Inbox,
  Image,
  Quote,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/pixels/dashboard",
    label: "DASHBOARD",
    icon: LayoutDashboard,
    section: null,
  },
  { href: "/pixels/hero", label: "HERO", icon: Sparkles, section: "CONTENT" },
  {
    href: "/pixels/services",
    label: "SERVICES",
    icon: Briefcase,
    section: "CONTENT",
  },
  {
    href: "/pixels/portfolio",
    label: "PORTFOLIO",
    icon: Image,
    section: "CONTENT",
  },
  {
    href: "/pixels/products",
    label: "PRODUCTS",
    icon: Package,
    section: "CONTENT",
  },
  { href: "/pixels/team", label: "TEAM", icon: Users, section: "CONTENT" },
  {
    href: "/pixels/testimonials",
    label: "TESTIMONIALS",
    icon: Quote,
    section: "CONTENT",
  },
  {
    href: "/pixels/messages",
    label: "MESSAGES",
    icon: Inbox,
    section: "INBOX",
  },
  {
    href: "/pixels/forms",
    label: "FORMS",
    icon: MessageSquare,
    section: "INBOX",
  },
  {
    href: "/pixels/settings",
    label: "SETTINGS",
    icon: Settings,
    section: "SYSTEM",
  },
  { href: "/pixels/admins", label: "ADMINS", icon: Shield, section: "SYSTEM" },
  { href: "/pixels/seo", label: "SEO", icon: Globe, section: "SYSTEM" },
];

interface AdminSidebarProps {
  adminName: string;
  adminRole: string;
  unreadCount?: number;
}

export function AdminSidebar({
  adminName,
  adminRole,
  unreadCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Animate sidebar collapse
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    gsap.to(sidebar, {
      width: collapsed ? 64 : 240,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [collapsed]);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const sections = Array.from(new Set(NAV_ITEMS.map((i) => i.section)));

  const renderItems = (section: string | null) =>
    NAV_ITEMS.filter((item) => item.section === section).map((item) => {
      const isActive =
        pathname === item.href || pathname.startsWith(item.href + "/");
      const Icon = item.icon;
      return (
        <Link
          key={item.href}
          href={item.href}
          title={collapsed ? item.label : undefined}
          className={cn(
            "group relative flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200",
            "hover:bg-white/5",
            isActive
              ? "bg-white/8 text-white"
              : "text-white/40 hover:text-white/70",
          )}
        >
          {/* Active indicator */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white/60 rounded-full" />
          )}

          <Icon
            size={15}
            className={cn(
              "shrink-0 transition-all",
              isActive
                ? "text-white"
                : "text-white/40 group-hover:text-white/60",
            )}
          />

          {!collapsed && (
            <span
              className={cn(
                "font-pixel text-[9px] tracking-widest uppercase whitespace-nowrap transition-all duration-200",
                isActive
                  ? "text-white"
                  : "text-white/40 group-hover:text-white/70",
              )}
            >
              {item.label}
              {item.href === "/pixels/messages" && unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/15 font-mono text-[8px] text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </span>
          )}
        </Link>
      );
    });

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / Brand */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-white/5",
          collapsed && "justify-center px-0",
        )}
      >
        <div className="w-7 h-7 bg-[#0b0b0a] rounded-sm flex items-center justify-center shrink-0">
          <span className="font-pixel text-[8px] text-[#f7f5f2] leading-none">
            PX
          </span>
        </div>
        {!collapsed && (
          <div>
            <div className="font-pixel text-[9px] tracking-widest text-white uppercase">
              PIXELS
            </div>
            <div className="font-mono text-[8px] text-white/30 uppercase tracking-wider">
              CMS
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-5 scrollbar-none">
        {/* Dashboard */}
        <div>{renderItems(null)}</div>

        {/* Sections */}
        {["CONTENT", "INBOX", "SYSTEM"].map((section) => (
          <div key={section}>
            {!collapsed && (
              <div className="px-3 mb-2">
                <span className="font-pixel text-[7px] tracking-[0.3em] text-white/20 uppercase">
                  {section}
                </span>
              </div>
            )}
            {collapsed && <div className="h-px bg-white/5 mx-2 mb-2" />}
            {renderItems(section)}
          </div>
        ))}
      </nav>

      {/* Visit site link */}
      <div className="px-2 pb-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-sm border border-white/6 bg-white/3 hover:bg-white/6 hover:border-white/12 text-white/35 hover:text-white/60 transition-all",
            collapsed && "justify-center px-0",
          )}
        >
          <ExternalLink size={12} className="shrink-0" />
          {!collapsed && (
            <span className="font-pixel text-[7px] tracking-widest uppercase">
              VISIT SITE
            </span>
          )}
        </Link>
      </div>

      {/* Admin profile */}
      <div className="border-t border-white/5 p-3">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center",
          )}
        >
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span className="font-pixel text-[8px] text-white/70">
              {adminName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-sans text-[11px] text-white/70 truncate">
                {adminName}
              </div>
              <div className="font-pixel text-[7px] text-white/30 uppercase tracking-widest">
                {adminRole}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div
        ref={sidebarRef}
        style={{ width: 240 }}
        className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 bg-[#0b0b0a] border-r border-white/5 shrink-0 overflow-hidden z-40",
          "transition-none", // GSAP handles width
        )}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className={cn(
            "absolute top-5 z-10 w-5 h-5 flex items-center justify-center rounded-full",
            "bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors",
            collapsed ? "right-3.5" : "right-3",
          )}
        >
          <ChevronRight
            size={10}
            className={cn(
              "transition-transform",
              collapsed ? "" : "rotate-180",
            )}
          />
        </button>

        {sidebarContent}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-sm bg-[#0b0b0a] border border-white/10 text-white/60 hover:text-white"
      >
        <Menu size={16} />
      </button>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 h-full bg-[#0b0b0a] border-r border-white/5 flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-white/40 hover:text-white"
            >
              <X size={14} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
