import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Project } from '../models/project';
import { BlogPost } from '../models/blog-post';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  // API Base URL - environment dosyasından da alınabilir
  private apiUrl = '/api';

  getLatestProject(): Observable<Project | null> {
    // Backend'den tüm projeleri çekip client-side'da sıralıyoruz veya direkt /latest endpoint'i varsa o kullanılabilir.
    // Şimdilik genele uyumlu olması için listeyi çekip sıralamayı koruyorum.
    return this.http.get<any[]>(`${this.apiUrl}/projects`).pipe(
      map(projects => {
        if (!projects || projects.length === 0) return null;

        const mappedProjects: Project[] = projects.map(p => ({
          id: p.id,
          title: p.name || p.title, // Backend'den gelen veriye göre esneklik
          description: p.description || '',
          technologies: p.tech ? (Array.isArray(p.tech) ? p.tech : p.tech.split(', ')) : [],
          githubUrl: p.github || p.githubUrl || '',
          imageUrl: p.image || p.imageUrl,
          date: p.date,
          link: p.link
        }));

        return mappedProjects.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        })[0];
      })
    );
  }

  getLatestBlog(): Observable<BlogPost | null> {
    return this.http.get<any[]>(`${this.apiUrl}/blog`).pipe(
      map(posts => {
        if (!posts || posts.length === 0) return null;

        const mappedPosts: BlogPost[] = posts.map(p => ({
          id: p.id,
          title: p.title,
          summary: p.summary || '',
          content: p.content,
          publishDate: new Date(p.date || p.publishDate),
          imageUrl: p.image || p.imageUrl,
          author: p.author || 'Admin',
          category: p.category || 'General',
          readingTime: p.readingTime || 5,
          link: p.link
        }));

        return mappedPosts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())[0];
      })
    );
  }
}
