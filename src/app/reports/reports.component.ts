import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IgucaService } from '../services/iguca-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Database, UserReport } from '../course';
import { MatDialog } from '@angular/material';
import { WarningComponent } from '../warning/warning.component';


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

  public excelData;

 public date = new Date();


  createData(courseNumber: number) {
    let data: any[] = [];

    data = this.database.IgucaReports[courseNumber].courseReport;
    const correctReport = new UserReport();
    correctReport.company = 'pauta';
    correctReport.idSence = 'pauta';
    correctReport.rut = 'pauta';
    correctReport.score = 'pauta';
    correctReport.userName = 'pauta';
    correctReport.questions = this.database.getCourseAnswer(this.database.reportsKeys[courseNumber]);
    data.push(correctReport);
    return data;
  }



  constructor( private igucaService: IgucaService,
    private db: AngularFireDatabase,
    private dialog: MatDialog) {
    }

  ngOnInit() {
    this.database.chargedReports.subscribe(() => {
      this.isReportCharged = true;
    });
    this.database.chargedReportsKeys.subscribe(() => {
      this.isReportChargedKeys = true;
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
    this.igucaService.closeReport();
  }

  indexToNumber(i) {
    return i;
  }

  test() {
    console.log(this.database.existingReports[0][Object.keys(this.database.existingReports[0])[0]].company);
    console.log(Object.keys(this.database.existingReports[0])[0]);
    console.log(this.database.existingReports[1]['-LGWP_xTC_qTTDP0kPk']);
    console.log(this.database.IgucaReports);
   // console.log(this.createData(0)[0]);
    console.log(this.database.getCourseAnswer('-LGcba5stskq5OjHUmQl'));
  }



  public save(component): void {
    const options = component.workbookOptions();

    const rows = options.sheets[0].rows;

    let altIdx = 0;
    rows.forEach((row) => {
        if (row.type === 'data') {
            if (altIdx % 2 !== 0) {
                row.cells.forEach((cell) => {
                    cell.background = '#aabbcc';
                });
            }
            altIdx++;
        }
    });

    component.save(options);
}
}
