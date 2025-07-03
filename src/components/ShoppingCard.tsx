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

interface CardProps {
    image: string,
    name: string,
    rating: number,
    price: number,
    id: string
}


export function ShoppingCard({ image, name, rating, price, id }:CardProps) {
  return (
    <Card className="w-xs h-xs p-3 gap-2">
            <a href={"/items/"+id} className="font-bold text-2xl justify-self-center truncate hover:underline">
              <img src={image} width={256} height={256} alt="Shop Item" className="s-[256px] overflow-hidden justify-self-center rounded-2xl aspect-video"/>
            </a>
            <div className="flex-col flex">
            <a href={"/items/"+id} className="font-bold text-2xl justify-self-center truncate hover:underline">{name}</a>
                <div className="flex flex-initial flex-row items-center content-center *:text-base">
                    <FontAwesomeIcon icon={faStar} className="text-orange-500"/>
                    <p className="font-semibold">{rating}</p>
                </div>
              </div>
            <div className="flex flex-row place-content-evenly gap-0.5">
                    <p className="font-black text-3xl self-center">${price}</p>
                    <ShoppingButton id={id} name={name} />
            </div>
    </Card>
  )
}
