import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        console.log('Submit button clicked'); // Debug log
        if (this.loginForm.valid) {
            this.isLoading = true;

            const rawUsername = this.loginForm.get('username')?.value;
            const rawPassword = this.loginForm.get('password')?.value;

            const username = rawUsername ? rawUsername.trim() : '';
            const password = rawPassword ? rawPassword.trim() : '';

            console.log('Attempting login with:', username, password);

            // Temporarily accept ANY credentials if username is admin
            if (username === 'admin') {
                console.log('Login success. Navigating...');
                this.router.navigate(['/admin/dashboard']).then(success => {
                    if (success) {
                        console.log('Navigation successful');
                    } else {
                        console.error('Navigation failed');
                        this.errorMessage = 'Yönlendirme hatası!';
                        this.isLoading = false;
                    }
                }).catch(err => {
                    console.error('Navigation error:', err);
                    this.errorMessage = 'Yönlendirme sistemsel hatası: ' + err;
                    this.isLoading = false;
                });
            } else {
                console.log('Invalid credentials');
                this.errorMessage = 'Kullanıcı adı "admin" olmalı.';
                this.isLoading = false;
            }
        } else {
            console.log('Form invalid');
            this.loginForm.markAllAsTouched();
        }
    }
}
