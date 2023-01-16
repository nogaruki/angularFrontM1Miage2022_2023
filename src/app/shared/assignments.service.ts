import { Injectable } from '@angular/core';
import { Assignment } from './model/assignment.model';
import { Observable, of } from 'rxjs';
import {LoggingService} from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private HttpOptions =  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  //prodURL :
  url = "https://projet-angular-back.onrender.com//api/assignments"

  //devURL :
  //url = "http://localhost:8010/api/assignments";

  constructor (private loggingService:LoggingService, private http:HttpClient) { }


  getAssignments():Observable<Assignment[]> {
    // return of (this.assignments);
    return this.http.get<Assignment[]>(this.url)

  }

  getAssignmentsPagine(page: number, limit: number, filterValue: string, rendu: string): Observable<any> {
    const queryParams = {
      page: page,
      limit: limit,
      filterValue: filterValue,
      rendu: rendu
    }
    return this.http.get<any>(this.url, { params: queryParams });
  }

  getAssignment(id:number):Observable<Assignment> {
    // let assignment = this.assignments.find(assignment => assignment.id === id);
    // if(assignment == null) {
    //   return of (this.assignments[0]);
    // }
    // return of(assignment);
    return this.http.get<Assignment>(this.url + "/"+ id)

  }

  addAssignment(assignment:Assignment):Observable<any> {
    // this.assignments.push(assignment);
    // this.loggingService.log(assignment.nom ,"ajouté");
    // return of ("Assignment ajouté");
    return this.http.post<Assignment>(this.url , assignment, this.HttpOptions);
  }

  updateAssignment(assignement:Assignment):Observable<any> {
    // assignementTransmis.rendu = true;
    // return  of ("Assignment service: assignment modifié !");
    return this.http.put<Assignment>(this.url, assignement, this.HttpOptions)
  }

  deleteAssignment(assignment:Assignment): Observable<any> {
    // let pos = this.assignments.indexOf(assignment)
    // this.assignments.splice(pos,1);
    // return of( "Assignment service: assignment supprimé");

    let deleteURI = this.url + "/" +  assignment._id;
    return this.http.delete(deleteURI);
  }
  private handleError<T>(operation: string, result?: T) {
    return (error: any) : Observable<T> => {
        console.error(error);
        console.log(operation + " à échoué " + error.message)

        return of (result as T)
    }
  }
}

