import { Hono } from 'hono';
import { Resource } from 'sst';
import { handle } from 'hono/aws-lambda';
import { db } from '../../../src/drizzle';
import { portraits, users } from '../../../src/schema.sql';
import { eq } from 'drizzle-orm';
import { createClient } from '@openauthjs/openauth/client';
import { InvalidRefreshTokenError } from '@openauthjs/openauth/error';
import { subjects } from './subjects';

const app = new Hono();
const client = createClient({
  clientID: 'jwt-api',
  issuer: Resource.MyAuth.url,
});

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

async function getUserInfo(userId: number) {
  const results = await db.select().from(users).where(eq(users.id, userId));
  return results[0];
}

app.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    return c.status(401);
  }

  const token = authHeader.split(' ')[1];
  const verified = await client.verify(subjects, token);

  if (verified.err || verified.err instanceof InvalidRefreshTokenError) {
    return c.status(401);
  }

  return c.json(await getUserInfo(verified.subject.properties.id));
});

export const handler = handle(app);
