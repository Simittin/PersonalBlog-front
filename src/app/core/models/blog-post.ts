export interface BlogPost {
    id: number | string;
    title: string;
    summary: string;
    content: string;
    publishDate: Date;
    imageUrl: string;
    author: string;
    category: string;
    tags?: string[];
    readingTime: number; // in minutes
    link?: string;
}
