import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ExternalApiService } from '../../core/services/external-api.service';
import { forkJoin } from 'rxjs';

import { Project } from '../../core/models/project';
import { BlogPost } from '../../core/models/blog-post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // HTML tarafında hata almamak için boş objelerle başlatıyoruz
  musicData: any = null;
  steamData: any = null;
  latestProject: Project | null = null;
  latestBlog: BlogPost | null = null;

  // Typewriter variables
  fullText: string = "Selam, ben Melih.";
  typedText: string = "";
  showContent: boolean = false;
  private typeSpeed: number = 75; // Standart hız

  constructor(
    private contentService: ContentService,
    private externalService: ExternalApiService
  ) { }

  ngOnInit(): void {
    // Start typewriter effect
    this.startTypewriter();

    // Verileri ayrı ayrı çek (Hangi veri gelirse o kart hemen gözüksün)

    // Müzik
    this.externalService.getMusicStatus().subscribe({
      next: (data) => this.musicData = data,
      error: (err) => console.error('Müzik verisi hatası:', err)
    });

    // Steam
    this.externalService.getSteamStatus().subscribe({
      next: (data) => this.steamData = data,
      error: (err) => console.error('Steam verisi hatası:', err)
    });

    // Proje
    this.contentService.getLatestProject().subscribe({
      next: (data) => this.latestProject = data,
      error: (err) => console.error('Proje verisi hatası:', err)
    });

    // Blog
    this.contentService.getLatestBlog().subscribe({
      next: (data) => this.latestBlog = data,
      error: (err) => console.error('Blog verisi hatası:', err)
    });
  }

  private startTypewriter() {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < this.fullText.length) {
        this.typedText += this.fullText.charAt(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
        // Yazı bittiği an içeriği göster (veri gelip gelmemesinden bağımsız)
        this.showContent = true;
      }
    }, this.typeSpeed);
  }
}
