"use client";

import { HiOutlineSun as SunIcon, HiOutlineMoon as MoonIcon } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <>...</>;

    return (
        <button
            onClick={() => {
                setTheme(resolvedTheme === "light" ? "dark" : "light")
            }}
            type="button"
            className="rounded-md p-s mr-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            {resolvedTheme === "light" ?
                <MoonIcon size={24} />
                :
                <SunIcon size={24} />
            }
        </button>)
}

////////////////////////////////////

// export default function ThemeSwitcher() {
//     // let storage: Storage = {Storage: {}}
//     // if (globalThis?.window?.localStorage) {
//     //     storage = window.localStorage
//     //     console.log("localStorage: ", storage)
//     // }

//     const storedTheme = globalThis?.window?.localStorage.getItem('theme')
//     const checkTheme = () => {
//         if (storedTheme === 'dark') return false
//         return true
//     }
//     const [isLight, setIsLight] = useState(checkTheme)

//     const setLightTheme = () => {
//         setIsLight(true)
//         globalThis?.window?.localStorage.setItem('theme', 'light')
//     }

//     const setDarkTheme = () => {
//         setIsLight(false)
//         globalThis?.window?.localStorage.setItem('theme', 'dark')
//     }


//     useEffect(() => {
//         const setTheme = () => {
//             const root = window.document.documentElement
//             const operatingSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)')

//             if (storedTheme === 'dark' && operatingSystemThemeDark.matches) {
//                 root.classList.add('dark')
//             }
//             if (storedTheme === 'dark') {
//                 root.classList.add('dark')
//             }
//             if (storedTheme === 'light') {
//                 root.classList.remove('dark')
//             }
//         }
//         setTheme()
//         console.log(`${storedTheme} selected`)
//     }, [storedTheme])

//     if (storedTheme === 'light')
//         return (
//             <div className='theme-switcher items-center ml-12 hidden'>
//                 <MoonIcon className={`dark-mode-switch cursor-pointer mr-6 w-[40px] h-[40px] p-[10px] rounded-[100%]
//         border ${!isLight && 'hidden'}`}
//                     onClick={setDarkTheme} />
//             </div>
//         )
//     return (
//         <div className='theme-switcher items-center ml-12 hidden'>
//             <SunIcon className={`light-mode-switch cursor-pointer mr-6 w-[40px] h-[40px] p-[10px] rounded-[100%]
//         border ${isLight && 'hidden'}`}
//                 onClick={setLightTheme} />
//         </div>
//     )
// }