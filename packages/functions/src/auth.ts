import { handle } from 'hono/aws-lambda';
import { issuer } from '@openauthjs/openauth';
import { CodeUI } from '@openauthjs/openauth/ui/code';
import { CodeProvider } from '@openauthjs/openauth/provider/code';
import { subjects } from './subjects';
import { db } from '../../../src/drizzle';
import { users } from '../../../src/schema.sql';
import { eq } from 'drizzle-orm';
async function getUser(email: string) {
  // Create user if they don't exist, return user ID
  const results = await db.select().from(users).where(eq(users.email, email));
  console.log(results);
  if (results.length === 0) {
    const returned = await db
      .insert(users)
      .values({ email })
      .returning({ id: users.id });
    console.log(returned);
    return returned[0].id.toString();
  }
  return results[0].id.toString();
}

const app = issuer({
  subjects,
  // Remove after setting custom domain
  allow: async () => true,
  providers: {
    code: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          console.log(email, code);
        },
      })
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === 'code') {
      return ctx.subject('user', {
        id: await getUser(value.claims.email),
      });
    }
    throw new Error('Invalid provider');
  },
});

export const handler = handle(app);
