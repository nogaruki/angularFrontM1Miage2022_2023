import { Injectable } from '@angular/core';
import { Assignments } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignments:Assignments[] = [
    {
      nom: "TP1 sur WebComponents, un lecteur audio amélioré",
      dateDeRendu: new Date("2022-10-10"),
      rendu: true
    },
    {
      nom: "Devoir NodeJs à rendre",
      dateDeRendu:  new Date("2022-11-10"),
      rendu: false
    },
    {
      nom: "Devoir JAVA à rendre",
      dateDeRendu:  new Date("2022-12-10"),
      rendu: false
    }
  ]   
  constructor() { }

  getAssignments():Observable<Assignments[]> {   
    return of (this.assignments);
  }

  addAssignment(assignment:Assignments):Observable<string> {
    this.assignments.push(assignment);
    return of ("Assignment ajouté");
  }

  updateAssignment(assignementTransmis:Assignments):Observable<string> {
    assignementTransmis.rendu = true;
    return  of ("Assignment service: assignment modifié !");
  }

  deleteAssignment(event:Assignments): Observable<string> {
    let i = 0;
    while(i < this.assignments.length - 1 && this.assignments[i] !== event) {
      i++;
    }
    if(this.assignments[i] === event) {
      this.assignments.splice(i,1);
    }
    return of( "Assignment service: assignment supprimé");

  }
}

