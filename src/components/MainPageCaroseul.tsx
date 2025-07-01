import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShoppingCard } from "../components/ShoppingCard"

export default function Header() {
  const iterarr = [1,2,3,4,5]
  return (
      <div>
      <h3 className="text-6xl text-red-600 py-3">Leaving Fast</h3>
      <div className="w-[95vw]">
      <Carousel className="ml-20 space-x-4 align-middle">
        <CarouselPrevious className=""/>
        <CarouselContent className="*:text-blue-400 *:bg-blue-300 :p-4 *:text-xl *:justify center  w-fit">
          {iterarr.map( (_,index) => 
          <CarouselItem className="basis-1/3" key={index}>
            <ShoppingCard/>
          </CarouselItem>
          )}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
      </div>
      </div>
  );
}