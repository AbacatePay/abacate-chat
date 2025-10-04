"use client";

import { ReactNode } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Sidebar } from "./sidebar";
import Footer from "../Footer";
import { cn } from "../lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  headerActions?: ReactNode;
  showPlatformButton?: boolean;
  showHeader?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  title,
  headerActions,
  showPlatformButton = true,
  showHeader = true,
  className,
}: PageLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        {showHeader && (
          <header className="flex h-16 w-full flex-shrink-0 items-center justify-between border-b border-border px-4 pl-20 md:h-20 md:px-6 md:pl-6">
            {title ? (
              <h1 className="text-lg font-bold text-foreground md:text-xl">
                {title}
              </h1>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-4">
              {headerActions}
              {showPlatformButton && (
                <a
                  href="https://abacatepay.com/app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="gap-2 text-xs font-semibold transition-all hover:scale-105 md:text-sm"
                  >
                    <span className="hidden sm:inline">Ir pra plataforma</span>
                    <span className="sm:hidden">Plataforma</span>
                    <ArrowRightIcon className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </a>
              )}
            </div>
          </header>
        )}

        <div className="flex flex-1 flex-col overflow-auto">
          <div className={cn("flex-1", className)}>{children}</div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
