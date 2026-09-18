import { date, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";


export const cast_category = pgEnum('cast_category', ['General', 'EBC', 'BC', 'SC', 'ST'])
export const eligiblity_status = pgEnum('eligiblity_status', ['ELIGIBLE', 'NOT_ELIGIBLE'])
export const candidateTable = pgTable('candidate', {
    id: text().primaryKey().$defaultFn(() => createId()),
    exam_id: text("exam_id").references(() => examDetailsTable.id),
    name: text().notNull(),
    roll: integer().unique().notNull(),
    fathers_name: text().notNull(),
    address: text().notNull(),
    phone: text().notNull(),
    category: cast_category().notNull(),
    email: text().unique().notNull(),
    dob: date().notNull(),
    eligiblity: eligiblity_status(),
    signature: text(),
    profile: text(),
    created_at: timestamp("created_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
    updated_at: timestamp("updated_at", { mode: "date", withTimezone: true }).default(sql`NOW()`).notNull(),
})


export const examDetailsTable = pgTable('exam_details', {
    id: text().primaryKey().$defaultFn(() => createId()),
    name: text(),
    post: text(),
    date: date(),
    time: text(),
    reporting: text(),
    center: text(),
})
