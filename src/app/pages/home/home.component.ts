import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ExternalApiService } from '../../core/services/external-api.service';
import { SteamService } from '../../core/services/steam.service';
import { forkJoin, interval, Subscription, switchMap } from 'rxjs';

import { Project } from '../../core/models/project';
import { BlogPost } from '../../core/models/blog-post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

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

  private steamSubscription: Subscription | undefined;

  constructor(
    private contentService: ContentService,
    private externalService: ExternalApiService,
    private steamService: SteamService
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

    // Steam - Polling logic
    this.startSteamPolling();

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

  ngOnDestroy(): void {
    if (this.steamSubscription) {
      this.steamSubscription.unsubscribe();
    }
  }

  private startSteamPolling() {
    // Initial call
    this.fetchSteamData();

    // Poll every 60 seconds
    this.steamSubscription = interval(60000).subscribe(() => {
      this.fetchSteamData();
    });
  }

  private fetchSteamData() {
    this.steamService.getSteamStatus().subscribe({
      next: (data) => {
        this.steamData = {
          status: data.playing ? 'Oynuyor' : (data.personastate !== 0 ? 'Çevrimiçi' : 'Çevrimdışı'),
          game: data.playing ? data.gameextrainfo : data.personaname,
          // hours field is removed as API doesn't provide it easily in this endpoint
          avatar: data.avatarfull,
          headerImage: data.headerImage
        };
      },
      error: (err) => {
        console.error('Steam verisi hatası:', err);
        // Fallback to offline or null
        this.steamData = null;
      }
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
