import React from 'react';
import type { BlogPost, ContentBlock } from '../../types/blog';
import { ArrowLeftIcon } from './icons';
import './BlogPostDetail.css';

interface BlogPostDetailProps {
    post: BlogPost;
    onBackClick: () => void;
}

const renderBlock = (block: ContentBlock, index: number) => {
  switch (block.type) {
    case 'heading':
      const HeadingTag = `h${block.level || 1}` as React.ElementType;
      return <HeadingTag key={index}>{block.text}</HeadingTag>;

    case 'paragraph':
      return <p key={index}>{block.text}</p>;

    case 'image':
      return (
        <figure key={index} className="flex flex-col justify-center items-center">
          <img src={block.src} alt={block.alt} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case 'list':
      const ListTag = block.style === 'ordered' ? 'ol' : 'ul';
      return (
        <ListTag key={index}>
          {block.items?.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ListTag>
      );

    case 'code':
      return (
        <pre key={index}>
          <code>{block.content}</code>
        </pre>
      );

    case 'blockquote':
      return (
        <blockquote key={index}>{block.text}</blockquote>
      );

    case 'hr':
      return <hr key={index} />;

    default:
      return null;
  }
};

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBackClick }) => {
    if (!post) {
        return <div>Loading post...</div>;
    }

    return (
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBackClick} className="back-button">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Back to Blog Posts
                </button>
                <article className="blog-post">
                    <h1 className="blog-title">{post.title}</h1>
                    <div className="blog-meta">
                        <span>By {post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="blog-content">
                        {post.contentBlocks.map((block, index) => renderBlock(block, index))}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogPostDetail;
