import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/model/student.model';
import { StudentService } from 'src/app/shared/student.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
// @ts-ignore
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-student-profil',
  templateUrl: './student-profil.component.html',
  styleUrls: ['./student-profil.component.css']
})
export class StudentProfilComponent implements OnInit {

  constructor(private studentService: StudentService, private router: Router, private authGuard: AuthGuard, private fb: FormBuilder) { }
  studentForm!: FormGroup;
  student!:Student;
  isActif: boolean = false;
  formInitialized: boolean = false;

  ngOnInit(): void {
    let token = this.authGuard.getToken();

    this.studentForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.studentService.getStudentByToken(token).subscribe((student) => {
      // @ts-ignore
      this.student = student;
      this.studentForm.patchValue({
        nom: this.student.nom,
        prenom: this.student.prenom,
        email: this.student.email,
        username: this.student.username
      });
      this.formInitialized = true;
    });


  }

  update() {
    console.log(this.studentForm.value);
    let updateStudent = new Student();
    if(!this.studentForm.valid) {
      alert("Veuillez remplir tous les champs");
    } else {

      updateStudent._id = this.student._id;
      updateStudent.nom = this.studentForm.get("nom")?.value;
      updateStudent.prenom = this.studentForm.get("prenom")?.value;
      updateStudent.email = this.studentForm.get("email")?.value;
      updateStudent.username = this.studentForm.get("username")?.value;

      this.studentService.updateStudent(updateStudent).subscribe((student) => {
        // @ts-ignore
        this.student = student;
        alert("Vos informations ont été mises à jour");
      });
    }
  }
}


