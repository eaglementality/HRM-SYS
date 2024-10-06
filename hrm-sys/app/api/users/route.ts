import prisma from "../../../prisma/client";

export async function GET() {
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return Response.json(data);
  } catch (err) {
    return Response.json(err);
  }
}