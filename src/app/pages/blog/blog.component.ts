import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogPost } from '../../core/models/blog-post';
import { BlogService } from '../../core/services/blog.service';
import { LoadingSpinnerComponent } from '../../shared/animations/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit, AfterViewInit, OnDestroy {
  blogPosts: BlogPost[] = [];
  isLoading: boolean = true;
  private observer!: IntersectionObserver;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        this.isLoading = false;
        // Wait for view to update then observe elements
        setTimeout(() => {
          this.setupIntersectionObserver();
        }, 100);
      },
      error: (error) => {
        console.error('Error fetching blog posts:', error);
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    // Initial setup if needed
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    const hiddenElements = this.el.nativeElement.querySelectorAll('.scroll-animate');
    hiddenElements.forEach((el: HTMLElement) => this.observer.observe(el));
  }

  onPostClick(postId: number | string) {
    this.router.navigate(['/blog', postId]);
  }
}
