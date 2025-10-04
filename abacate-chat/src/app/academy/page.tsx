"use client";

import { ArrowRightIcon, GraduationCap } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Sidebar } from "@/app/components/layout/sidebar";
import { VideosGrid } from "./components/videos-grid";

export default function AcademyPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 w-full flex-shrink-0 items-center justify-between border-b border-border px-4 pl-20 md:h-20 md:px-6 md:pl-6">
          <h1 className="text-lg font-bold text-foreground md:text-xl">
            Academy
          </h1>
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
        </header>

        <div className="flex flex-1 flex-col overflow-auto">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-4 md:gap-6 md:p-6">
            <div className="hidden flex-col gap-2 md:flex">
              <div className="inline-flex items-center gap-2">
                <GraduationCap className="h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Academy</h2>
              </div>
              <p className="text-base text-soft-400">
                Domine a integração e uso da AbacatePay através de vídeos
                tutoriais, documentação e exemplos práticos.
              </p>
            </div>

            <VideosGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
