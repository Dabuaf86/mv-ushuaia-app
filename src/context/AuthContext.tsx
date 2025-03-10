'use client'

import React, { createContext, useState, useEffect, ReactNode } from "react";

// Definimos el tipo para el contexto de autenticación
interface AuthContextType {
    user: object;
    login: (userData: object) => void;
    logout: () => void;
}

// Creamos el contexto de autenticación con valores iniciales
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<object>({});

    useEffect(() => {
        // Intentar cargar un usuario almacenado en localStorage al montar el componente
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: object) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser({});
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
