import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'coordinates',

    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private locationService: LocationService,
    private weatherService: WeatherService,
  ) {}

  ngOnInit(): void {
    this.authUser();
    this.getLocations();
  }
  
  authUser() {
    var loggedIn = localStorage.getItem('currentUser');
    if (!loggedIn) {
      this.router.navigate(['welcome']);
    }
  }

  getLocations() {
    this.locationService
      .getLocations(Number(localStorage.getItem('user')))
      .subscribe({
        next: (res) => {
            console.log(res);
          this.dataSource = new MatTableDataSource(res);
        }
      });
  }

  getWeather(coordinates: string) {
    this.weatherService
    .getWeather(coordinates)
    .subscribe({
        next: (res: any) => {
            var weather = res.data[0].weather.description;
            alert("The weather forecast are this location is " + weather);
        }
    })
  }

  deleteLocation(id: number) {
    this.locationService.delete(Number(id)).subscribe({
      next: (res) => {
        this.getLocations();
      }
    });
  }
}
