'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons/faCat";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { autocomplete } from "@/app/db";
import { AutoCompleteProps } from "@/app/db"
import { redirect, RedirectType } from "next/navigation";
import { Badge } from "./ui/badge";

export default function Header() {
  const [value, setValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(true);
  const [searchRes, setSearchRes] = useState<AutoCompleteProps[]>([])

  async function Autocomplete(text: string){
    const resp = await autocomplete(text)
    console.log(resp)
    setSearchRes(resp)
  }

  return (
    <div className="flex flex-row w-screen bg-blue-600 min-h-9vh text-6xl items-center p-10vh text-white justify-between gap-5">
        <a href="/" className="p-2">
            <FontAwesomeIcon icon={faCat}/>
        </a>
        <Command className="w-[50vw]">
          <form onSubmit={() => console.log("hi")}>
          <CommandInput
           onFocus={() => setOpen(true)}
           value={searchText}
           onValueChange={(text) => {
            setSearchText(text);
            Autocomplete(text);
           }} 
           placeholder="Search Stuff Here"
           />
          </form>
          <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>

                </PopoverTrigger>
                <PopoverContent
                className="w-[50vw] p-0"
                onOpenAutoFocus={(e) => e.preventDefault()}>
                    <CommandList>
                      <CommandEmpty>No Search Results Found :(</CommandEmpty>
                      <CommandGroup>
                        {searchRes.map((result, index) => (
                          <CommandItem
                            key={index}
                            value={result.name}
                            onSelect={(currentValue) => {
                              setSearchText(currentValue);
                              setOpen(false);
                              redirect("/items/"+result.id, RedirectType.replace)
                            }}
                          >
                            {result.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                </PopoverContent>
              </Popover>
        </Command>
        <a href="/" className="p-2">
            <FontAwesomeIcon icon={faShoppingCart} className=""/>
        </a>
    </div>
  );
}


