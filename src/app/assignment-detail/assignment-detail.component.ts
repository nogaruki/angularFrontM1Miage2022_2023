import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { Assignments } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  @Input() assignementTransmis!: Assignments;
  @Output() deleteClick: EventEmitter<Assignments> = new EventEmitter<Assignments>(); 
  
  constructor (private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
  }

  onDeleteAssignmentBtnClick()
  {
    this.deleteClick.emit(this.assignementTransmis);
    this.assignementTransmis != null;
  }

  onAssignementRendu() {
    this.assignmentsService.updateAssignment(this.assignementTransmis).subscribe( message => console.log(message));
  }
}
