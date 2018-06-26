import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IgucaService } from '../services/iguca-service.service';
import { Database, IgucaCourse, IgucaQuestion } from '../course';
import { MatDialog } from '@angular/material';
import { InfoCourseLoaderComponent } from '../info-course-loader/info-course-loader.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-existing-courses',
  templateUrl: './existing-courses.component.html',
  styleUrls: ['./existing-courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExistingCoursesComponent implements OnInit {

  public Courses: any[];
  public database: Database = new Database(this.db);
  public deleteChild = '';
  public deleteValue = '';
  public IgucaCourses: IgucaCourse[] = [];
  public Iguca: IgucaCourse = new IgucaCourse();
  public editC: IgucaCourse;
  public edit = false;
  public editN: number;


  constructor(
    private igucaService: IgucaService,
    private db: AngularFireDatabase,
    private dialog: MatDialog,
    private afStorage: AngularFireStorage) {
    }

  ngOnInit() {
  }

  getDatabaseCourses() {
    this.Courses = this.database.getElement();


    for (let _i = 0; _i < this.Courses.length ; _i++) {
      this.IgucaCourses[_i] = new IgucaCourse();
      this.IgucaCourses[_i].name = this.Courses[_i].name;
      this.IgucaCourses[_i].finalExam = this.Courses[_i].finalExam;
      this.IgucaCourses[_i]._id = this.Courses[_i]._id;

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

  deleteCourse(i: number) {
    // TODO: delete course
  }

  deleteDatabaseCourse() {
    this.database.deleteElement( 'name' , this.deleteValue );
    this.getDatabaseCourses();
    try {
      const task = this.afStorage.ref(this.deleteValue).child('Examen').delete();
      const task1 = this.afStorage.ref(this.deleteValue).child('Respuestas').delete();
      const task2 = this.afStorage.ref(this.deleteValue).child('Ejercicios').delete();
      const task3 = this.afStorage.ref(this.deleteValue).child('Manual').delete();

    } catch (e) {
      console.log(e);
    }
  }

  homePage() {
    this.igucaService.closeExistingCourses();
  }
}
