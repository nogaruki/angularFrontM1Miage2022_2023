import { Component, OnInit, HostListener } from '@angular/core';
import { Student } from 'src/app/shared/model/student.model';
import { StudentService } from 'src/app/shared/student.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-student-auth',
  templateUrl: './student-auth.component.html',
  styleUrls: ['./student-auth.component.css']
})
export class StudentAuthComponent implements OnInit {

  constructor(private studentService: StudentService, private router: Router, private authGuard: AuthGuard, private fb: FormBuilder) { }
  isLoggedIn: boolean = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  ngOnInit(): void {
    if(this.authGuard.isLoggedIn()) {
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

    const newStudent = new Student();
    newStudent.nom = this.registerForm?.get('nom')?.value;
    newStudent.prenom = this.registerForm?.get('prenom')?.value;
    newStudent.email = this.registerForm?.get('email')?.value;
    newStudent.password = this.registerForm?.get('password')?.value;
    newStudent.username = this.registerForm?.get('username')?.value;

    this.studentService.register(newStudent).subscribe(data => {
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
      this.router.navigate(['/student/profile']);
    }, 5000);
  }

  login() {
    if (this.loginForm?.invalid) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const btnAnimate = document.querySelector('.btn-animate') as HTMLElement;
    const success = document.querySelector('.success') as HTMLElement;
    const frame = document.querySelector('.frame') as HTMLElement;
    btnAnimate.classList.toggle('btn-animate-grow');
    success.classList.toggle('success-left');
    frame.classList.toggle('frame-short');

    // @ts-ignore
    this.studentService.login(this.loginForm?.get('password').value, this.loginForm?.get('username').value).subscribe(data => {
      localStorage.setItem('auth_type', data.auth);
      localStorage.setItem('jwt', data.token);
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    });
  }

}
