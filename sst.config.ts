/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "lorespark",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    await import("./infra/vpc");
    const { rds } = await import("./infra/rds");
    await import("./infra/api");
    await import("./infra/web");
    await import("./infra/auth");
    await import("./infra/secrets");
    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });
  },
});
