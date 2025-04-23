"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

export function Providers({ children }:
    { children: React.ReactNode }) {

    const { theme, setTheme } = useTheme()

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        }
    }, []);

    return (
        <ThemeProvider
            attribute="class" defaultTheme="system" enableSystem>
            {children} </ThemeProvider>
    );
}