"use client";
import { useState } from "react";

const tabs = [
  {
    id: "vibe-code",
    label: "vibe-code",
    icon: null,
  },
  {
    id: "code",
    label: "code",
    icon: null,
  },
  {
    id: "low-code",
    label: "low-code",
    icon: null,
  },
  {
    id: "conceitos",
    label: "conceitos",
    icon: null,
  },
];

export default function VideosSection() {
  const [selectedTab, setSelectedTab] = useState("vibe-code");

  return (
    <>
      <div className="w-full flex gap-2">
        <div className="flex gap-2 bg-[#F5F6F8] h-10 rounded-lg">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`rounded-lg  shadow-none gap-2 flex  items-center px-4 ${
                selectedTab === tab.id
                  ? "bg-white border-1 border-[#E2E7F1] text-[#0A1B39]"
                  : "bg-[#F5F6F8] text-[#6A7085]"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.icon}
              <button
                className={`cursor-pointer font-semibold ${
                  selectedTab === tab.id ? "" : ""
                } shadow-none`}
              >
                {tab.label}
              </button>
            </div>
          ))}
        </div>
        <button className="flex items-center justify-center rounded-lg border-1 border-[#E2E7F1] shadow-none gap-2  w-auto h-10  px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#6A7085"
            viewBox="0 0 256 256"
          >
            <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
          </svg>
          <p>Escolher tech</p>
        </button>
      </div>
    </>
  );
}
