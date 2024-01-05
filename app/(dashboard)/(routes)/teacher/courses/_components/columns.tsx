"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Titre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button >
            )
        }
    },
    {
        accessorKey: "price",
        header: "Prix",
    },
    {
        accessorKey: "isPublished",
        header: "Publié",
    },
]