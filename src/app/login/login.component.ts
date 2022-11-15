import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  attemptLogin() {
    this.userService
      .authCheck(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((user) => {
        if (user != null) {
          localStorage.setItem('user', user.id.toString());
          this.userService.isUserLoggedIn.next(true);
          this.router.navigate(['map']);
        }
      });
  }
}
