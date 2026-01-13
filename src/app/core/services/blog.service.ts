import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    private apiUrl = '/api/blog';

    constructor(private http: HttpClient) { }

    getPosts(): Observable<BlogPost[]> {
        return this.http.get<BlogPost[]>(this.apiUrl);
    }

    getPostById(id: number | string): Observable<BlogPost> {
        return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
    }

    createPost(blog: BlogPost): Observable<BlogPost> {
        return this.http.post<BlogPost>(this.apiUrl, blog);
    }

    updatePost(id: string | number, blog: BlogPost): Observable<BlogPost> {
        return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, blog);
    }

    deletePost(id: string | number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
