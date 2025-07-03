
'use client'
import {toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { shoppingButtonType } from '@/app/types';



export function ShoppingButton({id, name}: shoppingButtonType) {
    function ButtonFunc(id: string){
        const cart = localStorage.getItem("CISCart");
        let parsedCart: { [key: string]: any } = cart ? JSON.parse(cart) : {};
        if (!parsedCart.totalCount) parsedCart.totalCount = 0;
        if (!parsedCart['items']) parsedCart['items'] = {};
        if (parsedCart['items'][id]) {
        parsedCart['items'][id] += 1;
        } else {
        parsedCart['items'][id] = 1; 
        }
        parsedCart.totalCount += 1;
        localStorage.setItem("CISCart", JSON.stringify(parsedCart))
        window.dispatchEvent( new CustomEvent("CIScartChanged"))
        toast.info(`Item "${name}" was added to cart"`)
    }
  return (
        <Button className="self-center" size="lg" onClick={() => ButtonFunc(id)}>
            <p className="inline">Add to Cart</p>
            <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
        </Button>
  )
}
