'use client'
import {
  Card,
} from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ShoppingButton } from "./ShoppingButton"
import Link from "next/link";

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
            <Link href={"/items/"+id} className="font-bold text-2xl justify-self-center truncate hover:underline">
              <img src={image} width={256} height={256} alt="Shop Item" className="s-[256px] overflow-hidden justify-self-center rounded-2xl aspect-video"/>
            </Link>
            <div className="flex-col flex">
            <Link href={"/items/"+id} className="font-bold text-2xl justify-self-center truncate hover:underline">{name}</Link>
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
