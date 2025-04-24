'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// Definimos el tipo para el contexto de autenticación
type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
}

// Creamos el contexto de autenticación con valores iniciales
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter()

    // useEffect(() => {
    //     // Intentar cargar un usuario almacenado en localStorage al montar el componente
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // const login = (userData: object) => {
    //     setUser(userData);
    //     localStorage.setItem("user", JSON.stringify(userData));
    //     router.push("/")
    // };

    const login = async (email: string, password: string) => {
        // const userLoggingInfo = 
        await signInWithEmailAndPassword(auth, email, password);
        // console.log("USUARIO: ", userLoggingInfo)
        router.push("/");
    };

    const register = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
        router.push("/");
    }

    const logout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}