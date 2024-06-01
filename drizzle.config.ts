import 'dotenv/config'
import dotenv from 'dotenv'
import {defineConfig} from "drizzle-kit";
dotenv.config({ path: `.env.local`, override: true });
export default defineConfig({
  schema: './db/drizzle/schema.ts',
  out: './db/supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});