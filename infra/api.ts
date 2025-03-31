import { rds } from "./rds";
import { vpc } from "./vpc";
import { auth } from "./auth";

export const api = new sst.aws.Function("MyApi", {
  url: true,
  vpc,
  link: [rds, auth],
  handler: "packages/functions/src/api.handler",
});
