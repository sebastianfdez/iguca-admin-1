import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IgucaService } from '../services/iguca-service.service';
import { Database, IgucaCourse, IgucaQuestion } from '../course';

@Component({
  selector: 'app-existing-courses',
  templateUrl: './existing-courses.component.html',
  styleUrls: ['./existing-courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExistingCoursesComponent implements OnInit {

  private Courses: {}[];
  private database: Database = new Database(this.db);
  public deleteChild = '';
  public deleteValue = '';


  constructor(private igucaService: IgucaService,
    private db: AngularFireDatabase) {
     }

  ngOnInit() {
  }

  getDatabaseCourses() {
    this.Courses = this.database.getElement();
    console.log(this.database.getElement());
    /* for (let _i = 0; _i < this.database.getElement().length; _i++) {
      for (let _k = 0; _k < this.database.getElement()[i].length; _k++){
      }
  }*/
  // this.iguca1 = this.Courses[0].company;


  }

  deleteDatabaseCourse() {
    this.database.deleteElement( this.deleteChild , this.deleteValue );
    this.getDatabaseCourses();


  }

}
