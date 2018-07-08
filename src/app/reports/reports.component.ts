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
  databse: Database = new Database(this.db);

  createData() {
    const data = [];
    this.databse.IgucaReports.forEach(element => {
      data.push({
        'company' : element.company,
        'idSence' : element.idSence,
        'rut' : element.rut,
        'userName' : element.userName,
      });
      for (let i = 0; i < element.questions.length; i++ ) {
        data[0].i = element.questions[i];
      }
    });
  return data;
  }



  constructor( private igucaService: IgucaService,
    private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  homePage() {
    this.igucaService.closeReport();
  }
  test() {
    console.log(this.databse.IgucaReports);
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
