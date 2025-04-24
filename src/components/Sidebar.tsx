'use client'

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CmsSection } from '@/interfaces/cmsSection'
import { getAllCmsSections } from "@/scripts/cms";
import Link from "next/link";
import { SidebarProps } from "@/interfaces/sidebar"
import Spinner from "./ui/Spinner";


const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const [sections, setSections] = useState<CmsSection[]>([])
    const [loading, setLoading] = useState(true)
    const { logout } = useAuth()

    useEffect(() => {
        async function loadData() {
            const sections = await getAllCmsSections()
            setSections(sections)
            setLoading(false)
        }
        loadData()
    }, [])

    if (loading) return <Spinner />

    return (
        <aside
            className={`16 left-0 h-[calc(100vh-4rem)] bg-gray-900 text-white w-64 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                } z-50`}
        >
            <div className="p-4">
                {
                    sections.length > 0 ? (
                        <ul className={`bg-gray-800 text-white p-4`}>
                            {sections.map(({ id, value }) => (
                                <li key={id} className="p-2 hover:bg-gray-700 rounded">
                                    <Link href={`/${value}`}>
                                        {value}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-red-600 mt-4">Aún no se crearon secciones para mostrar.</p>
                }
                <button
                    className="mt-4 p-2 bg-red-500 rounded w-full hover:bg-red-400"
                    onClick={logout}
                >Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;