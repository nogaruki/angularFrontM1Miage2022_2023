import { Component, OnInit, HostListener } from '@angular/core';
import { Teacher } from 'src/app/shared/model/teacher.model';
import { TeacherService } from 'src/app/shared/teacher.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-teacher-auth',
  templateUrl: './teacher-auth.component.html',
  styleUrls: ['./teacher-auth.component.css']
})
export class TeacherAuthComponent implements OnInit {

  constructor(private teacherService: TeacherService, private router: Router, private authGuard: AuthGuard, private fb: FormBuilder) { }
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  isLoggedIn: boolean = false;
  message!: string;

  ngOnInit(): void {
    if (this.authGuard.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      picture: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  logOut() {
    this.authGuard.logOut();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
  }

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (target.classList.contains('btn')) {
      const frame = document.querySelector('.frame') as HTMLElement;
      const formSignup = document.querySelector('.form-signup') as HTMLElement;
      const signupInactive = document.querySelector('.signup-inactive') as HTMLElement;
      const signinActive = document.querySelector('.signin-active') as HTMLElement;
      const formSignin = document.querySelector('.form-signin') as HTMLElement;
      formSignin.classList.toggle('form-signin-left');
      formSignup.classList.toggle('form-signup-left');
      frame.classList.toggle('frame-long');
      signupInactive.classList.toggle('signup-active');
      signinActive.classList.toggle('signin-inactive');
    }

  }

  register() {
    //verifier si le registerFom est valide
    if (this.registerForm?.invalid) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    //verifier si le mot de passe < 6 caractères
    if (this.registerForm?.get('password')?.value.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    //verifier si les deux mots de passe dans registerFom sont identiques
    if (this.registerForm?.get('password')?.value !== this.registerForm?.get('confirmPassword')?.value) {
      alert('Les deux mots de passe ne sont pas identiques');
      return;
    }

    //vérifier si le mail dans registerForm est valide
    if (!this.registerForm?.get('email')?.valid) {
      alert('Veuillez saisir un email valide');
      return;
    }

    const newTeacher = new Teacher();
    newTeacher.nom = this.registerForm?.get('nom')?.value;
    newTeacher.prenom = this.registerForm?.get('prenom')?.value;
    newTeacher.email = this.registerForm?.get('email')?.value;
    newTeacher.password = this.registerForm?.get('password')?.value;
    newTeacher.username = this.registerForm?.get('username')?.value;
    newTeacher.picture = this.registerForm?.get('picture')?.value;

    this.teacherService.register(newTeacher).subscribe(data => {
      localStorage.setItem('auth_type', data.auth);
      localStorage.setItem('jwt', data.token);
      this.router.navigate(['/home']);
    });

    const nav = document.querySelector('.nav') as HTMLElement;
    const formSignupLeft = document.querySelector('.form-signup-left') as HTMLElement;
    const success = document.querySelector('.success') as HTMLElement;
    const frame = document.querySelector('.frame') as HTMLElement;
    nav.classList.toggle('nav-up');
    formSignupLeft.classList.toggle('form-signup-down');
    success.classList.toggle('success-left');
    frame.classList.toggle('frame-short');

    setTimeout(() => {
      this.router.navigate(['/teacher/profile']);
    }, 5000);
  }

  login() {
    if (this.loginForm?.invalid) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const success = document.querySelector('.success') as HTMLElement;
    const frame = document.querySelector('.frame') as HTMLElement;

    success.classList.toggle('success-left');
    frame.classList.toggle('frame-short');

    // @ts-ignore
    this.teacherService.login(this.loginForm?.get('password').value, this.loginForm?.get('username').value).subscribe(data => {
      if (data.message) {
        this.message = data.message;
      } else {
        localStorage.setItem('auth_type', data.auth);
        localStorage.setItem('jwt', data.token);
        this.router.navigate(['/home'])
      }
    });

  }
}
