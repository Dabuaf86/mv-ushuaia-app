'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getCmsSection, } from "@/scripts/cms"
import Spinner from "@/components/ui/Spinner"
import { CmsSection } from '@/interfaces/cmsSection'
import { useToast } from "@/context/ToastContext"

export default function Section() {
    const params = useParams();
    const value = params?.value as string
    const [section, setSection] = useState<CmsSection | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState("")
    const { error: showError } = useToast()

    useEffect(() => {
        if (!value) return
        const fetchSection = async () => {
            try {
                const data = await getCmsSection(value)
                setSection(data)
            } catch (error) {
                const message = error instanceof Error ? error.message : "No se pudo cargar la sección que buscabas."
                setError(message)
                showError(message)
            } finally {
                setLoading(false)
            }
        }
        fetchSection()
    }, [value, showError])

    if (loading) return <Spinner />
    if (!section) return <div className="text-red-600">No se encontró la sección buscada.</div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                {section.content.en.title}
            </h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: section.content.en.html_en }} />
            </div>
        </div>
    )
}