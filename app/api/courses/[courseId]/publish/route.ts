import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Accès non autorisé", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        })

        if (!course) {
            return new NextResponse("Non trouvé", { status: 404 })
        }

        const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished)

        if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
            return new NextResponse("Vous devez remplir les champs obligatoires", { status: 401 })
        }

        const publishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId
            },
            data: {
                isPublished: true
            }
        })

        return NextResponse.json(publishedCourse)

    } catch (error) {
        console.log("[COURSE_ID_PUBLISH]", error)
        return new NextResponse("Erreur interne", { status: 500 });
    }
}