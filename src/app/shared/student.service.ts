import { Injectable } from '@angular/core';
import { Assignment } from './model/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from  'rxjs/operators';
import { Student } from './model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = "http://localhost:8010/api/student";
  private HttpOptions =  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) { }

  getStudent(id:Number):Observable<Student> {
    return this.http.get<Student>(this.url + "/"+ id)
  }

  getStudentByToken(token:any):Observable<Student> {
    this.HttpOptions.headers.append('x-access-token', ""+token);
    return this.http.get<Student>(this.url)
  }

  register (student:Student):Observable<Teacher> {
    let response = this.http.post<Teacher>(this.url +"/register" , student, this.HttpOptions);
    let result = JSON.stringify(response);
    let auth_type = result[0];
    let token = result[1];
    localStorage.setItem('auth_type', auth_type);
    localStorage.setItem('jwt', token);
    return response;
  }

  login (password:string, username:Student):Observable<any> {
    let response = this.http.post<{}>(this.url +"/login" , {password: password, username: username}, this.HttpOptions);
    let result = JSON.stringify(response);
    let auth_type = result[0];
    let token = result[1];
    localStorage.setItem('auth_type', auth_type);
    localStorage.setItem('jwt', token);
    return response;
  }

  isLoggedIn():boolean {
    if(localStorage.getItem('jwt') !== null) {
      let auth_type = localStorage.getItem('auth_type');
      if(auth_type !== "student") {
        let jwt = localStorage.getItem('jwt');
        this.getStudentByToken(jwt).subscribe(student => {
          if(student == null) {
            return false;
          } else {
            return true;
          }
        });
      }
    }
      return false;
  }
}
