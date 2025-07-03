'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShoppingCard } from "../../components/ShoppingCard"
import MainPageCarousel from "../../components/MainPageCaroseul"
import { useEffect, useState } from "react";
import { getItemFromID, ItemProps } from "../db";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faBasketShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Checkout() {
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<Map<string, number>>()
  const [items, setItems] = useState<ItemProps[]>()
  useEffect(() => {
    async function fetchItem() {
      setLoading(true);
      const curCart : string | null = localStorage.getItem("CISCart")
      let preCart: Map<string, number> = new Map();
      if (curCart) {
        preCart = new Map(Object.entries(JSON.parse(curCart).items));
      }
      setCart(preCart)
      console.log(Array.from(preCart.keys()))
      const cartKeys = Array.from(preCart.keys())
      const fetchedItems : ItemProps[] = preCart ? await Promise.all(cartKeys.map((id: string) => {return getItemFromID(id)})) : [];
      setItems(fetchedItems)
      setLoading(false);
      console.log(items)
    }
    fetchItem();
  }, [] );

  function finalPrice(){
    var fprice: number = 0
    items?.map((item) => fprice += parseFloat(item.price) * cart?.get(item.id))
    console.log(fprice)
    return fprice;
  }
  return (
    <>
      <h1 className="text-8xl font-black py-3 text-center">Da Checkout Page</h1>
      <Card className="w-4xl place-self-center mt-9">
        <CardContent className="flex flex-col gap-4">
          {items && items.length > 0 ? (
            items?.map((item, index)=>
              <Card key={index} className="flex flex-row items-center">
                {item.image ? 
                  <img src={item.image} className="h-[90] w-[160] pl-2 rounded-3xl"/>
                  :
                  <></>
                }
              <p className="self-center font-black text-2xl">{item.name}</p>
              <p className="font-bold w-auto">${item.price}</p>
              <div className="flex flex-row place-items-center ">
                <Button size='icon' className="rounded-full" variant='outline'>
                  <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <p className="px-2 font-bold">
                 {cart?.get(item.id)} 
                </p>
                <Button size='icon' className="rounded-full" variant='outline'>
                  <FontAwesomeIcon icon={faMinus}/>
                </Button>
              </div>
              <Button variant="destructive" className="rounded-full text-left">
                Delete Item
                <FontAwesomeIcon icon={faTrashCan}/>
              </Button>
              </Card>
            )
              ) : (
                <p>No Stuff</p>
              )}
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <Button size="xl">
            <p className="text-xl">Checkout</p>
            <FontAwesomeIcon size="2xl" icon={faBasketShopping}/>
          </Button>
          <p className="font-bold text-xl p-3">Total: ${finalPrice()}</p>
        </CardFooter>
      </Card>
    </>
  );
}