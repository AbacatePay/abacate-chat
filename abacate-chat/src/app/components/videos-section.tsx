"use client";
import { useState } from "react";
import { InterfaceVideo, videos } from "../services/videos";

const tabs = [
  {
    id: "todos",
    label: "todos",
    icon: null,
  },
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
  const [selectedVideo, setSelectedVideo] = useState<InterfaceVideo | null>(
    null
  );

  const filteredVideos = videos.filter(
    (video) => selectedTab === "todos" || video.category.includes(selectedTab)
  );

  const getYouTubeId = (url: string): string => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const getThumbnailUrl = (youtubeId: string): string => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row gap-2">
        <div className="flex gap-1 bg-[#F5F6F8] border-1 border-[#E2E7F1] p-1 h-10 rounded-lg overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`rounded-lg shadow-none gap-2 flex items-center px-2 sm:px-4 whitespace-nowrap flex-shrink-0 ${
                selectedTab === tab.id
                  ? "bg-white border-1 border-[#E2E7F1] text-[#0A1B39]"
                  : "bg-[#F5F6F8] text-[#6A7085]"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.icon}
              <button
                className={`cursor-pointer font-semibold text-xs sm:text-sm ${
                  selectedTab === tab.id ? "" : ""
                } shadow-none`}
              >
                {tab.label}
              </button>
            </div>
          ))}
        </div>
        <button className="flex items-center justify-center rounded-lg border-1 border-[#E2E7F1] shadow-none gap-2 w-full sm:w-auto h-10 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#6A7085"
            viewBox="0 0 256 256"
          >
            <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
          </svg>
          <p className="text-xs sm:text-sm">Escolher tech</p>
        </button>
      </div>
      <div className="mt-6">
        {selectedVideo ? (
          <div className="w-full flex flex-col">
            <div className="flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-[#0A1B39] flex-1">
                  {selectedVideo.title}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-4 py-2 text-sm text-[#6A7085] hover:text-[#0A1B39] transition-colors cursor-pointer whitespace-nowrap"
                >
                  ← Back to videos
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredVideos.map((video: InterfaceVideo) => (
              <div
                key={video.id}
                className="bg-white rounded-lg border border-[#E2E7F1] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video">
                  <img
                    src={getThumbnailUrl(video.youtubeId)}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 sm:w-6 sm:h-6 text-white ml-0.5 sm:ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-[#0A1B39] line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
