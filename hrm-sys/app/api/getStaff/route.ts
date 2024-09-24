import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";


export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.post.findMany();
    return Response.json(data)
  } catch (err) {
    return res.status(500).json(err);
  }
}
