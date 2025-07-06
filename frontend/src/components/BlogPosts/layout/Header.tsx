import React, { useState } from 'react';
import { CollapseIcon, PreCollapseIcon } from '../icons';

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarCollapsed }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-20">
            <div className="flex items-center gap-3">
                <span className="text-xl font-medium tracking-tighter">Nikola Nikolovski</span>
                <div 
                    className="relative w-5 h-5 cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={toggleSidebar}
                >
                    {isSidebarCollapsed ? <CollapseIcon /> : (isHovered ? <PreCollapseIcon /> : <CollapseIcon />)}
                </div>
            </div>
            {/* <div className="flex items-center gap-6">
                <button>
                    <SearchIcon />
                </button>
            </div> */}
        </header>
    );
};

export default Header;
