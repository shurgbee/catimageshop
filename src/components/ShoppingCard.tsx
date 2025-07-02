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

interface CardProps {
    image: string,
    name: string,
    rating: number,
    price: number,
    id: string
}


export function ShoppingCard({ image, name, rating, price, id }:CardProps) {

    function ShoppingButton(){
        window.alert("Added to Cart!")
    }
  return (
    <Card className="max-w-xs p-5">
            <a href={"/items/"+id} className="font-bold text-2xl justify-self-center truncate hover:underline">
              <img src={image} className="w-max h-max rounded-lg mb-4"/>
              <p>{name}</p>
            </a>
            <div className="flex flex-row place-content-evenly gap-0.5">
                    <div className="flex flex-initial flex-row items-center content-center *:text-2xl">
                        <FontAwesomeIcon icon={faStar} className="text-orange-500"/>
                        <p className="font-semibold">{rating}</p>
                    </div>
                    <p className="font-black text-5xl self-center">${price}</p>
                    <Button className="self-center" onClick={() => ShoppingButton()}>
                        <p className="inline">Add to Cart</p>
                        <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
                    </Button>
            </div>
    </Card>
  )
}
