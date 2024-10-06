import prisma from "@/prisma/client";


export async function GET(req:Request,{ params }: { params: { tag: string }}) {
  try {
    const {tag} = params ?? ''
    const data = await prisma.post.findMany({
      where:{
        tag: tag
      },
      orderBy:{
        id:'desc'
      }
    });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return Response.json(err);
  }
}