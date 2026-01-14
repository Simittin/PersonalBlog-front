import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../core/services/content.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats = {
    messages: 0,
    blogs: 0,
    projects: 0
  };

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.contentService.getMessages().subscribe(msgs => this.stats.messages = msgs.length);
    this.contentService.getBlogs().subscribe(blogs => this.stats.blogs = blogs.length);
    this.contentService.getProjects().subscribe(projects => this.stats.projects = projects.length);
  }
}
