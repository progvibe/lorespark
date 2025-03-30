import { text, serial, pgTable } from "drizzle-orm/pg-core";

export const portraits = pgTable("portraits", {
  id: serial("id").primaryKey(),
  name: text("name"),
  imageUrl: text("image_url").notNull(),
});
