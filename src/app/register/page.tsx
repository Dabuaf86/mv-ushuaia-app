"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(false)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            sessionStorage.setItem('user', true)
            setEmail("")
            setPassword("")

            router.push("/")
        } catch (error: any) {
            setError(error.message)
            console.error(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <form onSubmit={handleSubmit} className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                    <h2 className="text-white text-2xl font-bold mb-5">Register</h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <button type="submit" className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                        disabled={!email || !password}
                    >Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register