"use client";

import { useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import { ChatInterfaceV2 } from "./components/ChatInterfaceV2";
import { Suspense } from "react";
import { AppLayout } from "./components/layout/app-layout";

function PageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query")
    ? decodeURIComponent(searchParams.get("query") || "")
    : "";
  return <ChatInterfaceV2 initialQuery={initialQuery} />;
}

function LoadingSpinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
    </div>
  );
}

export default function Page() {
  return (
    <AppLayout>
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
        <div className="relative z-10 flex w-full flex-1 flex-col overflow-hidden p-5">
          <Suspense fallback={<LoadingSpinner />}>
            <PageContent />
          </Suspense>
        </div>
        <Footer />
      </div>
    </AppLayout>
  );
}
