import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import * as schema from "./schema.sql";

const pool = new Pool({
  host: Resource.LoresparkDB.host,
  port: Resource.LoresparkDB.port,
  user: Resource.LoresparkDB.username,
  password: Resource.LoresparkDB.password,
  database: Resource.LoresparkDB.database,
});

export const db = drizzle(pool, { schema });
