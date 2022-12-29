import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from './model/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  url = "http://localhost:8010/api/subject";
  constructor(private http:HttpClient) { }

  getSubject(id:Number):Observable<Subject> {
    return this.http.get<Subject>(this.url + "/"+ id)
  }
}
