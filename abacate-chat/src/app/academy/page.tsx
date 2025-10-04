"use client";
import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import SearchAcademy from "../components/search-academy";
import VideosSection from "../components/videos-section";
import Image from "next/image";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <div className="w-full h-screen justify-center items-center bg-gray-light">
        <div className="w-full flex justify-between items-center h-20 px-2">
          <div className="w-full flex gap-1">
            <Image
              src="/logo-abacademy.svg"
              alt="Abacademy"
              className="w-96 h-full"
              width={20}
              height={20}
            />
          </div>
          <a href="https://abacatepay.com/app">
            <Button
              variant="outline"
              className="border-gray-border text-gray-text shadow-none font-bold bg-[#F7F7F8] cursor-pointer"
            >
              <p className="text-[16px] font-semibold">Ir pra plataforma</p>
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </a>
        </div>
        <div className="px-6 w-full">
          <div className="bg-white w-full h-screen flex flex-col rounded-2xl p-6 gap-4">
            <SearchAcademy onSearchChange={setSearchQuery} />
            <VideosSection searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </>
  );
}
