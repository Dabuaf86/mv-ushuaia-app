import { User as FirebaseUser } from "firebase/auth";

export interface User extends FirebaseUser {
    id: string; // ID del usuario (puede ser el UID de Firebase)
    name: string; // Nombre del usuario
}