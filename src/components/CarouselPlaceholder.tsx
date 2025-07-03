'use client'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { CarouselItem } from "./ui/carousel"
import { Skeleton } from "./ui/skeleton"


export function CarouselPlaceholder() {
  return (
    <CarouselItem className="md:basis-1/4 sm:basis-1/2">
        <Card>
        <CardContent className="flex flex-col gap-4">
            <Skeleton className=" h-[100]"/>
            <Skeleton className=" h-[20]"/>
            <Skeleton className=" h-[20]"/>
            <Skeleton className="w-1/2 h-[20]"/>
        </CardContent>
        </Card>
    </CarouselItem>
  )
}