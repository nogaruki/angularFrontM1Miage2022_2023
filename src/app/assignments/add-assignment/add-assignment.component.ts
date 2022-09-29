import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Assignments } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() nouvelAssignment = new EventEmitter<Assignments>()

  nomDevoir:string = "";
  dateRendu!:Date;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newAssignment = new Assignments();
    newAssignment.nom = this.nomDevoir; 
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    
      this.nouvelAssignment.emit(newAssignment)
  }

}
