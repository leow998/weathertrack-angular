import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { EmailService } from '../services/email.service';
import { Email } from '../models/email';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  email: Email = {
    "recipient": "",
    "msgBody": "",
    "subject": ""
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  register() {
    var new_user = {
      "id": 1,
      "username": this.registrationForm.value.username,
      "password": this.registrationForm.value.password,
      "email": this.registrationForm.value.email
    }

    console.log(new_user);

    this.email.recipient = new_user.email;
    this.email.subject = "Account Registration at Weather Track!";
    this.email.msgBody = "Greetings " + new_user.username + "! Thanks for joining the community at Weather Track. Start your journey now!";

    this.userService
      .create(new_user)
      .subscribe((user) => {
        if (user != null) {
          localStorage.setItem('user', user.id.toString());
          this.userService.isUserLoggedIn.next(true);
          this.emailService.sendEmail(this.email).subscribe();
          this.router.navigate(['map']);
        }
      });
  }
}
