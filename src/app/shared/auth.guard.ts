import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from './student.service';
import { TeacherService } from './teacher.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private studentService: StudentService, private teacherService: TeacherService,private router: Router, private  snackbar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userType = route.data["userType"];

    if (userType === 'teacher') {
      if(localStorage.getItem('auth_type') === 'teacher')
      {
        return this.teacherService.isLoggedIn();
      } else {
        this.router.navigate(['/home']);
        this.snackbar.open("Vous n'êtes pas un professeur", "OK", {
          duration: 2000,
        });

      }
    }
    else if (userType === 'student') {
      if(localStorage.getItem('auth_type') === 'student')
      {
         return this.studentService.isLoggedIn();
      } else  {
        this.router.navigate(['/home']);
        this.snackbar.open("Vous n'êtes pas un élève", "OK", {
          duration: 2000,
        });
      }
    } else {
      this.router.navigate(['/home']);
    }
    return true;
  }

  isTeacher(): boolean {
    return localStorage.getItem('auth_type') === 'teacher';
  }

  isStudent(): boolean {
    return localStorage.getItem('auth_type') === 'student';
  }

  isInvite(): boolean {
    return localStorage.getItem('auth_type') === 'invite';
  }


  isLoggedIn(): boolean {
    return this.isStudent() || this.isTeacher() || this.isInvite();
  }

  logOut() {
    console.log("deconnexion")
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('jwt');
  }
}
