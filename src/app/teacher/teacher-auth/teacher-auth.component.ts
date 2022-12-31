import { Component, OnInit, HostListener } from '@angular/core';
import { Teacher } from 'src/app/shared/model/teacher.model';
import { TeacherService } from 'src/app/shared/teacher.service';

@Component({
  selector: 'app-teacher-auth',
  templateUrl: './teacher-auth.component.html',
  styleUrls: ['./teacher-auth.component.css']
})
export class TeacherAuthComponent implements OnInit {

  constructor(private teacherService: TeacherService) { }

  isSignInForm: boolean = true;
  nom!: string;
  prenom!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  username!: string;
  picture!: string;
  ngOnInit(): void {
  }

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (target.classList.contains('btn')) {

      this.isSignInForm = !this.isSignInForm;

      const frame = document.querySelector('.frame') as HTMLElement; 
      const formSignup = document.querySelector('.form-signup') as HTMLElement;
      const signupInactive = document.querySelector('.signup-inactive') as HTMLElement;
      const signinActive = document.querySelector('.signin-active') as HTMLElement;
      const formSignin = document.querySelector('.form-signin') as HTMLElement;
      formSignin.classList.toggle('form-signin-left');
      formSignup.classList.toggle('form-signup-left') ;
      frame.classList.toggle('frame-long');
      signupInactive.classList.toggle('signup-active');
      signinActive.classList.toggle('signin-inactive');

    } else if (target.classList.contains('btn-signup')) {

      const nav = document.querySelector('.nav') as HTMLElement;
      const formSignupLeft = document.querySelector('.form-signup-left') as HTMLElement;
      const success = document.querySelector('.success') as HTMLElement;
      const frame = document.querySelector('.frame') as HTMLElement;
      nav.classList.toggle('nav-up');
      formSignupLeft.classList.toggle('form-signup-down');
      success.classList.toggle('success-left');
      frame.classList.toggle('frame-short');
       
    } else if (target.classList.contains('btn-signin')) {
      const btnAnimate = document.querySelector('.btn-animate') as HTMLElement;
      const success = document.querySelector('.success') as HTMLElement;
      const coverPhoto = document.querySelector('.cover-photo') as HTMLElement;
      const frame = document.querySelector('.frame') as HTMLElement;
      const profilePhoto = document.querySelector('.profile-photo') as HTMLElement;
      const btnGoback = document.querySelector('.btn-goback') as HTMLElement;

      btnAnimate.classList.toggle('btn-animate-grow');
      success.classList.toggle('success-left');
      coverPhoto.classList.toggle('cover-photo-down');
      frame.classList.toggle('frame-short');
      profilePhoto.classList.toggle('profile-photo-down');
      btnGoback.classList.toggle('btn-goback-up');

    }
    
  }

  onSubmit() {
    if(this.isSignInForm) {
      if(this.username === '' || this.password === '') {
        alert('Veuillez remplir tous les champs');
        return;
      }
      
      this.teacherService.login(this.password, this.username).subscribe( message => console.log(message));

    } else {

      if(this.nom === '' || this.prenom === '' || this.email === '' || this.password === '' || this.confirmPassword === '') {
        alert('Veuillez remplir tous les champs');
        return;
      } 
      if(this.password !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
      //regex email
      let regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
      if(!regex.test(this.email) || this.email.indexOf('@') === -1) {
        alert('Veuillez saisir une adresse email valide');
        return;
      }

      const newTeacher = new Teacher();
      newTeacher.nom = this.nom; 
      newTeacher.prenom = this.prenom;
      newTeacher.email = this.email;
      newTeacher.password = this.password;
      newTeacher.username = this.username;
      newTeacher.picture = this.picture;
      
      this.teacherService.register(newTeacher).subscribe( message => console.log(message));
    }
  }
}
