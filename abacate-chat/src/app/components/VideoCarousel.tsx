import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from 'embla-carousel-autoplay'

const videos = [
  {
    id: 1,
    title: "Como integrar com Bubble.io",
    url: "https://www.youtube.com/embed/N0WnJexaXbE?si=tB0XdyuUIfK2foj9"
  },
  { 
    id: 2,
    title: "Como integrar com Lovable",
    url: "https://www.youtube.com/embed/uC1efuEXD_E?si=ma9GJVUUL_tgk9rV"
  },
  {
    id: 3,
    title: "Como integrar com WooCommerce",
    url: "https://www.youtube.com/embed/r0cfpxkSfIM?si=yN_l2MvIT8TB8NsA"
  },
  {
    id: 4,
    title: "Como integrar com NextJS",
    url: "https://www.youtube.com/embed/ZZOJNEzAPQg?si=82Z-_OWwpIJ8Qxo2"
  },
  {
    id: 5,
    title: "Como integrar com um SaaS",
    url: "https://www.youtube.com/embed/eOctEl8XfW0?si=V-ogzE3WZRKx46kI"
  }
]
// 
function VideoCarousel() {

  return (
    <Carousel className="w-full md:max-w-xl max-w-[80vw] mx-auto" opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000 })]}>
    <CarouselContent className="-ml-1">
      {videos.map((video) => (
        <CarouselItem key={video.id} className="pl-1 basis-full">
          <div className="p-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
            <iframe 
              src={`${video.url}&rel=1&controls=0&iv_load_policy=3&fs=0`} 
              width="500px" 
              height="300px" 
              className="max-w-lg aspect-video"
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; " 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
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