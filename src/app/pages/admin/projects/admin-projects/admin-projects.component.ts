import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';
import { Project } from '../../../../core/models/project';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.scss'
})
export class AdminProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.contentService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  deleteProject(id: string | number) { // Project ID can be string or number based on model
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      this.contentService.deleteProject(id.toString()).subscribe(() => {
        this.projects = this.projects.filter(p => p.id !== id);
      });
    }
  }
}
