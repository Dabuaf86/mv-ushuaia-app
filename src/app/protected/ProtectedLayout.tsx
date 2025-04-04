"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Menu from "@/components/Menu";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user && pathname !== "/login" && pathname !== "/register") {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [user, pathname, router]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    if (loading) {
        return <div className="flex h-screen justify-center items-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex items-center gap-4">
                <Menu isOpen={isOpen} toggleSidebar={toggleSidebar} />
            </div>
            <div className="flex flex-1">
                <Sidebar isOpen={isOpen} />
                <main className={`flex-1 p-4 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>{children}</main>
            </div>
        </div>
    );
}
