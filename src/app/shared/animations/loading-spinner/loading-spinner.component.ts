import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
    progress: number = 0;
    loadingText: string = 'Loading...';

    ngOnInit(): void {
        this.simulateProgress();
    }

    simulateProgress() {
        const interval = setInterval(() => {
            if (this.progress < 90) {
                this.progress += Math.floor(Math.random() * 5) + 1;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
}
