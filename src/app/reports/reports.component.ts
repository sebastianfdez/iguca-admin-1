import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IgucaService } from '../services/iguca-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Database, UserReport } from '../course';
import { MatDialog } from '@angular/material';
import { WarningComponent } from '../warning/warning.component';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';





@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ReportsComponent implements OnInit {
  database: Database = new Database(this.db);

  isReportCharged = false;
  isReportChargedKeys = false;
  isCoursesCharged = false;
  event = false;
  excel = new ExcelExportModule();
  public excelData: any[][] = [];

  public date = new Date();

  createData(courseNumber: number) { // creates the data of a course for the excel export funtionality
    let data: any[] = [];

    data = this.database.IgucaReports[courseNumber].courseReport;
    if (data[0].company !== 'pauta') {
      const correctReport = new UserReport();
      correctReport.company = 'pauta';
      correctReport.idSence = 'pauta';
      correctReport.rut = 'pauta';
      correctReport.score = 'pauta';
      correctReport.userName = 'pauta';
      correctReport.userMail = 'pauta';
      correctReport.questions = this.database.getCourseAnswer(this.database.reportsKeys[courseNumber]);
      data.unshift(correctReport);
    }
    this.excelData[courseNumber] = data;
    return data;
  }



  constructor( private igucaService: IgucaService,
    private db: AngularFireDatabase,
    private dialog: MatDialog) {
    }

  ngOnInit() {
    this.database.chargedReports.subscribe(() => { // waiting for database to charge Reports
      this.isReportCharged = true;

      if (this.isReportChargedKeys) {
        for (let i = 0; i < this.database.reportsKeys.length; i++) {
          this.createData(i);
        }
      }
    });
    this.database.chargedReportsKeys.subscribe(() => {
      this.isReportChargedKeys = true;

      if (this.isReportCharged) {
        for (let i = 0; i < this.database.reportsKeys.length; i++) {
          this.createData(i);
        }
      }
    });
    this.database.chargedCourses.subscribe(() => {
      this.isCoursesCharged = true;

    });
  }

  deleteReport(i: number) {
    const dialogRef = this.dialog.open(WarningComponent, {
      width: '600px',
      data: {
        message: `Seguro que quieres eliminar '${this.database.keyToName(this.database.reportsKeys)[i]}
        '? Una vez eliminada no puede recuperarse`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.database.deleteReportByKey(i);
      }
    });
  }


  homePage() {
    this.database = new Database(this.db);
    this.igucaService.closeReport();
  }


  test() {
  }



  public save(component): void {
    const options = component.workbookOptions();

    const rows = options.sheets[0].rows;
    rows.forEach((row) => {

        if (row.type === 'data') { // checking the UsersReports answers to the correct answers in the databse
          for (let i = 0; i < (row.cells.length - 7); i++) {
            if (row.cells[7 + i].value !== rows[1].cells[7 + i].value) {
              row.cells[7 + i].background = '#ff0000';
            }
          }
        }
    });

    component.save(options);
  }
}
