'use client'

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CmsSection } from '@/interfaces/cmsSection'
import { getAllCmsSections } from "@/scripts/cms";
import Link from "next/link";
import Spinner from "./ui/Spinner";
import ThemeSwitcher from "./ThemeSwitcher";
import { useSidebar } from "@/context/SidebarContext";

const Sidebar: React.FC = () => {
    const [sections, setSections] = useState<CmsSection[]>([])
    const [loading, setLoading] = useState(true)
    const { logout } = useAuth()
    const { isOpen } = useSidebar()

    useEffect(() => {
        async function loadData() {
            const sections = await getAllCmsSections()
            setSections(sections)
            setLoading(false)
        }
        loadData()
    }, [])

    const capitalizeFirstLetter = (section: string) => {
        return section.charAt(0).toUpperCase() + section.slice(1);
    }

    if (loading) return <Spinner />

    return (
        <aside
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 transform transition-transform duration-300 bg-gray-800 text-white z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="p-4 flex flex-col gap-4">
                <span>
                    <ThemeSwitcher />
                </span>
                {
                    sections.length > 0 ? (
                        <ul className='flex flex-col gap-2'>
                            {sections.map(({ id, value }) => (
                                <li key={id} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                                    <span className="icon">📄</span>
                                    <Link href={`/${value}`}>
                                        {capitalizeFirstLetter(value)}
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