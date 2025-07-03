'use client'
import { useEffect, useState } from "react";
import { getItemFromID} from "../db";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faBasketShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { ItemProps } from '../types'
import { toast } from "sonner";
import Link from "next/link";

export default function Checkout() {
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<Map<string, number>>()
  const [items, setItems] = useState<ItemProps[]>()
  useEffect(() => {
    async function fetchItem() {
      setLoading(true);
      const curCart : string | null = localStorage.getItem("CISCart")
      let preCart: Map<string, number> = new Map();
      if (curCart && curCart!= "{}" ) {
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
  }, []);

  function finalPrice(){
    let fprice: number = 0
    if(items && cart) items?.map((item) => fprice += parseFloat(item.price) * (cart?.get(item.id) ?? 0))
    console.log(fprice)
    return fprice;
  }

  function countChanger(incrementVal: number, id: string){
    const oldInt = cart?.get(id) ?? 0
    if(oldInt + incrementVal == 0) deleteFromCart(id)
    if(oldInt + incrementVal > 0){
      const newCart = new Map(cart)
      console.log(oldInt)
      newCart.set(id, oldInt + incrementVal)
      setCart(newCart)
      const currentCartStr = localStorage.getItem("CISCart")
      const currentCart = JSON.parse(currentCartStr ?? "")
      if(currentCart && currentCart != "{}") {
        currentCart['items'] = Object.fromEntries(newCart)
        currentCart['totalCount'] += incrementVal
      }
      localStorage.setItem('CISCart', JSON.stringify(currentCart))
      window.dispatchEvent(new CustomEvent("CIScartChanged"))
      console.log(newCart)
    }
  }

  function deleteFromCart(id: string){
    const newCart = new Map(cart)
    const idCount = newCart?.get(id)
    newCart.delete(id)
    setCart(newCart)
    const currentCartStr = localStorage.getItem("CISCart")
    const currentCart = JSON.parse(currentCartStr ?? "")
    if(currentCart && currentCart != "{}") {
      currentCart['items'] = Object.fromEntries(newCart)
      currentCart['totalCount'] -= idCount ?? 0
    }
    localStorage.setItem('CISCart', JSON.stringify(currentCart))
    console.log(newCart)
        window.dispatchEvent( new CustomEvent("CIScartChanged"))
  }

  function CheckoutButton(){
    toast.success("Successfully checked out cart for $"+finalPrice())
    const newCart = new Map()
    setCart(newCart)
    localStorage.setItem('CISCart', JSON.stringify(newCart))
    console.log(newCart)
        window.dispatchEvent( new CustomEvent("CIScartChanged"))
  }
  return (
    <>
      <h1 className="text-8xl font-black py-3 text-center">Da Checkout Page</h1>
      <Card className="w-4xl place-self-center mt-9">
        {!loading ? (
          items && items?.filter((item) => cart?.get(item.id) ?? 0 > 0).length > 0 ? (
            <>
              <CardContent className="flex flex-col gap-4">
                {items
                  ?.filter((item) => cart?.get(item.id) ?? 0 > 0)
                  .map((item, index) => (
                    <Card key={index} className="flex flex-row items-center">
                      {item.image ? (
                          <img
                            src={item.image}
                            width={180}
                            height={320}
                            className="max-h-[90] max-w-[160] pl-2 "
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
                <Button size="xl" onClick={CheckoutButton}>
                  <p className="text-xl">Checkout</p>
                  <FontAwesomeIcon size="2xl" icon={faBasketShopping} />
                </Button>
                <p className="font-bold text-xl p-3">Total: ${finalPrice()}</p>
              </CardFooter>
            </>
          ) : (
            <p className="font-bold text-3xl text-center">
              No Items in Cart! <Link href="/" className="hover:underline">Get to shopping</Link>
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