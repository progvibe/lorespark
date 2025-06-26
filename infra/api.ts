import { vpc } from "./vpc";
import { auth } from "./auth";
import { falKey } from "./secrets";
import { aurora } from "./aurora";

export const api = new sst.aws.Function("MyApi", {
  url: true,
  vpc,
  link: [aurora, auth, falKey],
  handler: "packages/functions/src/api.handler",
});
