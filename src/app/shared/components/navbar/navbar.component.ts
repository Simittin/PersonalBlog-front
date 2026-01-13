import { Component,OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true
})
export class NavbarComponent implements OnInit, OnDestroy {

  now: Date = new Date();
  private timer: any;

  isDarkMode: boolean = false;
  currentLang: string = 'TR';

  ngOnInit(): void {
    // Saati her saniye güncelle
    this.timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    // Sayfa kapanırsa sayacı durdur (performans için)
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    // Buraya ileride ThemeService bağlanacak
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'TR' ? 'EN' : 'TR';
    // Buraya ileride LanguageService bağlanacak
  }
}
