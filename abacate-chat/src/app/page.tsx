"use client";

import { useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import { ChatInterfaceV2 } from "./components/ChatInterfaceV2";
import { Suspense } from "react";
import Image from "next/image";
import { ToogleTheme } from "./components/theme/ToogleTheme";

function PageContent (){
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') ? decodeURIComponent(searchParams.get('query') || '') : "";
  return <ChatInterfaceV2 initialQuery={initialQuery} />
}

function ThemeToggle() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>}>
    <ToogleTheme />
    </Suspense>
  )
}
export default function Page() {
 
  return (
    <>
    
    <div className="bg-background w-full h-screen flex flex-col justify-center items-center overflow-hidden relative">
       <ThemeToggle />  
      <div className="w-full flex flex-col flex-1 overflow-hidden p-5 relative z-10">
      <Suspense fallback={<div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>}>
        <PageContent />
      
        </Suspense>
      </div>
      <Footer />
    </div>
    </>
  );
}

