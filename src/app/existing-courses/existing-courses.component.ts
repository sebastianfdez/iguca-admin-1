import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IgucaService } from '../services/iguca-service.service';
import { Database, IgucaCourse, IgucaQuestion } from '../course';
import { MatDialog } from '@angular/material';
import { InfoCourseLoaderComponent } from '../info-course-loader/info-course-loader.component';

@Component({
  selector: 'app-existing-courses',
  templateUrl: './existing-courses.component.html',
  styleUrls: ['./existing-courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExistingCoursesComponent implements OnInit {

  private Courses: any[];
  private database: Database = new Database(this.db);
  public deleteChild = '';
  public deleteValue = '';
  public IgucaCourses: IgucaCourse[] = [];
  public Iguca: IgucaCourse = new IgucaCourse();
  public editC: IgucaCourse;
  public edit = false;

  constructor(
    private igucaService: IgucaService,
    private db: AngularFireDatabase,
    private dialog: MatDialog) {
    }

  ngOnInit() {
  }

  getDatabaseCourses() {
    this.Courses = this.database.getElement();
    for (let _i = 0; _i < this.Courses.length ; _i++) {
      this.IgucaCourses[_i] = new IgucaCourse();
      this.IgucaCourses[_i].name = this.Courses[_i].name;
      this.IgucaCourses[_i].company = this.Courses[_i].company;
      this.IgucaCourses[_i].exersices = this.Courses[_i].exersices;
      this.IgucaCourses[_i].finalExam = this.Courses[_i].finalExam;
      this.IgucaCourses[_i].finalExamenPdf = this.Courses[_i].finalExamenPdf;
      this.IgucaCourses[_i].documents = this.Courses[_i].documents;
      console.log(this.IgucaCourses[_i].finalExam[0].correct);
    }
    console.log(this.Courses);
    console.log(this.IgucaCourses);
  }

  editCourse(i: number) {
    this.dialog.open(InfoCourseLoaderComponent, {
      width: '1000px',
      data: {
        course: this.IgucaCourses[i],
        isNewCourse: false,
      },
    });
  }

  deleteDatabaseCourse() {
    this.database.deleteElement( this.deleteChild , this.deleteValue );
    this.getDatabaseCourses();


  }

}
