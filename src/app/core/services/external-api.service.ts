import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  constructor() { }

  getMusicStatus(): Observable<any> {
    // [BACKEND]: İleride buraya gerçek API isteği gelecek.
    // Örnek: return this.http.get('/api/music/now-playing');

    // ŞİMDİLİK: Statik veri dönüyoruz.
    return of({
      isPlaying: true,
      song: "Midnight City",
      artist: "M83",
      cover: "assets/images/music-cover.jpg", // Assets klasörüne rastgele bir resim atabilirsin
      platform: "Apple Music"
    });
  }

  getSteamStatus(): Observable<any> {
    // [BACKEND]: İleride buraya Steam API isteği gelecek.
    // Örnek: return this.http.get('/api/steam/status');

    // ŞİMDİLİK: Statik veri dönüyoruz.
    return of({
      isOnline: true,
      status: "Oynuyor",
      game: "Baldur's Gate 3",
      hours: 85
    });
  }
}
