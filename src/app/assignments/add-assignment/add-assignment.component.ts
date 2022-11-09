import { Component, OnInit, /*EventEmitter, Output*/} from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignments>()

  nomDevoir:string = "";
  dateRendu!:Date;

  constructor(private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*10000)
    newAssignment.nom = this.nomDevoir; 
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    
      // this.nouvelAssignment.emit(newAssignment)
      this.assignmentService.addAssignment(newAssignment).subscribe( message => console.log(message));
  }

}
