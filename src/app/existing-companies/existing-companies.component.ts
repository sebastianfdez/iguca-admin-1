import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Database, IgucaCompany, IgucaCourse } from '../course';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatDialog } from '@angular/material';
import { CompanyManagementComponent } from '../company-management/company-management.component';
import { IgucaService } from '../services/iguca-service.service';
import { WarningComponent } from '../warning/warning.component';

@Component({
  selector: 'app-existing-companies',
  templateUrl: './existing-companies.component.html',
  styleUrls: ['./existing-companies.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExistingCompaniesComponent implements OnInit {
  public database = new Database(this.db);
  public companies;

  constructor(
    private db: AngularFireDatabase,
    private dialog: MatDialog,
    private igucaService: IgucaService,
  ) { }

  ngOnInit() {
  }

  deleteCompany(i: number) {
    const dialogRef = this.dialog.open(WarningComponent, {
      width: '600px',
      data: {
        message: `Seguro que quieres eliminar '${this.database.IgucaCompanies[i].name}'? Una vez eliminada no puede recuperarse`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       // this.database.deleteCompanyDB('name', this.database.IgucaCompanies[i].name);
       this.database.deleteCompanyByKey(i);
      }
    });
  }

  editCompany(i: number) {
    this.dialog.open(CompanyManagementComponent, {
      width: '1000px',
      data: {
        company: this.database.IgucaCompanies[i],
        isNewCompany: false,
        editCompanyNumber : i,
      },
    });
  }

  homePage() {
    this.igucaService.closeExistingCompany();
  }

  showCompanyManagement() {
    const dialogRef = this.dialog.open(CompanyManagementComponent, {
      width: '1000px',
      data: {
        company: null,
        isNewCompany: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });

  }

}
