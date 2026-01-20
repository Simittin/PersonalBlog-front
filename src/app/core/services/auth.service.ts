import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject: BehaviorSubject<boolean>;
    public isLoggedIn$: Observable<boolean>;
    private readonly TOKEN_KEY = 'auth_token'; // Simple token simulation

    constructor(private router: Router) {
        // Check if token exists in localStorage on initialization
        const hasToken = this.hasToken();
        this.isLoggedInSubject = new BehaviorSubject<boolean>(hasToken);
        this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    }

    login(username: string): boolean {
        // Check against environment variables
        // In a real app, you would send credentials to backend
        if (username === environment.adminUsername) {
            localStorage.setItem(this.TOKEN_KEY, 'mock-admin-token-' + Date.now());
            this.isLoggedInSubject.next(true);
            return true;
        }
        return false;
    }


    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/admin/login']);
    }

    isLoggedIn(): boolean {
        return this.isLoggedInSubject.value;
    }

    private hasToken(): boolean {
        // Check if localStorage is available (SSR safety check if needed, though usually not for admin panel)
        if (typeof localStorage !== 'undefined') {
            return !!localStorage.getItem(this.TOKEN_KEY);
        }
        return false;
    }
}
