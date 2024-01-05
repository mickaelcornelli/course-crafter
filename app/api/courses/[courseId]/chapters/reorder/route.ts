import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth()
        const { list } = await req.json()

        if (!userId) {
            return new NextResponse("Accès non autorisé", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!courseOwner) {
            return new NextResponse("Erreur interne", { status: 500 });
        }

        for (let item of list) {
            await db.chapter.update({
                where: { id: item.id },
                data: { position: item.position }
            })
        }

        return new NextResponse("Success", { status: 200 })

    } catch (error) {
        console.log("[REORDER]", error)
        return new NextResponse("Erreur interne", { status: 500 });
    }
}