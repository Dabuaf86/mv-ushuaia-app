"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("") // Luego cambiar a login con last name, voyage code y pass
    // const [voyageCode, setVoyageCode] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const { user, login } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user) router.push("/")
    }, [user, router])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await login(email, password)
        } catch (error) {
            if (error instanceof Error && error.message.includes("invalid-credential")) {
                setError('Usuario o clave inválidos');
                console.log("Usuario o clave inválidos", error)
            } else if (error instanceof Error) {
                setError(error.message)
                console.error(error.message)
            } else {
                setError('Error en el login');
                console.log("Error en el login", error)
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                {/* <input
                    type="text"
                    placeholder="Voyage Code"
                    value={voyageCode}
                    onChange={(e) => setVoyageCode(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                /> */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <button type="submit" className="w-full p-3 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
                    disabled={!email || !password}
                >Login</button>
            </form>
        </div>
    )
}

export default Login