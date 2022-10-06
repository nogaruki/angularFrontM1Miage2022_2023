import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignments } from './assignment.model';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les Assignments !';
  formVisible = false;
  assignementSelectionne!:Assignments;
  assignments!: Assignments[];

  constructor (private assignmentsService: AssignmentsService) {}
  
  ngOnInit(){ 
   this.getAssginements();
  }
  getAssginements()
  {
    this.assignmentsService.getAssignments().subscribe( assignement => this.assignments = assignement); 
  }
 

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  assignmentClique(assignment:Assignments) {
    this.assignementSelectionne = assignment;
  }

  onNouvelleAssignement(event:Assignments) {
    // this.assignments.push(event);

    this.assignmentsService.addAssignment(event).subscribe( message => console.log(message));
    this.formVisible = false;
  }

}
