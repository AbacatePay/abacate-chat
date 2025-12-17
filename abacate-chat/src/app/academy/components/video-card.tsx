"use client";

import { Play } from "lucide-react";
import Link from "next/link";
import { InterfaceVideo } from "@/app/services/videos";

interface VideoCardProps {
  video: InterfaceVideo;
}

const getThumbnailUrl = (youtubeId: string): string => {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      href={`/academy/${video.id}`}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-soft-100">
        <img
          src={getThumbnailUrl(video.youtubeId)}
          alt={video.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all group-hover:bg-black/40">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 shadow-lg">
            <Play className="ml-1 h-7 w-7 fill-black text-black" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
          {video.title}
        </h3>

        {video.verified && (
          <div className="mt-2 flex items-center gap-1.5">
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
            <span className="text-xs text-soft-400">Oficial AbacatePay</span>
          </div>
        )}
      </div>
    </Link>
  );
}
