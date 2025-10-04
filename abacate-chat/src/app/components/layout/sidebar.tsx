"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { MessageSquare, GraduationCap, Menu, X } from "lucide-react";
import { useTheme } from "../theme/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useMemo, memo, useCallback } from "react";
import { cn } from "../lib/utils";
import {
  useModeAnimation,
  ThemeAnimationType,
} from "@/app/hooks/use-mode-animation";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { ref: themeButtonRef, toggleSwitchTheme } = useModeAnimation({
    isDarkMode: theme === "dark",
    onDarkModeChange: () => toggleTheme(),
    animationType: ThemeAnimationType.CIRCLE,
    duration: 500,
  });

  const navItems = useMemo(
    () => [
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
    ],
    [pathname]
  );

  const handleNavigation = useCallback(
    (href: string) => {
      router.push(href);
      setIsMobileMenuOpen(false);
    },
    [router]
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cn(
          "flex size-12 fixed left-2 top-2 z-20 items-center justify-center rounded-xl",
          "bg-card text-foreground transition-all duration-200",
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
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xl transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "flex h-screen flex-col border-r border-border",
          // Mobile: full sidebar with text labels on the side
          "fixed left-0 top-0 z-40 w-[80vw] max-w-xs px-4 py-4 transition-all duration-300",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: compact with icons centered and labels below
          "md:relative md:w-24 md:translate-x-0 md:items-center md:px-4 md:py-6",
          className
        )}
        style={{ backgroundColor: "var(--sidebar-background)" }}
      >
        <div className="mb-8 flex items-center justify-between gap-3 md:flex-col md:gap-2">
          <div className="flex items-center gap-3">
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
              AbacateChat
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex absolute right-5 top-5 h-8 w-8 items-center justify-center rounded-lg text-soft-400 transition-colors hover:bg-accent hover:text-foreground md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.href} className="relative">
                {item.active && (
                  <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary md:hidden" />
                )}
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "group flex w-full items-center gap-1 rounded-xl",
                    "transition-all duration-400",
                    // Mobile
                    "px-1 py-3",
                    // Desktop
                    "md:w-auto md:flex-col md:gap-2 md:px-0 md:py-3",
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50 hover:opacity-100"
                  )}
                  style={{
                    opacity: item.active ? 1 : 0.4,
                    transition: "opacity 200ms ease-in-out",
                    willChange: "opacity",
                  }}
                >
                  <div
                    className={cn(
                      "flex h-8 w-12 flex-shrink-0 items-center justify-center rounded-xl",
                      "transition-colors duration-200",
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-transform ease-linear",
                        "group-hover:scale-110",
                        {
                          "scale-110": item.active,
                        }
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "font-medium md:text-xs text-foreground",
                      "text-sm md:text-center",
                      item.active && "font-semibold"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <button
            ref={themeButtonRef}
            onClick={toggleSwitchTheme}
            className={cn(
              "flex items-center gap-3 rounded-xl transition-all duration-200",
              "w-full px-4 py-3 opacity-70 hover:opacity-100 hover:bg-accent",
              "md:w-auto md:flex-col md:gap-2 md:px-0 md:py-3"
            )}
            aria-label="Toggle theme"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-foreground transition-colors">
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </div>
            <span className="text-sm font-medium text-foreground md:text-xs md:text-center">
              {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
});
