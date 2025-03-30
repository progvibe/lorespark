import { Hono } from "hono";
import { Resource } from "sst";
import { handle } from "hono/aws-lambda";
import { db } from "../../../src/drizzle";
import { portraits } from "../../../src/schema.sql";

const app = new Hono();

app.get("/portrait", async (c) => {
  const results = await db.select().from(portraits);
  return c.json(results);
});

export const handler = handle(app);
