import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackData } from '../models/chart.models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl = 'http://localhost:3010'; // Your Node.js backend URL

  constructor(private http: HttpClient) {}

  submitFeedback(params: FeedbackData): Observable<any> {
    return this.http.post(`${this.baseUrl}/feedback/sendMail`, params);
  }
}
