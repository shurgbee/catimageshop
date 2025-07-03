import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { CartType } from "@/app/types";

export default function ShoppingCart() {
    const [cartSize, setCartSize] = useState(0)

    useEffect(() => {
        function cartChange(){
            const cartStr = localStorage.getItem("CISCart")
            const cart : CartType = JSON.parse(cartStr ?? "{}")
            if(cart != null && cart != JSON.parse("{}")) setCartSize(cart.totalCount) 
        }

        window.addEventListener("CIScartChanged", cartChange)
        window.dispatchEvent(new CustomEvent("CIScartChanged"))

        return () => {
        window.removeEventListener("CIScartChanged", cartChange);
        };
    }, [])
    
  return (
    <>
        <Link href="/checkout" className="p-2 pr-0 flex flex-row items-start">
            {
                cartSize > 0 ?
                <Badge variant="destructive" className=" z-10 -mt-2 -mr-2">{cartSize}</Badge>
                :
                <></>
            }
            <FontAwesomeIcon icon={faShoppingCart} className=""/>
        </Link>
    </>
  );
}