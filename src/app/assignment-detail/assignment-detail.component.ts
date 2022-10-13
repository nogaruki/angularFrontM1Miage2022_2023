import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  assignementTransmis!: Assignment;
  
  constructor (private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  onDeleteAssignmentBtnClick()
  {
    this.assignmentsService.deleteAssignment(this.assignementTransmis).subscribe((message) =>  console.log(message));


    this.router.navigate(['/home']);
  }

  onAssignementRendu() {
    this.assignmentsService.updateAssignment(this.assignementTransmis).subscribe( message => console.log(message));
    this.router.navigate(['/home']);
  }
  
  getAssignment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.assignmentsService.getAssignment(id).subscribe(assignment => this.assignementTransmis = assignment);
  }

  onclickEdit() {
    this.router.navigate(['/assignment', this.assignementTransmis.id, 'edit'], 
    {queryParams: {nom: this.assignementTransmis.nom}, fragment: 'edition'});
  }

  isAdmin(): boolean {
    return this.authService.loggedIn;
  }
}
