import ThemeSwitcher from "../components/ThemeSwitcher";

const Header = () => {
    return (
        <header className="bg--default text--colors_default p-4 shadow-md flex justify-between items-center h-16">
            <ThemeSwitcher />
            <h1 className="text-xl font-bold">MV/Ushuaia App</h1>
        </header>
    );
};

export default Header;