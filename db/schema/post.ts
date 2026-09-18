import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { usersTable } from "./user"

export const postTable = pgTable("posts", {
    id: text("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => usersTable.id),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})