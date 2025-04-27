import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from 'emailjs-com';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(private service: AppService, private snackBar : MatSnackBar) {}

  sendFeedback(form: any) {
    this.loading = true;
    this.service.submitFeedback({
      message: `Thank you ${form.name} for your feedback. We will get back to you soon.`,
      email: form.email,
    }).subscribe(
      (response) => {
        this.loading = false;
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });   
    this.service.submitFeedback({
      message: form.message,
      email: 'support@amkrtech.com',
    }).subscribe((response) => {
      this.loading = false;
      this.snackBar.open('Message sent successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
