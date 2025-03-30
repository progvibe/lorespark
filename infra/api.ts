import { rds } from "./rds";
import { vpc } from "./vpc";

export const api = new sst.aws.Function("MyApi", {
  url: true,
  vpc,
  link: [rds],
  handler: "packages/functions/src/api.handler",
});
