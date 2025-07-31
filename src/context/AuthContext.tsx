'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { AuthContextType } from "@/interfaces/authContext";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { User } from "@/interfaces/user";
import { FirebaseError } from "firebase/app";
import { errorMessages } from "@/constants/errorMessages";

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

    const handleAuthError = (error: FirebaseError): string => {
        if (error.code) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    return errorMessages.emailAlreadyInUse
                case "auth/user-not-found":
                    return errorMessages.userNotFound
                case "auth/wrong-password":
                    return errorMessages.wrongPassword
                case "auth/weak-password":
                    return errorMessages.weakPassword
                case "auth/invalid-email":
                    return errorMessages.invalidEmail
                default:
                    return errorMessages.unknownError
            }
        }
        return error.message || errorMessages.unknownError;
    };

    const checkEmailExists = async (email: string): Promise<boolean> => {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(userQuery);
        return !querySnapshot.empty; // Devuelve `true` si el correo existe, `false` en caso contrario
    }

    const login = async (email: string, password: string): Promise<User> => {
        try {
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

        } catch (error) {
            throw new Error(handleAuthError(error as FirebaseError));
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const firebaseUser = userCredential.user;

            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                throw new Error("El correo electrónico ya está registrado.");
            }

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
        catch (error) {
            throw new Error(handleAuthError(error as FirebaseError));
        }
    }

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    const resetPassword = async (email: string) => {
        try {
            if (!email) throw new Error("Por favor, ingresa un correo electrónico válido.");

            const emailExists = await checkEmailExists(email);
            if (!emailExists) {
                throw new Error("El correo electrónico no está registrado.");
            }
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw new Error(handleAuthError(error as FirebaseError));
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
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