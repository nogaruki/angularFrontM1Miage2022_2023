import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Assignment } from '../shared/model/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { TeacherService } from '../shared/teacher.service';
import { Teacher } from '../shared/model/teacher.model';
import { CommentsService } from '../shared/comments.service';
import { Comment } from '../shared/model/comment.model';
import { SubjectService } from '../shared/subject.service';
import { Subject } from '../shared/model/subject.model';
import { UserService } from '../shared/user.service';
import { User } from '../shared/model/user.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  assignementTransmis!: Assignment;
  teacher!: Teacher;
  comments!:Comment[];
  subject!: Subject;
  teacherUser!: User;

  constructor(private userService: UserService, private subjectService: SubjectService , private commentsService: CommentsService, private teacherService: TeacherService, private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  onDeleteAssignmentBtnClick() {
    this.assignmentsService.deleteAssignment(this.assignementTransmis).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/home']);
    });

  }

  onAssignementRendu() {
    this.assignmentsService.updateAssignment(this.assignementTransmis).subscribe(message => {
      console.log(message)
      this.router.navigate(['/home']);
    });
  }

  getAssignment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignementTransmis = assignment;
      this.getTeacher(assignment.teacher_id);
      this.getComments(assignment.id);
      this.getSubject(assignment.subject_id);
      this.getTeacherUser(assignment.teacher_id);
    });
  }

  getTeacher(id: Number) {
    this.teacherService.getTeacher(id).subscribe(teacher => {
      this.teacher = teacher;
    });
  }

  getComments(assignmentId: Number) {
    this.commentsService.getComments(assignmentId).subscribe(comments => {
      this.comments = comments;
    });
  }

  getSubject(assignmentId: Number) {
    this.subjectService.getSubject(assignmentId).subscribe(subject => {
      this.subject = subject;
    });
  }

  getTeacherUser(assignmentId: Number) {
    this.userService.getUser(assignmentId).subscribe(user => {
      this.teacherUser = user;
    });
  }

  onclickEdit() {
    this.router.navigate(['/assignment', this.assignementTransmis.id, 'edit'],
      { queryParams: { nom: this.assignementTransmis.nom }, fragment: 'edition' });
  }

  isAdmin(): boolean {
    return this.authService.loggedIn;
  }
}
