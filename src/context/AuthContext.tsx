'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { AuthContextType } from "@/interfaces/authContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "@/interfaces/user";

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
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Puedes cargar datos adicionales aquí si es necesario
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                const userData = userDoc.exists() ? userDoc.data() : {};
                setUser({
                    ...firebaseUser,
                    id: firebaseUser.uid,
                    name: userData?.name || firebaseUser.displayName || "",
                } as User);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // const login = (userData: object) => {
    //     setUser(userData);
    //     localStorage.setItem("user", JSON.stringify(userData));
    //     router.push("/")
    // };

    const login = async (email: string, password: string): Promise<User> => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Almacenar el usuario en localStorage
        localStorage.setItem("user", JSON.stringify(firebaseUser));

        // Cargar datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (!userDoc.exists()) {
            throw new Error("No additional user data was found in Firestore.");
        }
        const userData = userDoc.data();
        const loggedInUser: User = {
            ...firebaseUser,
            id: firebaseUser.uid,
            name: userData?.name || "",
        };

        setUser(loggedInUser);
        router.push("/");
        return loggedInUser
    };

    const register = async (email: string, password: string, name: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const firebaseUser = userCredential.user;

        // Almacenar el usuario en localStorage
        localStorage.setItem("user", JSON.stringify(firebaseUser));

        await updateProfile(firebaseUser, { displayName: name, })
        await setDoc(doc(db, "users", firebaseUser.uid), {
            name,
            email,
            createdAt: new Date(),
        })

        const registeredUser: User = {
            ...firebaseUser,
            id: firebaseUser.uid,
            name,
        }
        setUser(registeredUser);
        router.push("/");
        return registeredUser
    }

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("user");
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