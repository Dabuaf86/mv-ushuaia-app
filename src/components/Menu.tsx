import { FiMenu, FiX } from "react-icons/fi";

type MenuProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

const Menu: React.FC<MenuProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <button
            className="p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
            onClick={toggleSidebar}
        >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
    );
};

export default Menu;