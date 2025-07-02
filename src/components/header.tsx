import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons/faCat";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


export default function Header() {
  return (
    <div className="flex flex-row w-screen bg-blue-600 min-h-9vh text-6xl items-center p-10vh text-white justify-between gap-5">
        <a href="/" className="p-2">
            <FontAwesomeIcon icon={faCat}/>
        </a>
        <a href="/" className="p-2">
            <FontAwesomeIcon icon={faShoppingCart} className=""/>
        </a>
    </div>
  );
}