import { pgTable, integer, timestamp, varchar } from "drizzle-orm/pg-core";

export const steamGameInfo = pgTable('steamGameInfo', {
  appId: integer('app_id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull().default(""),
  aliases: varchar('aliases', { length: 256 }).notNull().default(""),
  top20Tags: varchar('top20_tags', { length: 256 }).notNull().default(""),
  lastRefreshedAt: timestamp('last_refreshed_at', {withTimezone: true}).notNull().defaultNow(),
  createdAt: timestamp('created_at', {withTimezone: true}).notNull().defaultNow(),
});

export type InsertGameInfo = typeof steamGameInfo.$inferInsert
export type SelectGameInfo = typeof steamGameInfo.$inferSelect