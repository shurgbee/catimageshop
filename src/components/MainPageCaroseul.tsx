import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShoppingCard } from "./ShoppingCard"

type CarouselType = "leaving" | "new" | "cheap" | "expensive"

interface CarouselProps{
  title: string
  ctype: CarouselType
}


export default function MainPageCaroseul({ title, ctype }:CarouselProps) {
  const iterarr = [1,2,3,4,5,6,7,8]
  return (
    <>
      <div className="py-8">
      <h3 className={(ctype == "leaving" ? "text-red-600 " : "") + " text-6xl pb-6"}>{title}</h3>
      <div className="w-[90vw] place-self-center">
      <Carousel className="space-x-4 align-middle -ml-4">
        <CarouselPrevious className="max-sm:hidden"/>
        <CarouselContent className="*:text-blue-400 :p-4 *:text-xl *:justify center  w-fit">
          {iterarr.map( (_,index,length) => 
          <CarouselItem className="basis-1/6" key={index}>
            <ShoppingCard/>
          </CarouselItem>
          )}
        </CarouselContent>
        <CarouselNext className="max-sm:hidden"/>
      </Carousel>
      </div>
      </div>
    </>
  );
}