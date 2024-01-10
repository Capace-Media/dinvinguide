import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATION_SECRET_TOKEN) {
    return res.status(404).json({ message: "Invalid token" });
  }
  const path = req.query.path as string;
  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (error) {
    console.error("Error during revalidation:", error);
    return res.status(500).json({ message: "Revalidation failed" });
  }
}
