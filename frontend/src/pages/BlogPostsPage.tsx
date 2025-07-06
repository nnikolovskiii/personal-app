import { useState } from 'react';
import { Header, Sidebar, MainContent } from '../components/BlogPosts/layout';
import type { BlogPost } from '../types/blog';
import styles from './BlogPostsPage.module.css';

export default function BlogPostsPage() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`${styles.blogPostPage} bg-white min-h-screen text-gray-800 font-sans`}>
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />
            <div className="flex">
                <Sidebar 
                    isSidebarCollapsed={isSidebarCollapsed} 
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedPost={setSelectedPost}
                />
                <MainContent
                    selectedPost={selectedPost} 
                    setSelectedPost={setSelectedPost}
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
        </div>
    );
}
