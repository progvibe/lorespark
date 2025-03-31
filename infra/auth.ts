import { rds } from "./rds";
import { vpc } from "./vpc";

export const auth = new sst.aws.Auth("MyAuth", {
  issuer: {
    handler: "packages/functions/src/auth.handler",
    link: [rds],
    vpc,
  },
});
