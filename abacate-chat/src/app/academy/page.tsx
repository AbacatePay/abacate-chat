"use client";

import { useState } from "react";
import { ArrowRightIcon, GraduationCap } from "lucide-react";
import { Button } from "../components/ui/button";
import SearchAcademy from "../components/search-academy";
import VideosSection from "../components/videos-section";
import { Sidebar } from "../components/layout/sidebar";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

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

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden p-6">
            <div className="mb-6">
              <div className="inline-flex gap-2 items-center justify-center">
                <GraduationCap className="size-10" />
                <h2 className="text-2xl font-bold text-foreground">Academy</h2>
              </div>
              <p className="text-base text-soft-400">
                Domine a integração e uso da AbacatePay através de vídeos
                tutoriais, documentação e exemplos práticos.
              </p>
            </div>

            <div className="flex h-full w-full flex-col gap-4 overflow-hidden">
              <SearchAcademy onSearchChange={setSearchQuery} />
              <VideosSection searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
