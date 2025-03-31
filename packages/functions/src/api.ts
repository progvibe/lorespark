import { Hono } from 'hono';
import { Resource } from 'sst';
import { handle } from 'hono/aws-lambda';
import { db } from '../../../src/drizzle';
import { portraits } from '../../../src/schema.sql';
import { Context } from 'hono';
import { type StatusCode } from 'hono/utils/http-status';
const app = new Hono();

app.get('/portrait', async (c) => {
  const results = await db.select().from(portraits);
  return c.json(results);
});

app.get('/api/fal/proxy', async (c) => {
  const url = c.req.header('x-fal-target-url');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${Resource.FalKey.value}`,
    },
  });
  return response;
});

app.post('/api/fal/proxy', async (c) => {
  const body = await c.req.json();
  const url = c.req.header('x-fal-target-url');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${Resource.FalKey.value}`,
    },
    body: JSON.stringify(body),
  });
  return response;
});

export const handler = handle(app);
