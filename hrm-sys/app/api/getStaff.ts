import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";


export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.post.findMany();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
}
