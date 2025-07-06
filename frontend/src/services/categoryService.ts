import type { Category } from '../types/category';

// Get API URL from runtime config if available, otherwise from import.meta.env
const API_URL = typeof window !== 'undefined' && window.ENV?.VITE_API_URL 
  ? window.ENV.VITE_API_URL 
  : import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${API_URL}/category`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
};
