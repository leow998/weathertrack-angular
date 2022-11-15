import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public currentCoordinates: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

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

  create(location: Location): Observable<Location> {
    return this.httpClient.post<Location>(
      this.apiServer + '/locations/',
      JSON.stringify(location),
      this.httpOptions
    );
  }

  getLocations(id: number): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.apiServer + '/locations/' + id);
  }

  delete(id: number) {
    return this.httpClient.delete<Location>(
      this.apiServer + '/locations/' + id,
      this.httpOptions
    );
  }
}
