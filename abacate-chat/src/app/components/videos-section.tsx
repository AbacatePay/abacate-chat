"use client";
import { useState } from "react";
import { InterfaceVideo, videos } from "../services/videos";

interface VideosSectionProps {
  searchQuery?: string;
}

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

export default function VideosSection({
  searchQuery = "",
}: VideosSectionProps) {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<InterfaceVideo | null>(
    null
  );

  const filteredVideos = videos.filter((video) => {
    const matchesTab =
      selectedTab === "todos" || video.category.includes(selectedTab);
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.some((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

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
                <div>
                  {selectedVideo.verified && (
                    <div className="flex items-center justify-start mb-2 gap-1">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.396 11C20.378 10.354 20.181 9.725 19.826 9.184C19.472 8.644 18.974 8.212 18.388 7.938C18.611 7.331 18.658 6.674 18.528 6.041C18.397 5.407 18.091 4.823 17.646 4.354C17.176 3.909 16.593 3.604 15.959 3.472C15.326 3.342 14.669 3.389 14.062 3.612C13.789 3.025 13.358 2.526 12.817 2.172C12.276 1.818 11.647 1.62 11 1.604C10.354 1.621 9.727 1.817 9.187 2.172C8.647 2.527 8.218 3.026 7.947 3.612C7.339 3.389 6.68 3.34 6.045 3.472C5.41 3.602 4.825 3.908 4.355 4.354C3.91 4.824 3.606 5.409 3.477 6.042C3.347 6.675 3.397 7.332 3.621 7.938C3.034 8.212 2.534 8.643 2.178 9.183C1.822 9.723 1.623 10.353 1.604 11C1.624 11.647 1.822 12.276 2.178 12.817C2.534 13.357 3.034 13.789 3.621 14.062C3.397 14.668 3.347 15.325 3.477 15.958C3.607 16.592 3.91 17.176 4.354 17.646C4.824 18.089 5.408 18.393 6.041 18.524C6.674 18.656 7.331 18.608 7.938 18.388C8.212 18.974 8.643 19.472 9.184 19.827C9.724 20.181 10.354 20.378 11 20.396C11.647 20.38 12.276 20.183 12.817 19.829C13.358 19.475 13.789 18.975 14.062 18.389C14.666 18.628 15.328 18.685 15.965 18.553C16.601 18.421 17.185 18.106 17.645 17.646C18.105 17.186 18.421 16.602 18.553 15.965C18.685 15.328 18.628 14.666 18.388 14.062C18.974 13.788 19.472 13.357 19.827 12.816C20.181 12.276 20.378 11.646 20.396 11ZM9.662 14.85L6.233 11.422L7.526 10.12L9.598 12.192L13.998 7.398L15.345 8.644L9.662 14.85Z"
                          fill="#9EEA6C"
                        />
                      </svg>

                      <p className="text-xs sm:text-sm text-[#6A7085]">
                        Oficial Abacatepay
                      </p>
                    </div>
                  )}
                  <h3 className="text-base sm:text-lg font-semibold text-[#0A1B39] flex-1">
                    {selectedVideo.title}
                  </h3>
                </div>

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
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 hover:bg-opacity-50 transition-all">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#9EEA6C] rounded-full flex items-center justify-center">
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
                  {video.verified && (
                    <div className="flex items-center justify-start mb-2 gap-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.396 11C20.378 10.354 20.181 9.725 19.826 9.184C19.472 8.644 18.974 8.212 18.388 7.938C18.611 7.331 18.658 6.674 18.528 6.041C18.397 5.407 18.091 4.823 17.646 4.354C17.176 3.909 16.593 3.604 15.959 3.472C15.326 3.342 14.669 3.389 14.062 3.612C13.789 3.025 13.358 2.526 12.817 2.172C12.276 1.818 11.647 1.62 11 1.604C10.354 1.621 9.727 1.817 9.187 2.172C8.647 2.527 8.218 3.026 7.947 3.612C7.339 3.389 6.68 3.34 6.045 3.472C5.41 3.602 4.825 3.908 4.355 4.354C3.91 4.824 3.606 5.409 3.477 6.042C3.347 6.675 3.397 7.332 3.621 7.938C3.034 8.212 2.534 8.643 2.178 9.183C1.822 9.723 1.623 10.353 1.604 11C1.624 11.647 1.822 12.276 2.178 12.817C2.534 13.357 3.034 13.789 3.621 14.062C3.397 14.668 3.347 15.325 3.477 15.958C3.607 16.592 3.91 17.176 4.354 17.646C4.824 18.089 5.408 18.393 6.041 18.524C6.674 18.656 7.331 18.608 7.938 18.388C8.212 18.974 8.643 19.472 9.184 19.827C9.724 20.181 10.354 20.378 11 20.396C11.647 20.38 12.276 20.183 12.817 19.829C13.358 19.475 13.789 18.975 14.062 18.389C14.666 18.628 15.328 18.685 15.965 18.553C16.601 18.421 17.185 18.106 17.645 17.646C18.105 17.186 18.421 16.602 18.553 15.965C18.685 15.328 18.628 14.666 18.388 14.062C18.974 13.788 19.472 13.357 19.827 12.816C20.181 12.276 20.378 11.646 20.396 11ZM9.662 14.85L6.233 11.422L7.526 10.12L9.598 12.192L13.998 7.398L15.345 8.644L9.662 14.85Z"
                          fill="#9EEA6C"
                        />
                      </svg>

                      <p className="text-sm text-[#6A7085]">
                        Oficial Abacatepay
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
