import { useAuth } from "@/context/AuthContext";

type SidebarProps = {
    isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const { logout } = useAuth()

    return (
        <aside
            className={`16 left-0 h-[calc(100vh-4rem)] bg-gray-900 text-white w-64 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                } z-50`}
        >
            <div className="p-4">
                <ul
                    className={`bg-gray-800 text-white min-h-screen p-4`}
                >
                    <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Home</a></li>
                    <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Profile</a></li>
                    <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Settings</a></li>
                    <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Activities</a></li>
                    <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Ship Map</a></li>
                    <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Staff Info</a></li>
                    <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Daily Menu</a></li>
                    <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Leave Feedback</a></li>
                    <button
                        className="mt-4 p-2 bg-red-500 rounded w-full hover:bg-red-400"
                        onClick={logout}
                    >Logout
                    </button>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;