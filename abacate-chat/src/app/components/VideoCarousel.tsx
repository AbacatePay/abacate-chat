"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay, { type AutoplayType } from 'embla-carousel-autoplay'
import { useEffect, useRef, useState } from 'react'

interface Video {
  id: number;
  title: string;
  videoId: string;
}

interface YouTubePlayer {
  pauseVideo(): void;
  playVideo(): void;
  stopVideo(): void;
  getPlayerState(): number;
  destroy(): void;
}

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Como integrar com Bubble.io",
    videoId: "N0WnJexaXbE"
  },
  { 
    id: 2,
    title: "Como integrar com Lovable",
    videoId: "uC1efuEXD_E"
  },
  {
    id: 3,
    title: "Como integrar com Woocommerce",
    videoId: "r0cfpxkSfIM"
  },
  {
    id: 4,
    title: "Como integrar com NextJS",
    videoId: "ZZOJNEzAPQg"
  },
  {
    id: 5,
    title: "Como integrar com um SaaS",
    videoId: "eOctEl8XfW0"
  }
]

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: YouTubePlayerConfig) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerConfig {
  height: string;
  width: string;
  videoId: string;
  playerVars?: {
    rel?: number;
    controls?: number;
    iv_load_policy?: number;
    fs?: number;
    enablejsapi?: number;
    origin?: string;
    autoplay?: number;
  };
  events?: {
    onReady?: (event: YouTubeEvent) => void;
    onStateChange?: (event: YouTubeEvent) => void;
  };
}

function VideoCarousel() {
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const autoplayRef = useRef<AutoplayType | null>(null);
  const playersRef = useRef<Map<number, YouTubePlayer>>(new Map());

  useEffect(() => { 
    const initializeYouTubeAPI = () => {
      setIsApiReady(true);
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializeYouTubeAPI;
    } else {
      initializeYouTubeAPI();
    }
  }, []);

  const onPlayerStateChange = (event: YouTubeEvent, videoId: number) => {
    if (event.data === 1) {
      setCurrentPlayingId(videoId);
      playersRef.current.forEach((player, id) => {
        if (id !== videoId) {
            player.pauseVideo();
        }
      });

      if (autoplayRef.current) {
        autoplayRef.current.stop();
      }
    } else if (event.data === 0) {
      if (currentPlayingId === videoId) {
        setCurrentPlayingId(null);
      }
    }
  };

  useEffect(() => {
    if (!isApiReady || !window.YT?.Player) return;
    const timer = setTimeout(() => {
      for (const video of videos) {
         new window.YT.Player(`youtube-player-${video.id}`, {
            height: '100%',
            width: '100%',
            videoId: video.videoId,
            playerVars: {
              rel: 0,
              controls: 1,
              iv_load_policy: 3,
              fs: 0,
              enablejsapi: 1,
              origin: window.location.origin,
              autoplay: 0
            },
            events: {
              onReady: (event: YouTubeEvent) => {
                playersRef.current.set(video.id, event.target);
              },
              onStateChange: (event: YouTubeEvent) => onPlayerStateChange(event, video.id)
            }
          });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      playersRef.current.clear();
    };
  }, [isApiReady]);

  useEffect(() => {
    autoplayRef.current = Autoplay({ delay: 1000 });
  }, []);

  return (
    <Carousel 
      className="w-full mx-auto md:max-w-[80vw] max-w-[95vw]" 
      opts={{ align: "start", loop: true }} 
      plugins={autoplayRef.current ? [autoplayRef.current] : []}
    >
    <CarouselContent className="-ml-1">
      {videos.map((video) => (
        <CarouselItem key={video.id} className="pl-1 md:basis-1/3 basis-full">
          <div className="p-4 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4 text-center">{video.title}</h2>
              <div 
                id={`youtube-player-${video.id}`}
              className="max-w-lg aspect-video"
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  );
}

export default VideoCarousel;