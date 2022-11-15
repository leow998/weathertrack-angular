import { Component, OnInit } from '@angular/core';
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    faCloudBolt = faCloudBolt;
    loggedIn: boolean = false;

  constructor(private dialog: MatDialog, private router: Router, private userService: UserService) {
    this.userService.isUserLoggedIn.subscribe(value => {
        this.loggedIn = value;
    })
  }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('user') != null;
  }

  routeMain() {
    if (this.loggedIn) {
        this.router.navigate(['location']);
      } else {
        this.router.navigate(['welcome']);
      }
  }

  routeMap() {
    if (this.loggedIn) {
        this.router.navigate(['map']);
      } else {
        this.router.navigate(['welcome']);
      }
  }

  loginDialog() {
    this.dialog.open(LoginComponent);
  }

  registrationDialog() {
    this.dialog.open(RegisterComponent)
  }

  logout() {
    localStorage.removeItem('user');
    this.userService.isUserLoggedIn.next(false);
    this.router.navigate(['welcome']);
  }
}
