import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

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
