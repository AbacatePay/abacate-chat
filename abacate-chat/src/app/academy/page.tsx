"use client";

import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import SearchAcademy from "../components/search-academy";
import VideosSection from "../components/videos-section";
import Image from "next/image";
import { AppLayout } from "../components/layout/app-layout";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppLayout>
      <div className="flex h-full w-full flex-col overflow-hidden bg-background">
        {/* Header */}
        <header className="flex h-20 w-full items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-abacademy.svg"
              alt="Abacademy"
              className="h-8 w-auto"
              width={120}
              height={32}
            />
          </div>
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

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-hidden p-6">
          <div className="flex h-full w-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
            <SearchAcademy onSearchChange={setSearchQuery} />
            <VideosSection searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
