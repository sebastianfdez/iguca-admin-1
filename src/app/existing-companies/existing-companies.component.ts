import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Database, IgucaCompany } from '../course';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatDialog } from '@angular/material';
import { CompanyManagementComponent } from '../company-management/company-management.component';

@Component({
  selector: 'app-existing-companies',
  templateUrl: './existing-companies.component.html',
  styleUrls: ['./existing-companies.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExistingCompaniesComponent implements OnInit {
  public database = new Database(this.db);
  IgucaCompanies: IgucaCompany [] = [];
  public companies;


  constructor(private db: AngularFireDatabase,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  editCompany(i: number) {
    this.dialog.open(CompanyManagementComponent, {
      width: '1000px',
      data: {
        comany: this.IgucaCompanies[i],
        isNewCourse: false,
      },
    });
  }

  getDatabaseCompanies() {
    this.companies = this.database.getComapny();

    for (let _i = 0; _i < this.companies.length ; _i++) {
      this.IgucaCompanies[_i] = new IgucaCompany();
      this.IgucaCompanies[_i].name = this.companies[_i].name;
      this.IgucaCompanies[_i].courses = this.companies[_i].courses;
      this.IgucaCompanies[_i]._id = this.companies[_i]._id;
    }
    console.log(this.companies);
    console.log(this.IgucaCompanies);
  }

}
