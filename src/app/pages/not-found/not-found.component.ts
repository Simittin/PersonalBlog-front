import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  imports: [LottieComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  options: AnimationOptions = {
    path: '/404 error GLiTch 2.json',
  };
}
