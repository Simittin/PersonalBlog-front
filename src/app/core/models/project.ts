export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    imageUrl: string;
    // Fields from JSON that might need mapping or direct usage
    date?: string | Date;
    link?: string;
}
