"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { PageLayout } from "@/app/components/layout/page-layout";
import { videos } from "@/app/services/videos";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const video = useMemo(() => {
    return videos.find((v) => v.id === slug);
  }, [slug]);

  if (!video) {
    return (
      <PageLayout title="Academy">
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-lg font-semibold text-foreground">
            Vídeo não encontrado
          </p>
          <Button
            onClick={() => router.push("/academy")}
            className="mt-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Academy
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Academy">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/academy")}
          className="w-fit gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para todos os vídeos
        </Button>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex flex-col gap-4">
          {video.verified && (
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.396 11C20.378 10.354 20.181 9.725 19.826 9.184C19.472 8.644 18.974 8.212 18.388 7.938C18.611 7.331 18.658 6.674 18.528 6.041C18.397 5.407 18.091 4.823 17.646 4.354C17.176 3.909 16.593 3.604 15.959 3.472C15.326 3.342 14.669 3.389 14.062 3.612C13.789 3.025 13.358 2.526 12.817 2.172C12.276 1.818 11.647 1.62 11 1.604C10.354 1.621 9.727 1.817 9.187 2.172C8.647 2.527 8.218 3.026 7.947 3.612C7.339 3.389 6.68 3.34 6.045 3.472C5.41 3.602 4.825 3.908 4.355 4.354C3.91 4.824 3.606 5.409 3.477 6.042C3.347 6.675 3.397 7.332 3.621 7.938C3.034 8.212 2.534 8.643 2.178 9.183C1.822 9.723 1.623 10.353 1.604 11C1.624 11.647 1.822 12.276 2.178 12.817C2.534 13.357 3.034 13.789 3.621 14.062C3.397 14.668 3.347 15.325 3.477 15.958C3.607 16.592 3.91 17.176 4.354 17.646C4.824 18.089 5.408 18.393 6.041 18.524C6.674 18.656 7.331 18.608 7.938 18.388C8.212 18.974 8.643 19.472 9.184 19.827C9.724 20.181 10.354 20.378 11 20.396C11.647 20.38 12.276 20.183 12.817 19.829C13.358 19.475 13.789 18.975 14.062 18.389C14.666 18.628 15.328 18.685 15.965 18.553C16.601 18.421 17.185 18.106 17.645 17.646C18.105 17.186 18.421 16.602 18.553 15.965C18.685 15.328 18.628 14.666 18.388 14.062C18.974 13.788 19.472 13.357 19.827 12.816C20.181 12.276 20.378 11.646 20.396 11ZM9.662 14.85L6.233 11.422L7.526 10.12L9.598 12.192L13.998 7.398L15.345 8.644L9.662 14.85Z"
                  fill="#9EEA6C"
                />
              </svg>
              <span className="text-sm text-soft-400">Oficial AbacatePay</span>
            </div>
          )}

          <h1 className="text-2xl font-bold text-foreground">{video.title}</h1>

          <div className="flex flex-wrap gap-2">
            {video.category
              .filter((cat) => cat !== "all")
              .map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {cat}
                </span>
              ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
