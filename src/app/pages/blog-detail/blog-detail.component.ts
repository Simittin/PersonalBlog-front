import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogPost } from '../../core/models/blog-post';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  post: BlogPost | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.blogService.getPostById(id).subscribe({
          next: (post) => {
            this.post = post;
          },
          error: (error) => {
            // Handle invalid ID or error (redirect to blog list)
            console.error('Error fetching blog post:', error);
            this.router.navigate(['/blog']);
          }
        });
      }
    });
  }
}
