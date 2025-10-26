import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../services/app.service';
import { MaterialModules } from '../shared/material.standalone';

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
}

interface SocialLink {
  icon: string;
  name: string;
  url: string;
  color: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModules],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  loading = signal(false);
  formSubmitted = signal(false);

  contactInfo: ContactInfo[] = [
    {
      icon: 'email',
      title: 'Email Us',
      value: 'support@amkrtech.com',
      link: 'mailto:support@amkrtech.com',
    },
    {
      icon: 'phone',
      title: 'Call Us',
      value: '+91 9790 82 42 37',
      link: 'tel:+919790824237',
    },
    {
      icon: 'location_on',
      title: 'Location',
      value: 'Chennai, India',
    },
    {
      icon: 'schedule',
      title: 'Working Hours',
      value: 'Mon - Fri: 9AM - 6PM',
    },
  ];

  socialLinks: SocialLink[] = [
    {
      icon: 'facebook',
      name: 'Facebook',
      url: '#',
      color: '#1877f2',
    },
    {
      icon: 'twitter',
      name: 'Twitter',
      url: '#',
      color: '#1da1f2',
    },
    {
      icon: 'linkedin',
      name: 'LinkedIn',
      url: '#',
      color: '#0a66c2',
    },
    {
      icon: 'instagram',
      name: 'Instagram',
      url: '#',
      color: '#e4405f',
    },
  ];

  faqs = [
    {
      question: 'How quickly will I receive a response?',
      answer: 'We typically respond within 24 hours during business days.',
    },
    {
      question: 'Can I schedule a call?',
      answer:
        "Yes! Mention your preferred time in the message and we'll arrange a call.",
    },
    {
      question: 'Do you offer technical support?',
      answer:
        'Absolutely! Our team is here to help with any technical questions.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private service: AppService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get subject() {
    return this.contactForm.get('subject');
  }

  get message() {
    return this.contactForm.get('message');
  }

  sendFeedback() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    this.loading.set(true);
    const formValue = this.contactForm.value;

    // Send confirmation to user
    this.service
      .submitFeedback({
        message: `Thank you ${formValue.name} for contacting us regarding "${formValue.subject}". We will get back to you soon.`,
        email: formValue.email,
      })
      .subscribe({
        next: () => {
          // Send notification to support
          this.service
            .submitFeedback({
              message: `New contact form submission:\n\nName: ${formValue.name}\nEmail: ${formValue.email}\nSubject: ${formValue.subject}\nMessage: ${formValue.message}`,
              email: 'support@amkrtech.com',
            })
            .subscribe({
              next: () => {
                this.loading.set(false);
                this.formSubmitted.set(true);
                this.snackBar.open(
                  "Message sent successfully! We'll be in touch soon.",
                  'Close',
                  {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    panelClass: ['success-snackbar'],
                  }
                );
                this.contactForm.reset();

                // Reset success state after animation
                setTimeout(() => this.formSubmitted.set(false), 3000);
              },
              error: () => {
                this.loading.set(false);
                this.showError();
              },
            });
        },
        error: () => {
          this.loading.set(false);
          this.showError();
        },
      });
  }

  private showError() {
    this.snackBar.open('Failed to send message. Please try again.', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  openLink(link?: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
