"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const { register } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            await register(email, password, name)
            sessionStorage.setItem('user', JSON.stringify(true)) // usar JSON.parse para recuperar el valor buleano. const isUser = JSON.parse(sessionStorage.getItem('user') || 'false');
            setName("")
            setEmail("")
            setPassword("")
            alert("Usuario registrado con éxito"); // CONVERTIR EN TOAST
            router.push("/")
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                console.error(error.message)
            } else {
                setError('Ocurrió un error inesperado');
                console.error('Ocurrió un error inesperado', error);
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">Register</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <button type="submit" className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 disabled:opacity-50"
                    disabled={!email || !password}
                >Register</button>
            </form>
        </div>
    )
}

export default Register