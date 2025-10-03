"use client";
import { useState } from "react";


export default function VideosSection() {
  const [selectedTab, setSelectedTab] = useState("vibe-code");

  return (
    <>
      <div className="flex gap-2">
        <div
          className={`bg-[#F5F6F8] rounded-lg border-1 border-[#E2E7F1] shadow-none gap-2 flex w-auto h-10 items-center px-4 ${
            selectedTab === "vibe-code"
              ? "bg-white border-1 border-[#E2E7F1]"
              : ""
          }`}
          onClick={() => setSelectedTab("vibe-code")}
        >
          <div
            className={`text-[#6A7085] font-semibold ${
              selectedTab === "vibe-code" ? "text-[#0A1B39]" : ""
            } shadow-none`}
          >
            Vibe-code
          </div>
        </div>
        <div
          className={`bg-[#F5F6F8] rounded-lg border-1 border-[#E2E7F1] shadow-none gap-2 flex w-auto h-10 items-center px-4 ${
            selectedTab === "escolher-tech"
              ? "bg-white border-1 border-[#E2E7F1]"
              : ""
          }`}
          onClick={() => setSelectedTab("escolher-tech")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.50133 1.99609V3.49609M11.5013 1.99609V3.49609M2 12.4961V4.99409C2 4.59627 2.15804 4.21474 2.43934 3.93343C2.72064 3.65213 3.10218 3.49409 3.5 3.49409H12.5C12.8978 3.49409 13.2794 3.65213 13.5607 3.93343C13.842 4.21474 14 4.59627 14 4.99409V12.4948M14 12.4948C14 12.8926 13.842 13.2741 13.5607 13.5554C13.2794 13.8367 12.8978 13.9948 12.5 13.9948H3.5C3.10218 13.9948 2.72064 13.8367 2.43934 13.5554C2.15804 13.2741 2 12.8926 2 12.4948V7.49476C2 7.09694 2.15804 6.7154 2.43934 6.4341C2.72064 6.1528 3.10218 5.99476 3.5 5.99476H12.5C12.8978 5.99476 13.2794 6.1528 13.5607 6.4341C13.842 6.7154 14 7.09694 14 7.49476V12.4948ZM9.5 8.49476H11M5 9.99476H8M8.00133 8.49476H8.00467V8.49876H8.00133V8.49476ZM8.00067 11.4948H8.00467V11.4988H8.00067V11.4948ZM6.50067 11.4954H6.504V11.4994H6.50133V11.4954H6.50067ZM5.00067 11.4954H5.004V11.4988H5V11.4954H5.00067ZM9.50067 9.99743H9.504V10.0008H9.50067V9.99743ZM9.50067 11.4954H9.50467V11.4994H9.50067V11.4954ZM11.0007 9.99676H11.0047V10.0001H11.0013L11.0007 9.99676Z"
              stroke="#6A7085"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div
            className={`text-[#6A7085] font-semibold ${
              selectedTab === "escolher-tech" ? "text-[#0A1B39]" : ""
            } shadow-none`}
          >
            Escolher tech
          </div>
        </div>
      </div>
    </>
  );
}
