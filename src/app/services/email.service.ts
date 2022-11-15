import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { Email } from '../models/email';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiServer = 'https://weathertrack-springboot.herokuapp.com/api';

  constructor(private httpClient: HttpClient) {}
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    }),
  };

  sendEmail(email: Email): Observable<Email> {
    return this.httpClient
      .post<Email>(
        this.apiServer + '/sendEmail/',
        JSON.stringify(email),
        this.httpOptions
      )
  }
}
