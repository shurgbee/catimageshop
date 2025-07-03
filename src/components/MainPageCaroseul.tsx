'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShoppingCard } from "./ShoppingCard"
import { CarouselType, ItemProps, CarouselProps } from "../app/types";
import { populateCarousel } from "@/app/db";
import { useEffect, useState } from "react";


export default function MainPageCaroseul({ title, ctype}: CarouselProps) {
  const [items, setItems] = useState<ItemProps[]>([])
  useEffect(()=>{
    async function fetchItems(){
      const tempItems = await populateCarousel(ctype)
      console.log(tempItems);
      if(tempItems) setItems(tempItems)
    }
    fetchItems()
  }, [])
  return (
    <>
      <div className="py-8">
        <h3
          className={
            (ctype === CarouselType.leavingSoon ? "text-red-600 " : "") + " text-6xl pb-6"
          }
        >
          {title}
        </h3>
        <div className="w-[90vw] place-self-center">
          <Carousel className="space-x-4 align-middle -ml-4">
            <CarouselPrevious className="max-sm:hidden" />
            <CarouselContent className="*:text-blue-400 *:text-xl *:justify center ">
              {items.map((item, index) => (
                <CarouselItem className="md:basis-1/4 sm:basis-1/2" key={index}>
                  <ShoppingCard
                    name={item.name}
                    image={item.image || ""}
                    price={+item.price}
                    rating={item.rating}
                    id={item.id}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="max-sm:hidden" />
          </Carousel>
        </div>
      </div>
    </>
  );
}