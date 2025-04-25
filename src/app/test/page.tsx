"use client";

import { useTheme } from "next-themes";

export default function TestPage() {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <div className="min-h-screen bg--default text--colors_default flex items-center justify-center">
            <button
                onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
                className="p-4 bg-gray-200 dark:bg-gray-700 rounded"
            >
                Toggle Theme
            </button>
        </div>
    );
}