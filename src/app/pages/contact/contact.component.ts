import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      // Buraya backend post işlemi gelecek
      alert('Mesajınız gönderildi!'); // Geçici bildirim
      this.contactForm.reset();
    } else {
      // Formu doğrula ve hataları göster
      this.contactForm.markAllAsTouched();
    }
  }
}
