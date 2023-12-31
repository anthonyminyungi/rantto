export const vercelApi = async (path, options = {}) => {
  return fetch(`https://api.vercel.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
