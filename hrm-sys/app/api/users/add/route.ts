import prisma from "@/prisma/client";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const post = await prisma.post.create({
        data: body,
      });
      return new Response(JSON.stringify(post), { status: 201 });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Failed to create post", details: err }),
        {
          status: 500,
        }
      );
    }
  }