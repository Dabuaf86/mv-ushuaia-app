"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Menu from "@/components/Menu";
import { useSidebar } from "@/context/SidebarContext";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const { isOpen } = useSidebar()
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

    if (loading) {
        return <div className="flex h-screen justify-center items-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="fixed top-4 left-4 z-50 flex items-center gap-4">
                <Menu />
            </div>
            <div className="flex flex-1">
                <Sidebar />
                <main className={`flex-1 p-4 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>{children}</main>
            </div>
        </div>
    );
}
