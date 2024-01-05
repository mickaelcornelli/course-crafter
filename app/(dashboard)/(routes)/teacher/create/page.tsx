"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import {
    Form,
    FormControl,
    FormItem,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "react-hot-toast"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Un titre est requis"
    })
})

const CreatePage = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values)
            router.push(`/teacher/courses/${response.data.id}`)
            toast.success("Votre cours a été créé")
        } catch (error) {
            toast.error("Une erreur s'est produite")
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">Nom du cours</h1>
                <p className="text-sm text-slate-600">Quel nom souhaitez-vous donner à votre cours ? Ne vous inquiétez pas, vous pouvez le changer plus tard</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Titre du cours
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Exemple: développement web avancé"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Que enseignerez-vous dans ce cours ?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    variant="ghost"
                                    type="button"
                                >
                                    Annuler
                                </Button>
                            </Link>
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Continuer
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreatePage