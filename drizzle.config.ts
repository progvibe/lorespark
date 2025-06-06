import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./src/**/*.sql.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource.MyPostgres.host,
    port: Resource.MyPostgres.port,
    user: Resource.MyPostgres.username,
    password: Resource.MyPostgres.password,
    database: Resource.MyPostgres.database,
  },
});
