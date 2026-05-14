"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Cars", href: "/cars", icon: Car },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && <div className="mobile-overlay lg:hidden" onClick={onClose} />}

      <aside
        className="sidebar fixed left-0 top-0 z-50 flex h-full flex-col transition-transform duration-300 lg:relative lg:translate-x-0"
        style={{
          width: 260,
          transform: isOpen ? "translateX(0)" : undefined,
        }}
        data-open={isOpen}
      >
        {/* Responsive hide on mobile when closed */}
        <style>{`
          @media (max-width: 1023px) {
            .sidebar[data-open="false"] { transform: translateX(-100%); }
          }
        `}</style>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            height: 64,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            borderBottom: "1px solid var(--color-border-dim)",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div
              className="sidebar-logo-icon"
              style={{
                display: "flex",
                height: 36,
                width: 36,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              <Zap style={{ height: 20, width: 20, color: "white" }} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>BYD</div>
              <div style={{ fontSize: 10, color: "var(--color-text-dim)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Admin CMS
              </div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="cms-btn cms-btn-ghost cms-btn-icon lg:hidden"
          >
            <ChevronLeft style={{ height: 16, width: 16 }} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 0.75rem", marginBottom: 12 }}>
            Navigation
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                >
                  <item.icon style={{ height: 18, width: 18 }} />
                  {item.title}
                  <span className="nav-dot" />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div style={{ borderTop: "1px solid var(--color-border-dim)", padding: 16 }}>
          <div className="sidebar-info-card">
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-accent-blue-text)" }}>BYD CMS</div>
            <div style={{ fontSize: 11, color: "var(--color-text-dim)", marginTop: 4 }}>Build Your Dreams</div>
            <div style={{ fontSize: 10, color: "var(--color-text-dim)", marginTop: 8 }}>v1.0.0</div>
          </div>
        </div>
      </aside>
    </>
  );
}
