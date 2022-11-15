import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { User } from '../models/user';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServer = 'https://weathertrack-springboot.herokuapp.com//api';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    }),
  };

  create(user: User): Observable<User> {
    return this.httpClient
      .post<User>(
        this.apiServer + '/users/',
        JSON.stringify(user),
        this.httpOptions
      )
  }

  // DELETE ?
  getById(id: number): Observable<User> {
    return this.httpClient
      .get<User>(this.apiServer + '/users/id/' + id)
  }

  getByUsername(username: string): Observable<User> {
    return this.httpClient
      .get<User>(this.apiServer + '/users/username/' + username)
  }

  authCheck(username: string, password: string): Observable<User> {
    var credentials = {
      username: username,
      password: password,
    };
    return this.httpClient
      .post<User>(
        this.apiServer + '/users/login/',
        JSON.stringify(credentials),
        this.httpOptions
      )
  }
}
