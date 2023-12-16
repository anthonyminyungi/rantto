export const vercelApi = async (path, options = {}) => {
  console.log("token : ", process.env.VERCEL_ACCESS_TOKEN);
  return fetch(`https://api.vercel.com${path}`, {
    headers: {
      ...options,
      Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
