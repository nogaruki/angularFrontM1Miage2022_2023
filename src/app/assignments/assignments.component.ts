import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../shared/model/assignment.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { Student } from '../shared/model/student.model';
import { AuthGuard } from '../shared/auth.guard';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les Assignments !';
  formVisible = false;
  assignementSelectionne!: Assignment;
  assignments!: Assignment[];
  ajoutActive = false;
  nomDevoir: string = '';
  dateDeRendu!: Date;
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;
  displayedColumns!: string[];
  sortedData!: Assignment[];

  dataSource!: MatTableDataSource<Assignment>;
  @ViewChild(MatSort) sort!: MatSort;

  filterValue: string = '';
  filterRendu: string = '';

  currentUser: any;

  constructor(private assignementsService: AssignmentsService, private router: Router, private authGuard: AuthGuard, private studentService: StudentService) { }

  ngOnInit(): void {
    if (this.authGuard.isLoggedIn() && this.authGuard.isStudent()) {
      this.studentService.getStudentByToken(localStorage.getItem("jwt")).subscribe((user: any) => {
        this.currentUser = user;
      })
    }

    this.displayedColumns = ['id', 'nom', 'dateDeRendu', 'rendu'];
    this.assignementsService.getAssignmentsPagine(this.page, this.limit, this.filterValue, this.filterRendu)
      .subscribe(data => {
        this.assignments = data.docs;
        this.dataSource = new MatTableDataSource<Assignment>(this.assignments);
        this.dataSource.sort = this.sort;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("données reçues");
      });

  }

  assignmentClique(assignment: Assignment) {
    this.assignementSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }


  getDataByPage(page: number, limit: number) {
    this.assignementsService.getAssignmentsPagine(page, limit, this.filterValue, this.filterRendu)
      .subscribe(data => {
        this.assignments = data.docs;
        this.dataSource = new MatTableDataSource<Assignment>(this.assignments);
        this.dataSource.sort = this.sort;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
      });
  }

  updatePage(event: any) {
    this.getDataByPage(event.pageIndex + 1, event.pageSize);
  }

  onRowClick(row: any) {
    // Récupérez l'ID de l'élément sélectionné
    const id = row.id;
    // Redirigez l'utilisateur vers la page de détail de l'élément en utilisant le service Router
    this.router.navigate(['/assignment', id]);
  }


  sortData(sort: Sort) {
    const isAscending = sort.direction === 'asc';
    this.sortedData = this.assignments.sort((a, b) => {
      if (isAscending) {
        // Tri ascendant
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      } else {
        // Tri descendant
        if (a.id > b.id) {
          return -1;
        } else if (a.id < b.id) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
  updateAssignmentsTable() {
    this.assignementsService.getAssignmentsPagine(this.page, this.limit, this.filterValue, this.filterRendu)
      .subscribe(data => {
        this.assignments = data.docs;
        this.dataSource = new MatTableDataSource<Assignment>(this.assignments);
        this.dataSource.sort = this.sort;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
      });
  }

  isRendu(assignment: Assignment): boolean {
    if(this.authGuard.isLoggedIn()) {
      return assignment.students_id.indexOf(this.currentUser._id) > -1;
    } else {
      return false;
    }
    
  }
}
