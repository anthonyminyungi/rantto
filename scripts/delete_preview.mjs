import { vercelApi } from "./vercel.mjs";

// get preview deployments
const { deployments } = await vercelApi("/v6/deployments?target=preview");

// delete deployment for each
await Promise.all(
  deployments.map(async (deployment) => {
    await vercelApi(`/v13/deployments/${deployment.uid}`, { method: "delete" });
    console.log(`Deleted ${deployment.uid} successfully.`);
  })
);
