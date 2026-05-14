"use client";

import { Menu, Bell, User, LogOut, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // Handle actual logout logic here later if needed
  };

  return (
    <header className="navbar" style={{ position: "sticky", top: 0, zIndex: 30, display: "flex", height: 64, alignItems: "center", justifyContent: "space-between", padding: "0 1rem" }}>
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onToggleSidebar}
          className="cms-btn cms-btn-ghost cms-btn-icon lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu style={{ height: 20, width: 20 }} />
        </button>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="cms-btn cms-btn-ghost cms-btn-icon" style={{ position: "relative" }} aria-label="Notifications">
              <Bell style={{ height: 18, width: 18 }} />
              <span className="notification-dot" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" sideOffset={5} className="radix-select-content" style={{ width: 280, padding: "0.5rem" }}>
              <div style={{ padding: "0.5rem 0.5rem", borderBottom: "1px solid var(--color-border-dim)", marginBottom: "0.25rem" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Notifications</p>
              </div>
              <div style={{ padding: "1rem 0.5rem", textAlign: "center", color: "var(--color-text-dim)", fontSize: 13 }}>
                No new notifications
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: 8, paddingLeft: 12, borderLeft: "1px solid var(--color-border-dim)" }}>
          <div className="hidden sm:block" style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "white" }}>Admin</div>
            <div style={{ fontSize: 11, color: "var(--color-text-dim)" }}>admin@byd.com</div>
          </div>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}>
                <div className="user-avatar" style={{ transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                  <User style={{ height: 16, width: 16, color: "white" }} />
                </div>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="end" sideOffset={8} className="radix-select-content" style={{ width: 220 }}>
                <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-border-dim)", marginBottom: "0.25rem", display: "flex", flexDirection: "column", gap: 2 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "white" }}>Admin User</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-dim)" }}>admin@byd.com</p>
                </div>
                
                <DropdownMenu.Item asChild>
                  <Link href="/settings" className="radix-select-item" style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: "1rem", outline: "none", textDecoration: "none" }}>
                    <SettingsIcon style={{ height: 14, width: 14 }} />
                    Settings
                  </Link>
                </DropdownMenu.Item>
                
                <DropdownMenu.Separator style={{ height: 1, backgroundColor: "var(--color-border-dim)", margin: "0.25rem 0" }} />
                
                <DropdownMenu.Item onSelect={handleLogout} className="radix-select-item" style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: "1rem", color: "#f87171", outline: "none" }}>
                  <LogOut style={{ height: 14, width: 14 }} />
                  Log out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
