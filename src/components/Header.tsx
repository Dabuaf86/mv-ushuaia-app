import { useAuth } from "@/context/AuthContext";

const Header = () => {
    const { user } = useAuth();
    return (
        <header className="p-4 pl-20 shadow-md flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">
                {user?.displayName && `Welcome ${user.displayName}`}
            </h1>
        </header>
    );
};

export default Header;