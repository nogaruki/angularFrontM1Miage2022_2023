import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url = "http://localhost:8010/api/comment";

  constructor(private http:HttpClient) { }

  getComments(assignment_id:Number):Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + "s/"+ assignment_id)
  }

}
