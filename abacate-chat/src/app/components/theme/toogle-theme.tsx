"use client";

import { Suspense } from "react";
import { useTheme } from "./theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import {
  useModeAnimation,
  ThemeAnimationType,
} from "@/app/hooks/use-mode-animation";

export function ToogleTheme() {
  const { theme, toggleTheme } = useTheme();

  const { ref: themeButtonRef, toggleSwitchTheme } = useModeAnimation({
    isDarkMode: theme === "dark",
    onDarkModeChange: () => toggleTheme(),
    animationType: ThemeAnimationType.CIRCLE,
    duration: 500,
  });

  return (
    <Suspense>
      <div className="flex justify-end w-full mt-1 mr-6">
        <button
          ref={themeButtonRef}
          onClick={toggleSwitchTheme}
          aria-label="Toggle theme"
          className="p-2 rounded hover:bg-accent transition-colors cursor-pointer"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </Suspense>
  );
}
