"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("") // Luego cambiar a login con last name, voyage code y pass
    // const [voyageCode, setVoyageCode] = useState("")
    const [password, setPassword] = useState("")
    const { user, login } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user) router.push("/")
    }, [user, router])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (error) {
            console.log("Login failed", error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                {/* <input
                    type="text"
                    placeholder="Voyage Code"
                    value={voyageCode}
                    onChange={(e) => setVoyageCode(e.target.value)}
                    className="border p-2 w-full mb-4"
                /> */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded"
                    disabled={!email || !password}
                >Login</button>
            </form>
        </div>
    )
}

export default Login