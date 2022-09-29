import { Component, Input,OnInit } from '@angular/core';
import { Assignments } from '../assignments/assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignementTransmis!: Assignments;

  constructor() { }

  ngOnInit(): void {
  }

  onAssignementRendu() {
    if( this.assignementTransmis.rendu) {
      this.assignementTransmis.rendu = false;
    }
    else {
      this.assignementTransmis.rendu = true;
    }
  }

}
