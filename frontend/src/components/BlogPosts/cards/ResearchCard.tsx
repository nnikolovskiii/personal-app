import React from 'react';
import type { BlogPost } from '../../../types/blog';

interface ResearchCardProps {
    post: BlogPost;
    onClick: (post: BlogPost) => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ post, onClick }) => {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const imageBlock = post.contentBlocks.find(block => block.type === 'image');
    const imageUrl = imageBlock?.src || 'https://via.placeholder.com/400x300';
    const imageAlt = imageBlock?.alt || post.title;

    return (
        <a href="#" onClick={() => onClick(post)} className="group">
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden mb-4 bg-gray-100 transition-transform duration-300 group-hover:scale-105">
                <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-medium text-lg mb-1 group-hover:text-black">{post.title}</h3>
            <p className="text-sm text-gray-500">
                <span className="ml-2">{formattedDate}</span>
            </p>
        </a>
    );
};

export default ResearchCard;
