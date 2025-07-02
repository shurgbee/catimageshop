'use server'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ilike, and, gt } from 'drizzle-orm';
import { shoppingitems } from '../../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

export interface AutoCompleteProps{
    name: string
    image: string | null
}

export async function autocomplete(text: string) : Promise<AutoCompleteProps[]> {
    const items: AutoCompleteProps[] = await db.select({
        name: shoppingitems.name,
        image: shoppingitems.image,
    }).from(shoppingitems).where(and(ilike(shoppingitems.name, `%${text}%`),gt(shoppingitems.stock, 0)));
    console.log(items)
    return items;
}
