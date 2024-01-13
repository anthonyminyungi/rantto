import { vercelApi } from "./vercel.mjs";

// get production deployments
const { deployments } = await vercelApi("/v6/deployments?target=production");

// delete deployment for each
await Promise.all(
  deployments?.map(async (deployment) => {
    const now = Math.round(new Date() / 1000);
    const readied = Math.round(deployment.ready / 1000);
    // if deployed 2 weeks or more ago
    if (now - readied > 2 * 7 * 24 * 60 * 60) {
      await vercelApi(`/v13/deployments/${deployment.uid}`, {
        method: "DELETE",
      });
      console.log(`Deleted ${deployment.uid} successfully.`);
    }
  })
);
