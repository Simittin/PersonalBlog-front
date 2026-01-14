import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [CommonModule, LottieComponent],
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
    options: AnimationOptions = {
        path: '/Progress of loading hand.json',
        loop: true,
        autoplay: true
    };

    progress: number = 0;
    loadingText: string = 'Loading...';
    private progressInterval: any;

    ngOnInit(): void {
        this.simulateProgress();
    }

    simulateProgress() {
        this.progressInterval = setInterval(() => {
            if (this.progress < 90) {
                this.progress += Math.floor(Math.random() * 5) + 1;
            } else {
                clearInterval(this.progressInterval);
            }
        }, 100);
    }

    ngOnDestroy() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }
}
