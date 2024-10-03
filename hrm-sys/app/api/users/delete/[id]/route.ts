import prisma from "@/prisma/client";

export async function DELETE(req:Request,{ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    return new Response(JSON.stringify(data), { status: 204 });
  } catch (err) {
    return Response.json(err);
  }
}
