'use client'

import { useState } from "react";
import Menu from "./Menu";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside className={`bg-gray-800 text-white min-h-screen p-4 ${isOpen ? 'w-64' : 'w-16'}`}>
            <button
                className="mb-4 p-2 bg-gray-700 rounded hover:bg-gray-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "⬅" : "➡"}
            </button>
            <Menu isOpen={isOpen} />
        </aside>
    );
};

export default Sidebar;