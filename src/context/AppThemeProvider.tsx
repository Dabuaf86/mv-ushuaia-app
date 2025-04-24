"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AppThemeProvider({ children }:
    { children: React.ReactNode }) {

    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    const isAuthRoute = pathname === "/login" || pathname === "/register"

    useEffect(() => {
        if (!isAuthRoute) {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme, isAuthRoute])

    useEffect(() => {
        if (!isAuthRoute) {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                setTheme(savedTheme);
                document.documentElement.classList.toggle("dark", savedTheme === "dark");
            }
        }
    }, [setTheme, isAuthRoute]);

    return (
        <ThemeProvider
            attribute="class" defaultTheme="system" enableSystem>
            {children} </ThemeProvider>
    );
}