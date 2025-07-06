import React, { useState, useEffect } from 'react';
import { ViewGridIcon, ViewListIcon } from '../icons';
import SortDropdown from './SortDropdown';
import { ResearchCard, ListViewCard } from '../cards';
import { getBlogPosts } from '../../../services/blogService';
import { getAllCategories } from '../../../services/categoryService';
import type { BlogPost } from '../../../types/blog';
import type { Category } from '../../../types/category';
import BlogPostDetail from '../BlogPostDetail';

interface MainContentProps {
    selectedPost: BlogPost | null;
    setSelectedPost: (post: BlogPost | null) => void;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

const MainContent: React.FC<MainContentProps> = ({ selectedPost, setSelectedPost, selectedCategory, setSelectedCategory }) => {
    const [researchPosts, setResearchPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState('date-desc');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategories();
                setCategories(fetchedCategories);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [sortBy, sortOrder] = sortOption.split('-');
                
                const posts = await getBlogPosts(selectedCategory ?? undefined, sortBy, sortOrder);
                
                setResearchPosts(posts);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortOption, selectedCategory]);

    const handlePostClick = (post: BlogPost) => {
        setSelectedPost(post);
    };

    const handleBackClick = () => {
        setSelectedPost(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (selectedPost) {
        return <BlogPostDetail post={selectedPost} onBackClick={handleBackClick} />;
    }

    return (
        <div className="flex-1">
            <main className=" p-8">
                <h1 className="text-5xl font-bold mb-8 text-gray-900">Blog Posts</h1>
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4 flex-wrap gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium ${selectedCategory === null ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
                        >
                            All Blogs
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium ${selectedCategory === category.name ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
                        <div className="flex items-center gap-2">
                            <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'}><ViewGridIcon /></button>
                            <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'}><ViewListIcon /></button>
                        </div>
                    </div>
                </div>

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {researchPosts.map((post: BlogPost) => (
                            <ResearchCard
                                key={post._id}
                                post={post}
                                onClick={handlePostClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {researchPosts.map((post: BlogPost) => (
                            <ListViewCard
                                key={post._id}
                                post={post}
                                onClick={handlePostClick}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MainContent;