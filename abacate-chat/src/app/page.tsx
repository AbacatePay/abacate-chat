"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import { ChatInterfaceV2 } from "./components/ChatInterfaceV2";

export default function Page() {
  const searchParams = useSearchParams();
  const [initialQuery, setInitialQuery] = useState<string>("");

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      const decodedQuery = decodeURIComponent(queryParam);
      setInitialQuery(decodedQuery);
    }
  }, [searchParams]);

  return (
    <div className="bg-white w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-3xl flex flex-col flex-1 overflow-hidden p-5">
        <ChatInterfaceV2 initialQuery={initialQuery} />
      </div>
      <Footer />
    </div>
  );
}
