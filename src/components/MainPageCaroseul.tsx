import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShoppingCard } from "./ShoppingCard"

type CarouselType = "leaving" | "new" | "cheap" | "expensive"

interface CarouselProps{
  title: string
  ctype: CarouselType
}




export default function MainPageCaroseul({ title, ctype }:CarouselProps) {
  const iterarr = [1,2,3,4,5,6,7,8]
  
  async function getItems(){

  }
  return (
    <>
      <div className="py-8">
      <h3 className={(ctype == "leaving" ? "text-red-600 " : "") + " text-6xl pb-6"}>{title}</h3>
      <div className="w-[90vw] place-self-center">
      <Carousel className="space-x-4 align-middle -ml-4">
        <CarouselPrevious className="max-sm:hidden"/>
        <CarouselContent className="*:text-blue-400 *:text-xl *:justify center ">
          {iterarr.map( (_,index,length) =>
          <CarouselItem className="md:basis-1/4 sm:basis-1/2" key={index}>
            <ShoppingCard
            name={"Chippi Chappa"}
            image={"https://hc-cdn.hel1.your-objectstorage.com/s/v3/21e1090efd1da6fa6b37a178617af9237fc139b2_image.png"}
            price={23}
            rating={4}
            id={'1c7c468b-e3a8-4d83-a6f7-51305db89929'}
            />
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