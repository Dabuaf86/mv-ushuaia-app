import { User } from './user';

export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<User>;
}