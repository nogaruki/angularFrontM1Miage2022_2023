import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { StudentAuthComponent } from './students/student-auth/student-auth.component';
import { TeacherAuthComponent } from './teacher/teacher-auth/teacher-auth.component';
import { StudentProfilComponent } from './students/student-profil/student-profil.component';
import { HomePageComponent } from './assignments/home-page/home-page.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';

const routes: Route[] = [
  // http://localhost:4200/
  { path: '', component: HomePageComponent },

  // http://localhost:4200/home
  { path: 'home', component: AssignmentsComponent },

  // http://loclahost:4200/add
  { path: 'add', component: AddAssignmentComponent },

  // http://localhost:4200/assignment/id
  { path: 'assignment/:id', component: AssignmentDetailComponent },

  //http://localhost:4200/edit/id
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard],
    data: { userType: 'teacher' }
  },

   // http://localhost:4200/teacher/auth
  { path: 'teacher/auth', component: TeacherAuthComponent },

  // http://localhost:4200/teacher/profil
  {
    path: 'student/profile',
    component: StudentProfilComponent,
    canActivate: [AuthGuard],
    data: { userType: 'student' }
  },

  // http://localhost:4200/student/auth
  { path: 'student/auth', component: StudentAuthComponent },

  // http://localhost:4200/student/profil
  {
    path: 'student/profile',
    component: StudentProfilComponent,
    canActivate: [AuthGuard],
    data: { userType: 'student' }
   },

];


@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    StudentAuthComponent,
    TeacherAuthComponent,
    StudentProfilComponent,
    HomePageComponent,
    TeacherProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
