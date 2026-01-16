import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';
import { BlogPost } from '../../../../core/models/blog-post';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-blog.component.html',
  styleUrl: './admin-blog.component.scss'
})
export class AdminBlogComponent implements OnInit {
  blogs: BlogPost[] = [];

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.contentService.getBlogs().subscribe(data => {
      this.blogs = data;
    });
  }

  deleteBlog(id: string | number) {
    if (confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      this.contentService.deleteBlog(id.toString()).subscribe(() => {
        this.blogs = this.blogs.filter(b => b.id !== id);
      });
    }
  }

  // Edit and Add functionality would go here (e.g., opening a modal)
}
