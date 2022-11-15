import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-locationform',
  templateUrl: './locationform.component.html',
  styleUrls: ['./locationform.component.scss'],
})
export class LocationformComponent implements OnInit {
  locationForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private locationService: LocationService
  ) {
    this.locationService.currentCoordinates.subscribe((value) => {
        this.locationForm.controls['coordinates'].setValue(value);
    });
  }

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
      coordinates: ['', Validators.required],
    });
  }

  setCoordinates(coordinates: string) {
    this.locationForm.controls['coordinates'].setValue(coordinates);
  }

  addLocation() {
    if (localStorage.getItem('user') == null) {
      alert('Please login/register to use this service.');
      return;
    }

    var new_location = {
      id: 1,
      name: this.locationForm.value.name,
      coordinates: this.locationForm.value.coordinates,
      userid: Number(localStorage.getItem('user')),
    };

    this.locationService.create(new_location).subscribe((location) => {
      if (location != null) {
        alert('Location created successfully');
      } else {
        alert('Location creation failed');
      }
    });
  }
}
