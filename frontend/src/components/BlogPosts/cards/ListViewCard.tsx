import React from 'react';
import type { BlogPost } from '../../../types/blog';

interface ListViewCardProps {
    post: BlogPost;
    onClick: (post: BlogPost) => void;
}

const ListViewCard: React.FC<ListViewCardProps> = ({ post, onClick }) => {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const imageBlock = post.contentBlocks.find(block => block.type === 'image');
    const imageUrl = imageBlock?.src || 'https://via.placeholder.com/400x300';
    const imageAlt = imageBlock?.alt || post.title;

    return (
        <a href="#" onClick={() => onClick(post)} className="group flex items-center space-x-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
                <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h3 className="font-medium text-lg mb-1 group-hover:text-black">{post.title}</h3>
                <p className="text-sm text-gray-500">
                    <span className="ml-2">{formattedDate}</span>
                </p>
            </div>
        </a>
    );
};

export default ListViewCard;
