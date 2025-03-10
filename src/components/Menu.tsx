const Menu = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <nav>
            <ul className="space-y-2">
                <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Home</a></li>
                <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Profile</a></li>
                <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Settings</a></li>
                <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Activities</a></li>
                <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Ship Map</a></li>
                <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Staff Info</a></li>
                <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Daily Menu</a></li>
                <li className="p-2 hover:bg-gray-700 rounded"><a href="#">Leave Feedback</a></li>
            </ul>
        </nav>
    );
};

export default Menu;