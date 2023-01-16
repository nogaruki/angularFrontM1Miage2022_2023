import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from './model/student.model';

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
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    }
    return this.http.get<Student>(this.url, options);
  }



  register (student:Student):Observable<any> {
    return this.http.post<Student>(this.url + "/register", student, this.HttpOptions);
  }

  updateStudent (student:Student):Observable<any> {
    return this.http.post<{}>(this.url + "/update", student, this.HttpOptions);
  }

  login (password:string, username:string):Observable<any> {
    return this.http.post<{}>(this.url + "/login", {password: password, username: username}, this.HttpOptions);
  }

  async isLoggedIn(): Promise<boolean> {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      let auth_type = localStorage.getItem('auth_type');
      if (auth_type === "student") {
        return new Promise((resolve) => {
          this.getStudentByToken(jwt).subscribe(student => {
            resolve(student !== null);
          });
        });
      }
    }
    return Promise.resolve(false);
  }


}
