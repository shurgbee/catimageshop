import { pgTable, check, text, real, numeric, integer, timestamp, uuid } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const shoppingitems = pgTable("shoppingitems", {
	name: text().notNull(),
	image: text(),
	rating: real().notNull(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	description: text(),
	stock: integer().notNull(),
	dateuploaded: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	id: uuid().defaultRandom().primaryKey().notNull(),
}, (table) => [
	check("shoppingitems_rating_check", sql`(rating >= (0)::double precision) AND (rating <= (5)::double precision)`),
	check("shoppingitems_price_check", sql`price >= (0)::numeric`),
	check("shoppingitems_stock_check", sql`stock >= 0`),
]);
