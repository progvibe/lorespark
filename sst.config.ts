/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "lorespark",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: false,
      home: "aws",
    };
  },
  async run() {
    await import("./infra/vpc");
    const { aurora } = await import("./infra/aurora");
    await import("./infra/api");
    await import("./infra/web");
    await import("./infra/auth");
    await import("./infra/secrets");
    new sst.x.DevCommand("Studio", {
      link: [aurora],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });
  },
});
