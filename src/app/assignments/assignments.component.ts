import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les Assignments !';
  formVisible = false;
  assignementSelectionne!:Assignment;
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


  constructor(private assignementsService: AssignmentsService, private router: Router) { }
  
  ngOnInit(): void {
    this.assignementsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
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
    this.assignementsService.getAssignmentsPagine(page, limit)
      .subscribe(data => {
        this.assignments = data.docs;
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

}
