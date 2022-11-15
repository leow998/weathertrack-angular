import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { RegisterComponent } from './register/register.component';
 
const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'location', component: LocationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'map', component: MapComponent },
    { path: 'register', component: RegisterComponent },
    // { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
