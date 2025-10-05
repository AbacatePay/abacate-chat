"use client";

import { ReactNode, useState } from "react";
import { cn } from "../lib/utils";

interface TooltipProps {
  children: ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
}

export function Tooltip({ children, content, side = "right" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg",
            "opacity-0 animate-[fadeIn_0.15s_ease-in-out_forwards]",
            sideClasses[side]
          )}
          style={{
            animation: "fadeIn 0.15s ease-in-out forwards",
          }}
        >
          {content}
          <div
            className={cn(
              "absolute h-2 w-2 rotate-45 bg-popover",
              side === "right" && "-left-1 top-1/2 -translate-y-1/2",
              side === "left" && "-right-1 top-1/2 -translate-y-1/2",
              side === "top" && "left-1/2 -bottom-1 -translate-x-1/2",
              side === "bottom" && "left-1/2 -top-1 -translate-x-1/2"
            )}
          />
        </div>
      )}
    </div>
  );
}
