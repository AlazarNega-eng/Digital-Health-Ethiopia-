'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Sun, Moon, Bell, UserCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Patients", href: "/patients" },
  { label: "Appointments", href: "/appointments" },
  { label: "Settings", href: "/settings" },
];

function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  // Avoid hydration mismatch by only rendering after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // No saved preference, use system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);
  useEffect(() => {
    if (!mounted) return;
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);
  if (!mounted) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className="rounded-full"
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-secondary dark:from-background dark:to-[#23272f]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-sidebar shadow-xl rounded-r-3xl border-r border-sidebar-border flex flex-col p-6 gap-4 relative z-10 text-foreground dark:text-foreground">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow">
            <span>T</span>
          </div>
          <span className="text-2xl font-bold text-primary dark:text-primary-foreground tracking-tight">TenaID</span>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg px-4 py-2 text-base font-medium hover:bg-primary/10 dark:hover:bg-primary/20 transition"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <Card className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl shadow-inner">
            <div className="text-xs text-muted-foreground mb-1">Verified by National ID</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">Active</span>
            </div>
          </Card>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen text-foreground dark:text-foreground">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-background border-b border-border flex items-center px-10 justify-between shadow-sm z-10 text-foreground dark:text-foreground">
          <div className="flex items-center gap-4">
            <span className="font-bold text-2xl tracking-tight text-primary dark:text-primary-foreground">Welcome, Doctor</span>
            <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition" />
          </div>
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <Button variant="outline" className="rounded-full px-3 flex items-center gap-2">
              <UserCircle className="w-5 h-5" />
              <span className="hidden md:inline">Profile</span>
            </Button>
            <Button variant="destructive" className="rounded-full px-3">Logout</Button>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto bg-background dark:bg-background/90 text-foreground dark:text-foreground">{children}</main>
      </div>
    </div>
  );
} 