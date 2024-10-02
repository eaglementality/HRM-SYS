import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";


export async function GET() {
  try {
    const data = await prisma.post.findMany();
    return Response.json(data)
  } catch (err) {
    return Response.json(err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await prisma.post.create({
      data: body,
    });
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to create post', details: err }), {
      status: 500,
    });
  }
}