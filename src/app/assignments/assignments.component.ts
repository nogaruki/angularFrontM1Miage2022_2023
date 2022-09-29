import { Component, OnInit } from '@angular/core';
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
  assignments:Assignments[] = [
    {
      nom: "Devoir Angular à rendre",
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
      rendu: true
    }
   
  ]
  
  ngOnInit(): void { 
   
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  assignmentClique(assignment:Assignments) {
    this.assignementSelectionne = assignment;
  }

  onNouvelleAssignement(event:Assignments) {
    this.assignments.push(event);
    this.formVisible = false;
  }
  constructor() { }

}
