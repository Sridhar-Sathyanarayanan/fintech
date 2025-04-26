import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from 'emailjs-com';

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
  constructor(private snackBar: MatSnackBar) {}

  sendEmail(form: any) {
    this.loading = true;
    emailjs.send('service_b2x24t6', 'template_ztxbdek', {
      to_name: 'Meenakshi',
      name: form.name,
      message: form.message,
      from_mail: form.email
    }, 'jJStDRzevM9PZVp1V')
    .then((response) => {
      this.loading = false;
      this.snackBar.open('Message sent successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }, (error) => {
      this.loading = false;
      this.snackBar.open('Failed to send message. Please try again.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
}
