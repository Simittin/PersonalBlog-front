import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LottieComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;
  showSuccessModal: boolean = false;
  options: AnimationOptions = {
    path: '/Success.json',
    loop: false,
    autoplay: true
  };

  constructor(private fb: FormBuilder, private contentService: ContentService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contentService.sendMessage(this.contactForm.value).subscribe({
        next: (response) => {
          console.log('Message sent:', response);
          this.showSuccessModal = true;
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error sending message:', error);
          alert('Mesaj gönderilirken bir hata oluştu.');
        }
      });
    } else {
      // Formu doğrula ve hataları göster
      this.contactForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showSuccessModal = false;
  }
}