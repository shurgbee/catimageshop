import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShoppingCard } from "../components/ShoppingCard"
import MainPageCarousel from "../components/MainPageCaroseul"

export default function Home() {
  return (
    <>
      <h1 className="text-9xl py-3">Welcome In!</h1>
      <MainPageCarousel/>
    </>
  );
}
