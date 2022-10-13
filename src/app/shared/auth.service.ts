import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  logIn() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isAdministrator() {
    const isUserAdmin = new Promise (
      (resolve, reject) => {
        resolve(this.loggedIn)
      }
    );
    return isUserAdmin;
  }
  constructor() { }
}
