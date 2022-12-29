import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
