'use server'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ilike, and, gt, sql } from 'drizzle-orm';
import { shoppingitems } from '../../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

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

export async function autocomplete(text: string) : Promise<AutoCompleteProps[]> {
    const items: AutoCompleteProps[] = await db.select({
        name: shoppingitems.name,
        image: shoppingitems.image,
        id: shoppingitems.id
    }).from(shoppingitems).where(and(ilike(shoppingitems.name, `%${text}%`),gt(shoppingitems.stock, 0)));
    console.log(items)
    return items;
}

//TODO: Price Should not be string????? Why does it do this?
export async function populateItemPage(id: string) : Promise<ItemProps> {
    const items: ItemProps[] = await db.select({
        name: shoppingitems.name,
        image: shoppingitems.image,
        rating: shoppingitems.rating,
        price: shoppingitems.price,
        description: shoppingitems.description,
        stock: shoppingitems.stock,
        dateuploaded: shoppingitems.dateuploaded,
        id: shoppingitems.id
    }).from(shoppingitems).where(ilike(sql`${shoppingitems.id}::text`, `%${id}%`)).limit(1);
    console.log("items: "+items)
    return items[0];
} 

export async function populateCaroseul() : Promise<ItemProps> {
    const items: ItemProps[] = await db.select({
        name: shoppingitems.name,
        image: shoppingitems.image,
        rating: shoppingitems.rating,
        price: shoppingitems.price,
        description: shoppingitems.description,
        stock: shoppingitems.stock,
        dateuploaded: shoppingitems.dateuploaded,
        id: shoppingitems.id
    }).from(shoppingitems).where(ilike(sql`${shoppingitems.id}::text`, `%${id}%`)).limit(1);
    console.log("items: "+items)
    return items[0];
} 