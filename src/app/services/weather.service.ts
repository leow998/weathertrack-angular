import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherAPI = 'https://weatherbit-v1-mashape.p.rapidapi.com/';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': 'd19217ef57mshd30ab0049c08146p1e9121jsn44e49796717c',
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
      useQueryString: 'true',
    }),
  };

  getWeather(coordinates: string) {
    var coords = coordinates.split(',');
    var lat = coords[0];
    var lng = coords[1];
    return this.httpClient.get(
      this.weatherAPI + 'current?lon=' + lng + '&lat=' + lat,
      this.httpOptions
    );
  }
}
