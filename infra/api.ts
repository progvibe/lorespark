import { rds } from './rds';
import { vpc } from './vpc';
import { auth } from './auth';
import { falKey } from './secrets';

export const api = new sst.aws.Function('MyApi', {
  url: true,
  vpc,
  link: [rds, auth, falKey],
  handler: 'packages/functions/src/api.handler',
});
