import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Application de gestion des devoirs à rendre (Assignments)';  

  constructor (private router: Router, private authGuard: AuthGuard) {}

  isLogin() {
    return this.authGuard.isLoggedIn();
  }


}
