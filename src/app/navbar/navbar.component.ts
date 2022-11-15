import { Component, OnInit } from '@angular/core';
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    faCloudBolt = faCloudBolt;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  get loggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  routeMain() {
    if (this.loggedIn) {
        this.router.navigate(['maps']);
      } else {
        this.router.navigate(['welcome']);
      }
  }

  loginDialog() {
    this.dialog.open(LoginComponent)
  }

  registrationDialog() {
    
  }
}
