import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('scrollAnimate') scrollItems!: QueryList<ElementRef>;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
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
          this.observer.unobserve(entry.target); // Animate only once
        }
      });
    }, options);

    // Select elements by class name manually since we didn't add template variables to all of them, 
    // or we can query selector all from the component's native element.
    const hiddenElements = this.el.nativeElement.querySelectorAll('.scroll-animate');
    hiddenElements.forEach((el: HTMLElement) => this.observer.observe(el));
  }
}
