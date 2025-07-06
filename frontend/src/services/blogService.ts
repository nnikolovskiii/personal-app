import type { BlogPost } from '../types/blog';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getBlogPosts = async (
    category?: string,
    sortBy?: string,
    sortOrder?: string
): Promise<BlogPost[]> => {
    const params = new URLSearchParams();
    if (category && category.toLowerCase() !== 'all') {
        params.append('category', category);
    }
    if (sortBy) {
        params.append('sort_by', sortBy);
    }
    if (sortOrder) {
        params.append('sort_order', sortOrder);
    }

    const response = await fetch(`${API_URL}/blog?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
    }
    return response.json();
};
