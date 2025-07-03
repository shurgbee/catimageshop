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
import { Skeleton } from "@/components/ui/skeleton";

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
    if(items && cart) items?.map((item) => fprice += parseFloat(item.price) * (cart?.get(item.id) ?? 0))
    console.log(fprice)
    return fprice;
  }

  function countChanger(incrementVal: number, id: string){
    const oldInt = cart.get(id)
    if(oldInt + incrementVal == 0) deleteFromCart(id)
    if(oldInt + incrementVal > 0){
      const newCart = new Map(cart)
      console.log(oldInt)
      newCart.set(id, oldInt + incrementVal)
      setCart(newCart)
      var currentCart = JSON.parse(localStorage.getItem('CISCart'))
      currentCart['items'] = Object.fromEntries(newCart)
      localStorage.setItem('CISCart', JSON.stringify(currentCart))

      console.log(newCart)
    }
  }

  function deleteFromCart(id: string){
    const newCart = new Map(cart)
    newCart.delete(id)
    setCart(newCart)
    var currentCart = JSON.parse(localStorage.getItem('CISCart'))
    currentCart['items'] = Object.fromEntries(newCart)
    localStorage.setItem('CISCart', JSON.stringify(currentCart))
    console.log(newCart)
  }
  return (
    <>
      <h1 className="text-8xl font-black py-3 text-center">Da Checkout Page</h1>
      <Card className="w-4xl place-self-center mt-9">
        {!loading ? (
          items && items?.filter((item) => cart?.get(item.id) > 0).length > 0 ? (
            <>
              <CardContent className="flex flex-col gap-4">
                {items
                  ?.filter((item) => cart?.get(item.id) > 0)
                  .map((item, index) => (
                    <Card key={index} className="flex flex-row items-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          className="h-[90] w-[160] pl-2 rounded-3xl"
                        />
                      ) : (
                        <></>
                      )}
                      <p className="self-center font-black text-2xl">{item.name}</p>
                      <p className="font-bold w-auto">${item.price}</p>
                      <div className="flex flex-row place-items-center ">
                        <Button
                          size="icon"
                          className="rounded-full"
                          variant="outline"
                          onClick={() => countChanger(1, item.id)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <p className="px-2 font-bold">{cart?.get(item.id)}</p>
                        <Button
                          size="icon"
                          className="rounded-full"
                          variant="outline"
                          onClick={() => countChanger(-1, item.id)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        className="rounded-full text-left"
                        onClick={() => deleteFromCart(item.id)}
                      >
                        Delete Item
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </Card>
                  ))}
              </CardContent>
              <CardFooter className="flex flex-row-reverse">
                <Button size="xl">
                  <p className="text-xl">Checkout</p>
                  <FontAwesomeIcon size="2xl" icon={faBasketShopping} />
                </Button>
                <p className="font-bold text-xl p-3">Total: ${finalPrice()}</p>
              </CardFooter>
            </>
          ) : (
            <p className="font-bold text-3xl text-center">
              No Items in Cart! <a href="/" className="hover:underline">Get to shopping</a>
            </p>
          )
        ) : (
          <>
            <CardContent className="flex flex-col gap-4">
              <Card className="flex flex-row">
                <div />
                <Skeleton className="h-[90] w-[160] pl-5 rounded-3xl" />
                <div className="flex flex-col gap-2 items-start">
                  <Skeleton className="w-[300] h-[20] " />
                  <Skeleton className="w-[100] h-[20] " />
                </div>
              </Card>
              <Card className="flex flex-row">
                <div />
                <Skeleton className="h-[90] w-[160] pl-5 rounded-3xl" />
                <div className="flex flex-col gap-2 items-start">
                  <Skeleton className="w-[300] h-[20] " />
                  <Skeleton className="w-[300] h-[20] " />
                  <Skeleton className="w-[100] h-[20] " />
                </div>
              </Card>
            </CardContent>
            <CardFooter className="flex flex-row-reverse gap-2">
              <Button size="xl">
                <p className="text-xl">Checkout</p>
                <FontAwesomeIcon size="2xl" icon={faBasketShopping} />
              </Button>
              <Skeleton className="w-[150] h-[20] " />
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
}