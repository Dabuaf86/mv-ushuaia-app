import { FiMenu, FiX } from "react-icons/fi";
import { useSidebar } from "@/context/SidebarContext";

const Menu: React.FC = () => {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <button
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            onClick={toggleSidebar}
        >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
    );
};

export default Menu;