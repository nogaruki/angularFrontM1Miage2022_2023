import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthGuard} from "../../shared/auth.guard";
import {TeacherService} from "../../shared/teacher.service";
import {Teacher} from "../../shared/model/teacher.model";
import {MatSnackBar} from "@angular/material/snack-bar";

// @ts-ignore
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  teacherForm!: FormGroup;
  teacher!:Teacher;
  isActif: boolean = false;
  formInitialized: boolean = false;

  constructor(private teacherService: TeacherService, private router: Router, private authGuard: AuthGuard, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let token = this.authGuard.getToken();

    this.teacherForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
      picture: ['', [Validators.required, Validators.minLength(3)]],
    });

    // @ts-ignore
    this.teacherService.getTeacherByToken(token).subscribe((teacher) => {
      // @ts-ignore
      this.teacher = teacher;
      this.teacherForm.patchValue({
        nom: this.teacher.nom,
        prenom: this.teacher.prenom,
        email: this.teacher.email,
        username: this.teacher.username,
        picture: this.teacher.picture
      });
      this.formInitialized = true;
    });
  }

  update() {
    console.log(this.teacherForm.value);
    let updateTeacher = new Teacher();
    if(!this.teacherForm.valid) {
      this.snackBar.open("Veuillez remplir tous les champs", "Fermer", { duration: 5000 });
    } else {

      updateTeacher._id = this.teacher._id;
      updateTeacher.nom = this.teacherForm.get("nom")?.value;
      updateTeacher.prenom = this.teacherForm.get("prenom")?.value;
      updateTeacher.email = this.teacherForm.get("email")?.value;
      updateTeacher.username = this.teacherForm.get("username")?.value;
      updateTeacher.picture = this.teacherForm.get("picture")?.value;

      this.teacherService.updateTeacher(updateTeacher).subscribe((teacher) => {
        // @ts-ignore
        this.teacher = teacher;
        alert("Vos informations ont été mises à jour");
        this.snackBar.open("Vos informations ont été mises à jour", "Fermer", { duration: 5000 });
      });
    }
  }
}


