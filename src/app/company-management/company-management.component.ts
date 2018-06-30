import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { IgucaService } from '../services/iguca-service.service';
import { Database, IgucaCourse, IgucaQuestion, IgucaCompany } from '../course';
import { AngularFireDatabase } from 'angularfire2/database';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { AngularFireStorage } from 'angularfire2/storage';
import { FirebaseApp } from 'angularfire2';

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
  public editCompanyNumber;
  public coursePosition;
  public urlIcon = '';

  companyIcon: FileItem;

  public fileLoaderIcon: FileUploader = new FileUploader({
    url: '',
    allowedFileType: ['image'],
  });

  constructor(private db: AngularFireDatabase,
    public dialogRef: MatDialogRef<CompanyManagementComponent>,
    private afStorage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      if (this.data.company) {
        this.openCompany = this.data.company;
      }
      this.isNewCompany = this.data.isNewCompany;
      this.editCompanyNumber = this.data.editCompanyNumber;
  }

  ngOnInit() {
    this.courseNameInput = Object.assign([], this.database.igucaCoursesName);

    if (!this.isNewCompany) {
      this.database.chargedCompanies.subscribe((data) => {
        this.getStorageUrl();
      });
    }

    this.fileLoaderIcon.onAfterAddingFile = (item: FileItem) => {
      item.withCredentials = false;
      item.alias = 'manual';
      this.companyIcon = item;
      console.log('aca');
    };
  }

  addCourse() {
    if (!this.openCompany.courses) {
      this.openCompany.courses = [];
    }
    if (this.newCourse === '') {
      return null;
    }
    this.openCompany.courses.push(this.database.coursesKeys[this.coursePosition]);
    this.courseNameInput = this.courseNameInput.filter(course => course !== this.newCourse);
    this.newCourse = '';
  }

  deleteCourse(course: string) {
    this.openCompany.courses = this.openCompany.courses.filter((course_) => {
      return course_ !== course;
    });
  }

  deleteManual(file) {
    this.fileLoaderIcon.queue = this.fileLoaderIcon.queue.filter((file_) => {
      return file_ !== file;
    });
  }

  getStorageUrl() {
    try {
      const URL_ref_Icon = this.afStorage.ref('Icons').child(this.database.companiesKeys[this.editCompanyNumber]);
      URL_ref_Icon.getDownloadURL().subscribe(url => this.urlIcon = url);
    } catch (e) {}
  }

  sendCompany() {
    if (this.validation()) {
      const newKey = this.database.addCompany(this.openCompany);
      console.log(newKey);
      if (this.companyIcon) {
        this.uploadFile( this.companyIcon, newKey );
      }
      this.dialogRef.close(this.openCompany);
    }
  }

  setCoursePosition(i: number) {
    this.coursePosition = i;
  }

  updateCompany() {
    if (this.validation()) {
      this.database.updateCompany(this.openCompany, this.database.companiesKeys[this.editCompanyNumber]);
      if (this.companyIcon) {
        this.updateFile(this.companyIcon, this.database.companiesKeys[this.editCompanyNumber] );
      }
      this.dialogRef.close(this.openCompany);
    }
  }

  uploadFile(item: FileItem, file: string) {
    try {
      const task = this.afStorage.ref('Icons').child(file).put(item.file.rawFile);
    } catch (e) {
      console.log(e);
    }
  }

  updateFile(item: FileItem, file: string) {
    try {
      const task = this.afStorage.ref('Icons').child(file).delete();
    } catch (e) {
      console.log(e);
    }
    this.uploadFile(item, file );
  }

  validation(): boolean { // TODO: Validation
    let isValid = true;
    this.errVal = [];
    if (this.openCompany.name === '') {
      this.errVal.push('Compania debe tener nombre');
      isValid = false;
    }
    if (this.openCompany.courses.length === 0 ) {
      this.errVal.push('Compania debe tener por lo menos 1 Curso');
      isValid = false;
    }
    return isValid;
  }
}
