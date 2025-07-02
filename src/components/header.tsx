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

export default function Header() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  function Autocomplete(text: string){
    console.log(text)
  }

  const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

  return (
    <div className="flex flex-row w-screen bg-blue-600 min-h-9vh text-6xl items-center p-10vh text-white justify-between gap-5">
        <a href="/" className="p-2">
            <FontAwesomeIcon icon={faCat}/>
        </a>
          <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? frameworks.find((framework) => framework.value === value)?.label
                      : "Select framework..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
        <a href="/" className="p-2">
            <FontAwesomeIcon icon={faShoppingCart} className=""/>
        </a>
    </div>
  );
}