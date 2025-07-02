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

export function ShoppingCard() {

    function ShoppingButton(){
        window.alert("Added to Cart!")
    }
  return (
    <Card className="max-w-xs max-h-sm w-2xs h-2xs">
      <CardContent className="object-cover max-w-">
            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/21e1090efd1da6fa6b37a178617af9237fc139b2_image.png" className="w-max"/>
      </CardContent>
      <CardFooter className="flex-row gap-0.1">
            <div className="grow-1">
                <div className="flex flex-row items-center content-center">
                    <FontAwesomeIcon icon={faStar} className="text-orange-500"/>
                    <p className="text-md font-semibold">5</p>
                </div>
                <p className="font-bold text-2xl">$150.40</p>
            </div>
            <div className="grow-1 max-w-[8vw] ">
                <p className="text-xs text-wrap max-w-[10vw] content-start justify-start align-start"> size-autoDescription dinka chicka</p>
                <Button className="w-[8vw]" onClick={() => ShoppingButton()}>
                    <p className="inline">Add to Cart</p>
                    <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
                </Button>
            </div>
      </CardFooter>
    </Card>
  )
}
