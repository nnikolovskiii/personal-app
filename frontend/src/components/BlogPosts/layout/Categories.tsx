import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../../services/categoryService';
import { getBlogPosts } from '../../../services/blogService';
import type { Category } from '../../../types/category';
import type { BlogPost } from '../../../types/blog';

interface CategoriesProps {
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    setSelectedPost?: (post: BlogPost | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, setSelectedCategory, setSelectedPost }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [fetchedCategories, fetchedBlogs] = await Promise.all([
                    getAllCategories(),
                    getBlogPosts(undefined, 'date', 'desc')
                ]);
                setCategories(fetchedCategories);
                setRecentBlogs(fetchedBlogs.slice(0, 5)); // Get only the 5 most recent blogs
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Format date to a more readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <div className="space-y-6">
            {/* Blogs Category with Link */}
            <div className="space-y-3">
                <a href="/blogs" className="text-xs text-gray-500 font-semibold uppercase tracking-wider hover:text-gray-700">
                    Blogs
                </a>
                <nav className="space-y-1 text-gray-800">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedCategory(null);
                            if (setSelectedPost) {
                                setSelectedPost(null);
                            }
                        }}
                        className={`block px-3 py-1.5 rounded-md ${selectedCategory === null ? 'bg-gray-100 font-medium text-black' : 'hover:bg-gray-100 text-black'}`}
                    >
                        All Blogs
                    </a>
                    {categories.map((category) => (
                        <a
                            key={category.id}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedCategory(category.name);
                                if (setSelectedPost) {
                                    setSelectedPost(null);
                                }
                            }}
                            className={`block px-3 py-1.5 rounded-md ${selectedCategory === category.name ? 'bg-gray-100 font-medium text-black' : 'hover:bg-gray-100 text-black'}`}
                        >
                            {category.name}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Recent Blogs Section */}
            <div className="space-y-3">
                <h4 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Recent Posts</h4>
                <nav className="space-y-2 text-gray-800">
                    {recentBlogs.map((blog) => (
                        <div key={blog._id} className="px-3 py-1">
                            <a 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (setSelectedPost) {
                                        setSelectedPost(blog);
                                    }
                                }}
                                className="block text-sm font-medium hover:text-blue-600 cursor-pointer"
                            >
                                {blog.title}
                            </a>
                            <span className="text-xs text-gray-500">{formatDate(blog.date)}</span>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Categories;
