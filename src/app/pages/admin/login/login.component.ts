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
        if (this.loginForm.valid) {
            this.isLoading = true;
            // Simulating API call
            setTimeout(() => {
                console.log(this.loginForm.value);
                this.isLoading = false;
                // Navigation logic will go here
            }, 1500);
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
