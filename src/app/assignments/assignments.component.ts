import { Component, OnInit } from '@angular/core';
import { Assignments } from './assignment.model';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les Assignments !';
  ajoutActive =  false;
  nomDevoir:string = '';
  dateDeRendu!: Date;

  ngOnInit(): void { 
      setTimeout( ()=> { this.ajoutActive = true; }, 2000);
  }

  onSubmit() {
    const newAssignments = new Assignments();
    newAssignments.nom = this.nomDevoir; 
    newAssignments.dateDeRendu = this.dateDeRendu;
    newAssignments.rendu = false;

    this.assignments.push(newAssignments);
  }
 
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

  constructor() { }

}
