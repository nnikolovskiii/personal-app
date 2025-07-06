import React from 'react';
import { ArrowLeftIcon } from '../icons';
import Categories from './Categories';
import type { BlogPost } from '../../../types/blog';

interface SidebarProps {
    isSidebarCollapsed: boolean;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    setSelectedPost?: (post: BlogPost | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarCollapsed, selectedCategory, setSelectedCategory, setSelectedPost }) => {

    return (
        <aside className={`flex-shrink-0 space-y-8 border-r border-gray-200 h-screen sticky top-[65px] bg-white hidden lg:block ${isSidebarCollapsed ? 'w-0 overflow-hidden p-0' : 'w-64 p-6 pr-8'}`}>
            <div>
                <a href="/" className="flex items-center gap-3 text-black text-sm hover:text-gray-900">
                    <ArrowLeftIcon /> Home
                </a>
            </div>
            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setSelectedPost={setSelectedPost} />

        </aside>
    );
};

export default Sidebar;
