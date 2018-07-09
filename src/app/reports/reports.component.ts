import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IgucaService } from '../services/iguca-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Database } from '../course';

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

  createData(courseNumber: number) {
    let data: any[] = [];

    data = this.database.IgucaReports[courseNumber].courseReport;
  return data;
  }



  constructor( private igucaService: IgucaService,
    private db: AngularFireDatabase) { }

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
