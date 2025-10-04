"use client";

import { GraduationCap } from "lucide-react";
import { PageLayout } from "@/app/components/layout/page-layout";
import { VideosGrid } from "./components/videos-grid";

export default function AcademyPage() {
  return (
    <PageLayout title="Academy">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-4 md:gap-6 md:p-6">
        <div className="hidden flex-col gap-2 md:flex">
          <div className="inline-flex items-center gap-2">
            <GraduationCap className="h-10 w-10 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Academy</h2>
          </div>
          <p className="text-base text-soft-400">
            Domine a integração e uso da AbacatePay através de vídeos tutoriais,
            documentação e exemplos práticos.
          </p>
        </div>

        <VideosGrid />
      </div>
    </PageLayout>
  );
}
