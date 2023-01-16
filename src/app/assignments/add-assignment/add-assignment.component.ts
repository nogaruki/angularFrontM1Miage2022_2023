import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Subject } from 'src/app/shared/model/subject.model';
import { SubjectService } from 'src/app/shared/subject.service';
import { Assignment } from '../../shared/model/assignment.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  subjects!: Subject[];
  subjectControl = new FormControl<string | null>(null, Validators.required);
  resultMessage!: string;

  generalForm = this._formBuilder.group({
    nameFormGroup : this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    }),
    dateFormGroup : this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    })
  })
  
  

  constructor(private assignmentService: AssignmentsService, private subjectService: SubjectService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.subjectService.getAllSubject().subscribe(subjects => {
      this.subjects = subjects;
    })
  }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 10000);
    if(this.generalForm.value.nameFormGroup?.firstCtrl && this.generalForm.value.dateFormGroup?.secondCtrl) {
      newAssignment.nom = this.generalForm.value.nameFormGroup?.firstCtrl;
      newAssignment.dateDeRendu = new Date(this.generalForm.value.dateFormGroup?.secondCtrl);
    }
    const subjectName = this.subjectControl.value;
    const found = this.subjects.find(element => element.title === subjectName);

    if (found) {
      newAssignment.subject_id = found.id;
      newAssignment.students_id = [];
      this.assignmentService.addAssignment(newAssignment).subscribe(message => {
        this.subjectControl.reset();
        this.resultMessage = "L'assignment " + newAssignment.nom + " a bien été crée !"
      });

    } else {
      this.resultMessage = "Nous n'avons pas trouvé votre matiere, veuillez réessayer";
    }

  }

}
