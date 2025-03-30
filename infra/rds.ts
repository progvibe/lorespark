import { vpc } from "./vpc";

export const rds = new sst.aws.Postgres("MyPostgres", { vpc, proxy: true });
