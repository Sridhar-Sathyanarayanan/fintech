import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackData } from '../models/core.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  submitFeedback(params: FeedbackData): Observable<any> {
    return this.http.post(`${this.baseUrl}${environment.apiEndpoints.feedback}`, params);
  }
}
