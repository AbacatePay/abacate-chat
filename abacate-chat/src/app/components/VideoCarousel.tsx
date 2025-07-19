import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from 'embla-carousel-autoplay'

const videos = [
  {
    id: 1,
    url: "https://www.youtube.com/embed/N0WnJexaXbE?si=tB0XdyuUIfK2foj9"
  },
  { 
    id: 2,
    url: "https://www.youtube.com/embed/uC1efuEXD_E?si=ma9GJVUUL_tgk9rV"
  },
  {
    id: 3,
    url: "https://www.youtube.com/embed/r0cfpxkSfIM?si=yN_l2MvIT8TB8NsA"
  },
  {
    id: 4,
    url: "https://www.youtube.com/embed/ZZOJNEzAPQg?si=82Z-_OWwpIJ8Qxo2"
  },
  {
    id: 5,
    url: "https://www.youtube.com/embed/eOctEl8XfW0?si=V-ogzE3WZRKx46kI"
  }
]
function VideoCarousel() {

  return (
    <Carousel opts={{ loop: true }} className="w-full flex flex-col items-center justify-center" plugins={[Autoplay({ delay: 5000 })]}>
    <CarouselContent className="-m-2">
      {videos.map((video) => (
        <CarouselItem key={video.id} className="pl-1 md:basis-1/2 lg:basis-1/3 w-full h-full">
          <iframe src={video.url} width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  );
}

export default VideoCarousel;