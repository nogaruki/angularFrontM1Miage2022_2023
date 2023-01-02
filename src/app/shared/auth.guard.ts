import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from './student.service';
import { TeacherService } from './teacher.service';
import { Teacher } from './model/teacher.model';
import { Student } from './model/student.model';
import * as e from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private studentService: StudentService, private teacherService: TeacherService,private router: Router) { }

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
        alert("Vous n'êtes pas un professeur");
      }
    }
    else if (userType === 'student') {
      if(localStorage.getItem('auth_type') === 'student' || localStorage.getItem('auth_type') === 'teacher' )
      {
        
        if(!this.studentService.isLoggedIn()) {
          return this.teacherService.isLoggedIn();
        } else {
          return true;
        }
      } else  {
        this.router.navigate(['/home']);
        alert("Vous n'êtes pas un élève");
      }
    } else {
      this.router.navigate(['/home']);
    }
    return true;
  }

  isTeacher(): boolean {
    return localStorage.getItem('auth_type') === 'teacher';
  }
  
}
