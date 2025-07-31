'use client'

import React, { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setLoading(true);

        try {
            await resetPassword(email);
            setMessage("Se ha enviado un enlace para restablecer tu contraseña a tu correo.");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error al intentar restablecer la contraseña.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl w-96"
            >
                <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
                    Restablecer contraseña
                </h2>
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="w-full p-3 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
                    disabled={!email || loading}
                >
                    {loading ? "Enviando..." : "Enviar enlace"}
                </button>
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Volver al login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword