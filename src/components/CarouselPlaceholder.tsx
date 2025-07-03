'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"
import { ShoppingButton } from "./ShoppingButton"
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