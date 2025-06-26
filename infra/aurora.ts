import { vpc } from "./vpc";

export const aurora = new sst.aws.Aurora("LoresparkDB", {
  engine: "postgres",
  vpc,
});
