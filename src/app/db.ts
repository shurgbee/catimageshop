'use server'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ilike, and, gt, sql, desc, asc } from 'drizzle-orm';
import { shoppingitems } from '../db/schema';
import { AutoCompleteProps, CarouselType, ItemProps } from './types';

const db = drizzle(process.env.DATABASE_URL!);

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
export async function getItemFromID(id: string) : Promise<ItemProps> {
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
    console.log('ran')
    return items[0];
} 

export async function populateCarousel(carouselType: CarouselType) : Promise<ItemProps[]> {
    let items: ItemProps[] = []
    switch(carouselType) {
        case CarouselType.leavingSoon:
            items = await db.select({
                name: shoppingitems.name,
                image: shoppingitems.image,
                rating: shoppingitems.rating,
                price: shoppingitems.price,
                description: shoppingitems.description,
                stock: shoppingitems.stock,
                dateuploaded: shoppingitems.dateuploaded,
                id: shoppingitems.id
            }).from(shoppingitems).orderBy(asc(shoppingitems.stock)).limit(6);
            break;
        case CarouselType.new:
            items = await db.select({
                name: shoppingitems.name,
                image: shoppingitems.image,
                rating: shoppingitems.rating,
                price: shoppingitems.price,
                description: shoppingitems.description,
                stock: shoppingitems.stock,
                dateuploaded: shoppingitems.dateuploaded,
                id: shoppingitems.id
            }).from(shoppingitems).orderBy(desc(shoppingitems.dateuploaded)).limit(6);
            break;
        default:
            throw new Error("Unable to handle CarouselType")
            break;
        }
    console.log('ran')
    return items;
}