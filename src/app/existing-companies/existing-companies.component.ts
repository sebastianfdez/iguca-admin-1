import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Database, IgucaCompany, IgucaCourse } from '../course';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatDialog } from '@angular/material';
import { CompanyManagementComponent } from '../company-management/company-management.component';
import { IgucaService } from '../services/iguca-service.service';

@Component({
  selector: 'app-existing-companies',
  templateUrl: './existing-companies.component.html',
  styleUrls: ['./existing-companies.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExistingCompaniesComponent implements OnInit {
  public database = new Database(this.db);
  igucaService: IgucaService = new IgucaService();
  IgucaCompanies: IgucaCompany [] = [];
  public companies;
  public deleteAlert = '';


  constructor(private db: AngularFireDatabase,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  deleteCompany(i: number) {
    if (this.deleteAlert !== '') {
      this.database.deleteCompanyDB('name', this.IgucaCompanies[i].name);
      this.deleteAlert = '';
    } else {
      this.deleteAlert = 'Estas seguro que deseas eliminar la compania?';
    }
  }

  editCompany(i: number) {
    this.dialog.open(CompanyManagementComponent, {
      width: '1000px',
      data: {
        company: this.IgucaCompanies[i],
        isNewCompany: false,
      },
    });
    // console.log(this.IgucaCompanies[i]);
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

  homePage() {  // TODO: dosen't work yet
    this.igucaService.closeExistingCompany();
  }

}
