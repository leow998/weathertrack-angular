import { Component, OnInit } from '@angular/core';
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  faCloudBolt = faCloudBolt;

  constructor() {}

  ngOnInit(): void {}
}
