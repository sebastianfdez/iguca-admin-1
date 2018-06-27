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
  public companies;
  public deleteAlert = '';


  constructor(private db: AngularFireDatabase,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.igucaService.companiesCharged$.subscribe((data) => {

    console.log('event');
    });
  }

  deleteCompany(i: number) {
    if (this.deleteAlert !== '') {
      this.database.deleteCompanyDB('name', this.database.IgucaCompanies[i].name);
      this.deleteAlert = '';
    } else {
      this.deleteAlert = 'Estas seguro que deseas eliminar la compania?';
    }
  }

  editCompany(i: number) {
    this.dialog.open(CompanyManagementComponent, {
      width: '1000px',
      data: {
        company: this.database.IgucaCompanies[i],
        isNewCompany: false,
      },
    });
    // console.log(this.IgucaCompanies[i]);
  }


  homePage() {  // TODO: dosen't work yet
    this.igucaService.closeExistingCompany();
  }

}
