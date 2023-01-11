import { Component, OnInit, /*EventEmitter, Output*/ } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Subject } from 'src/app/shared/model/subject.model';
import { SubjectService } from 'src/app/shared/subject.service';
import { Assignment } from '../../shared/model/assignment.model';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignments>()

  nomDevoir: string = "";
  dateRendu!: Date;
  subjects!: Subject[];
  subjectControl = new FormControl<string | null>(null, Validators.required);
  resultMessage!: string;

  constructor(private assignmentService: AssignmentsService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.subjectService.getAllSubject().subscribe(subjects => {
      this.subjects = subjects;
      console.log(this.subjects);
    })
  }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 10000)
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    const subjectName = this.subjectControl.value;
    const found = this.subjects.find(element => element.title === subjectName);

    if (found) {
      newAssignment.subject_id = found.id;
      console.log(newAssignment);
      this.assignmentService.addAssignment(newAssignment).subscribe(message => {
        console.log(message);
        this.subjectControl.reset();
        this.resultMessage = "L'assignment " + newAssignment.nom + " a bien été crée !"
      });

    } else {
      this.resultMessage = "Nous n'avons pas trouvé votre matiere, veuillez réessayer";
    }

  }

}
