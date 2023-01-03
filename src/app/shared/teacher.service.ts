import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Teacher } from './model/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {


  private HttpOptions =  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  //prodURL :
  //url = "https://api-cours-johann-angular-2022.herokuapp.com/api/assignments"

  //devURL :
  url = "http://localhost:8010/api/teacher";

  constructor(private http:HttpClient) { }

  getTeacher(id:Number):Observable<Teacher> {
    return this.http.get<Teacher>(this.url + "/"+ id)
  }

  getTeacherByToken(token:any):Observable<Teacher> {
    this.HttpOptions.headers.append('x-access-token', ""+token);
    return this.http.get<Teacher>(this.url)
  }

  register (teacher:Teacher):Observable<Teacher> {
    let response = this.http.post<Teacher>(this.url +"/register" , teacher, this.HttpOptions);
    let result = JSON.stringify(response);
    let auth_type = result[0];
    let token = result[1];
    localStorage.setItem('auth_type', auth_type);
    localStorage.setItem('jwt', token);
    return response;
  }

  login (password:string, username:string):Observable<any> {
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
      if(auth_type !== "teacher") {
        let jwt = localStorage.getItem('jwt');
        this.getTeacherByToken(jwt).subscribe(teacher => {
          if(teacher == null) {
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
