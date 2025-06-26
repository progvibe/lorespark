import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./src/**/*.sql.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource.LoresparkDB.host,
    port: Resource.LoresparkDB.port,
    user: Resource.LoresparkDB.username,
    password: Resource.LoresparkDB.password,
    database: Resource.LoresparkDB.database,
    ssl: { rejectUnauthorized: false },
  },
});
