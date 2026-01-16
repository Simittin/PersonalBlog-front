import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogPost } from '../../core/models/blog-post';
import { BlogService } from '../../core/services/blog.service';
import { LoadingSpinnerComponent } from '../../shared/animations/loading/loading.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  post: BlogPost | undefined;
  isLoading: boolean = true;

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
            this.isLoading = false;
          },
          error: (error) => {
            // Handle invalid ID or error (redirect to blog list)
            console.error('Error fetching blog post:', error);
            this.isLoading = false;
            this.router.navigate(['/blog']);
          }
        });
      } else {
        this.isLoading = false;
      }
    });
  }
}
