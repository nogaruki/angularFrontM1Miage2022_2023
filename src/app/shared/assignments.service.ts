import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import {LoggingService} from './logging.service';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignments:Assignment[] = [
    {
      id: 1,
      nom: "TP1 sur WebComponents, un lecteur audio amélioré",
      dateDeRendu: new Date("2022-10-10"),
      rendu: true
    },
    {
      id: 2,
      nom: "Devoir NodeJs à rendre",
      dateDeRendu:  new Date("2022-11-10"),
      rendu: false
    },
    {
      id: 3,
      nom: "Devoir JAVA à rendre",
      dateDeRendu:  new Date("2022-12-10"),
      rendu: false
    }
  ]   
  constructor (private loggingService:LoggingService) { }
    

  getAssignments():Observable<Assignment[]> {   
    return of (this.assignments);
  }

  getAssignment(id:number):Observable<Assignment> {
    let assignment = this.assignments.find(assignment => assignment.id === id);
    if(assignment == null) {
      return of (this.assignments[0]);
    }
    return of(assignment);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);
    this.loggingService.log(assignment.nom ,"ajouté");
    return of ("Assignment ajouté");
  }

  updateAssignment(assignementTransmis:Assignment):Observable<string> {
    assignementTransmis.rendu = true;
    return  of ("Assignment service: assignment modifié !");
  }

  deleteAssignment(assignment:Assignment): Observable<string> {
    let pos = this.assignments.indexOf(assignment)
    this.assignments.splice(pos,1);
    return of( "Assignment service: assignment supprimé");

  }
}

