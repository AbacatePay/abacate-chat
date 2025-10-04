"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { MessageSquare, GraduationCap, Plus, Menu, X } from "lucide-react";
import { useTheme } from "../theme/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      icon: MessageSquare,
      label: "Chat",
      href: "/",
      active: pathname === "/",
    },
    {
      icon: GraduationCap,
      label: "Academy",
      href: "/academy",
      active: pathname === "/academy",
    },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cn(
          "fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-xl",
          "bg-card text-foreground shadow-lg transition-all duration-200 border border-border",
          "hover:bg-accent active:scale-95",
          "md:hidden"
        )}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "flex h-screen flex-col border-r border-border bg-card",
          // Mobile: full sidebar with text labels on the side
          "fixed left-0 top-0 z-40 w-[90vw] max-w-xs px-4 py-6 transition-all duration-300",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: compact with icons centered and labels below
          "md:relative md:w-24 md:translate-x-0 md:items-center md:px-4 md:py-6",
          className
        )}
      >
        {/* Logo - Mobile: left aligned with text, Desktop: centered icon only */}
        <div className="mb-8 flex items-center gap-3 md:flex-col md:gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-abacate-100">
            <Image
              src="/logo.svg"
              alt="AbacatePay"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </div>
          <span className="text-base font-bold text-foreground md:hidden">
            AbacatePay
          </span>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => handleNavigation("/")}
          className={cn(
            "mb-8 flex items-center gap-3 rounded-xl transition-all duration-200",
            // Mobile: full width with text on side
            "w-full px-4 py-3 hover:bg-accent",
            // Desktop: compact with icon and text below
            "md:w-auto md:flex-col md:gap-2 md:px-0 md:py-3"
          )}
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-foreground md:text-xs">
            Nova Conversa
          </span>
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "flex items-center gap-3 rounded-xl transition-all duration-200",
                  // Mobile: full width with text on side
                  "w-full px-4 py-3",
                  // Desktop: compact with icon and text below
                  "md:w-auto md:flex-col md:gap-2 md:px-0 md:py-3",
                  "hover:bg-accent",
                  item.active && "bg-accent"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-colors",
                    item.active
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "font-medium md:text-xs",
                    "text-sm md:text-center",
                    item.active
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="flex flex-col gap-2 border-t border-border pt-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "flex items-center gap-3 rounded-xl transition-all duration-200",
              "w-full px-4 py-3 hover:bg-accent",
              "md:w-auto md:flex-col md:gap-2 md:px-0 md:py-3"
            )}
            aria-label="Toggle theme"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors">
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </div>
            <span className="text-sm font-medium text-muted-foreground md:text-xs md:text-center">
              {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            </span>
          </button>

          {/* Platform Link */}
          <a
            href="https://abacatepay.com/app"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 rounded-xl transition-all duration-200",
              "w-full px-4 py-3 hover:bg-accent",
              "md:w-auto md:flex-col md:gap-2 md:px-0 md:py-3"
            )}
            aria-label="Plataforma AbacatePay"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-abacate-500">
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground md:text-xs md:text-center">
              Plataforma
            </span>
          </a>
        </div>
      </aside>
    </>
  );
}
