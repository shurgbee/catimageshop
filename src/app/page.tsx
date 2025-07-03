import MainPageCarousel from "../components/MainPageCaroseul";
import { CarouselType } from "./types";

export default function Home() {

  return (
    <>
      <h1 className="text-8xl font-black py-3">Welcome In!</h1>
      <MainPageCarousel title="New In Shop" ctype={CarouselType.new}/>
      <MainPageCarousel title="Leaving Soon! 🔥" ctype={CarouselType.leavingSoon}/>
    </>
  );
}
