import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Project } from '../../core/models/project';
import { ProjectService } from '../../core/services/project.service';
import { LoadingSpinnerComponent } from '../../shared/animations/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  projects: Project[] = [];
  isLoading: boolean = true;
  private observer!: IntersectionObserver;

  constructor(private projectService: ProjectService, private el: ElementRef) { }

  ngOnInit(): void {
    this.getProjects();
  }

  ngAfterViewInit() {
    // Initial setup if needed, but data loads async so we mostly rely on getProjects
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
        this.isLoading = false;
        // Wait for view to update then observe elements
        setTimeout(() => {
          this.setupIntersectionObserver();
        }, 100);
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
        this.isLoading = false;
      }
    });
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
}
