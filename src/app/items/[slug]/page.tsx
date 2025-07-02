'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShoppingCard } from "../../../components/ShoppingCard"
import MainPageCarousel from "../../../components/MainPageCaroseul"
import { ItemProps, populateItemPage } from "@/app/db";
import { useEffect, useState } from "react";

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
      const realItem = await populateItemPage(slug);
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
        <h1 className="text-8xl font-black py-3">This is where da items are</h1>
      </>
      :
      <p>{item?.name}</p>
    }
    </>
  );
}