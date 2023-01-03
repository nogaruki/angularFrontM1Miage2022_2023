import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private HttpOptions =  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //prodURL :
  //url = "https://api-cours-johann-angular-2022.herokuapp.com/api/assignments"

  //devURL :
  url = "http://localhost:8010/api/user";

  constructor(private http: HttpClient) { }

  getUser(id:Number):Observable<User> {
    return this.http.get<User>(this.url + "/"+ id)
  }
}
