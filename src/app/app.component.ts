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


  profile() {
    if (this.authGuard.isLoggedIn()) {
      if(this.authGuard.isStudent()) {
        this.router.navigate(['/student/profile']);
      } else if(this.authGuard.isTeacher()) {
        this.router.navigate(['/teacher/profile']);
      } else
        this.router.navigate(['/home']);
    }
  }

  login() {
    this.router.navigate(['/']);
  }

  create() {
    if(this.authGuard.isLoggedIn()) {
      this.router.navigate(['/add']);
    }
  }

  list() {
      this.router.navigate(['/home']);
  }

  logout() {
    this.authGuard.logOut();
    this.router.navigate(['/']);
  }
}
