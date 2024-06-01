
// import 'dotenv/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres'
import {steamGameInfo} from "@/db/drizzle/schema";
import {inArray} from "drizzle-orm";

export const db = drizzle(sql);

export async function getGamesByIds(ids: number[]) {
  return db.select()
    .from(steamGameInfo)
    .where(inArray(steamGameInfo.appId, ids));
}