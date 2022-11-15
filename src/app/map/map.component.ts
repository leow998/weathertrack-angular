import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { GoogleMap } from '@angular/google-maps';

import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  @ViewChild('searchField') searchField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;

  latValue!: Number;
  lngValue!: Number;

  zoom = 12;
  mapConfig = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true,
  };

  constructor(private locationService: LocationService) {}

  ngAfterViewInit(): void {
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement
    );

    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  placeMarker($event: any) {
    this.latValue = $event.latLng.lat();
    this.lngValue = $event.latLng.lng();
    this.locationService.currentCoordinates.next(this.latValue + "," + this.lngValue);
  }
}
