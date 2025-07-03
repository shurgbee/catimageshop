'use client'
import MainPageCarousel from "../../../components/MainPageCaroseul"
import {getItemFromID } from "@/app/db";
import { useEffect, useState } from "react";
import { ShoppingButton } from "@/components/ShoppingButton";
import { Skeleton } from "@/components/ui/skeleton";
import { CarouselType, ItemProps } from "../../types";

export default function ItemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<ItemProps>();

  useEffect(() => {
    async function fetchItem() {
      setLoading(true);
      const { slug } = await params;
      const realItem = await getItemFromID(slug);
      setItem(realItem);
      setLoading(false);
    }
    fetchItem();
  }, [params]);
  return (
    <>
    {
      loading ? 
      <>
        <div className="flex flex-row p-5">
          <Skeleton className="h-2xl w-2xl rounded-4xl p-5"/>
          <div className="flex flex-col gap-5 p-5">
            <Skeleton className="h-[128px] w-lg" />
            <div className="flex flex-row">
              <Skeleton className="h-[72px] w-md" />
              {/* <p className="self-center">Increase amount</p> */}
            </div>
            <div className="flex flex-row gap-9">
              <Skeleton className="h-[30px] w-md" />
            </div>
          </div>
        </div>
      <div className="pt-[10vh]">
        <MainPageCarousel title={"More like this one"} ctype={CarouselType.new}/>
      </div>
      </>
      :
      <>
        <div className="flex flex-row max-sm:flex-col">
          <img src={item?.image ? item.image : "https://cdn.gcdn.space/Guests/d42ca99e_floppa.webp"} className="h-2xl w-2xl rounded-4xl p-5 aspect-video"/>
          <div className="flex flex-col gap-5">
            <p className="text-8xl font-black">{item?.name}</p>
            {
              item?.description ? 
                <p className="text-lg">{item?.description ? item.description : ""}</p>
              :
              <></>
            }
            <div className="flex flex-row">
              <p className="text-7xl font-bold">${item?.price}</p>
              {/* <p className="self-center">Increase amount</p> */}
            </div>
            <div className="flex flex-row gap-9">
              <p className="text-3xl">{"Stock: "+item?.stock}</p>
              <ShoppingButton id={item?.id} name={item.name}/>
            </div>
          </div>
        </div>
      <div className="pt-[10vh]">
        <MainPageCarousel title={"More like this one"} ctype={CarouselType.new}/>
      </div>
      </>
    }
    </>
  );
}