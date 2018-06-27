import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { IgucaService } from '../services/iguca-service.service';
import { Database, IgucaCourse, IgucaQuestion, IgucaCompany } from '../course';
import { AngularFireDatabase } from 'angularfire2/database';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyManagementComponent implements OnInit {
  IgucaCompanies: IgucaCompany[] = [];
  database: Database = new Database(this.db);
  IgucaCourses = [];
  isNewCompany: boolean;
  public openCompany: IgucaCompany = new IgucaCompany();
  public errVal = [];
  public newCourse = '';
  public courseNameInput = [];

  constructor(private db: AngularFireDatabase,
    public dialogRef: MatDialogRef<CompanyManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      if (this.data.company) {
        this.openCompany = this.data.company;
      }
      this.isNewCompany = this.data.isNewCompany;
  }

  ngOnInit() {
    this.courseNameInput = Object.assign([], this.database.igucaCoursesName);
  }

  addCourse() {
    if (!this.openCompany.courses) {
      this.openCompany.courses = [];
    }
    this.openCompany.courses.push(this.newCourse);
    this.courseNameInput = this.courseNameInput.filter(course => course !== this.newCourse);
    this.newCourse = '';
  }

  deleteCourse(course: string) {
    this.openCompany.courses = this.openCompany.courses.filter((course_) => {
      return course_ !== course;
    });
  }

  sendCompany() {
    if (this.validation) {
      this.database.addCompany(this.openCompany);
      this.dialogRef.close(this.openCompany);
    }
  }

  updateCompany() {
    if (this.validation) {
      this.database.updateCompany(this.openCompany);
      this.dialogRef.close(this.openCompany);
    }
  }

  validation(): boolean { // TODO: Validation
    this.errVal = [];
    if (this.openCompany.name === '') {
      this.errVal.push('Compania debe tener nombre');
    }
    if (this.openCompany.courses[0] === '' ) {
      this.errVal.push('Compania debe tener por lo menos 1 Curso');
    }
    if (this.errVal === [] ) {
      return true;
    } else {
      return false;
    }
  }
}
