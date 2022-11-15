import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  authUser() {
    var loggedIn = localStorage.getItem('currentUser');
    if (!loggedIn) {
      this.router.navigate(['welcome']);
    }
  }

}
