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
        {/* Header - Full Width */}
        <header className="flex h-20 w-full flex-shrink-0 items-center justify-between border-b border-border px-6 pl-20 md:pl-6">
          <h1 className="text-xl font-bold text-foreground">Academy</h1>
          <a
            href="https://abacatepay.com/app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="gap-2 font-semibold transition-all hover:scale-105"
            >
              Ir pra plataforma
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </a>
        </header>

        <div className="flex flex-1 flex-col overflow-auto">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
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
