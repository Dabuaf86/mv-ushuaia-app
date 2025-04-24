import { useAuth } from "@/context/AuthContext";
import ThemeSwitcher from "../components/ThemeSwitcher";

const Header = () => {
    const { user } = useAuth();
    console.log(user)
    return (
        <header className="bg--default text--colors_default p-4 shadow-md flex justify-between items-center h-16">
            <ThemeSwitcher />
            <h1 className="text-xl font-bold">
                {user?.name ? `Welcome ${user.displayName}` : `Welcome ${user?.email}`}
            </h1>
        </header>
    );
};

export default Header;