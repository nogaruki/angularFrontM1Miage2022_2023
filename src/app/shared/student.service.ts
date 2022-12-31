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

  register(student: Student){
    return this.http.post<Student>(this.url +"/register" , student, this.HttpOptions);
  }

  login(password: string, username: string){
    return this.http.post<{}>(this.url +"/login" , {password: password, username: username}, this.HttpOptions);
  }
}
