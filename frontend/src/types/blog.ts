export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'code' | 'blockquote' | 'hr';
  level?: number;
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
  style?: 'ordered' | 'unordered';
  items?: string[];
  content?: string; // For code blocks
}

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  contentBlocks: ContentBlock[];
  category: string;
  imageUrl: string;
}
