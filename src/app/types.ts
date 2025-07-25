export interface AutoCompleteProps{
    name: string
    image: string | null
    id: string 
}

export interface ItemProps{
    name: string,
    image: string | null,
    rating: number,
    price: string,
    description: string | null,
    stock: number,
    dateuploaded: string,
    id: string
}

export interface CartType{
    totalCount: number,
    items: { [key: string]: number}
}

export enum CarouselType{
    new,
    leavingSoon
}

export interface CarouselProps{
  title: string
  ctype: CarouselType
}

export interface shoppingButtonType{
    id: string,
    name: string
}

export interface stockType{
    stock: number,
    id: string
}