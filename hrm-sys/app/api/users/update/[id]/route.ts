import prisma from "@/prisma/client";


export async function PATCH(req: Request, { params }: { params: { id: string}}) {
 const {id} = params;
 try{
    const data = await req.json();
    const update_data = await prisma.post.update({
        where: {
            id:Number(id),
        },
        data: {
            Name: data.Name,
            tag: data.tag,
        }
    })
    return Response.json(update_data,{status:200});
 }catch(error){
    return Response.json({error:'failed to update record'},{status:400});
 }
}