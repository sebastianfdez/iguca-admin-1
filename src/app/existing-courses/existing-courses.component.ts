import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IgucaService } from '../services/iguca-service.service';
import { Database, IgucaCourse, IgucaQuestion } from '../course';
import { MatDialog } from '@angular/material';
import { InfoCourseLoaderComponent } from '../info-course-loader/info-course-loader.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { FirebaseApp } from 'angularfire2';
import { WarningComponent } from '../warning/warning.component';

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

  deleteStorageCourse( value: string) {
    try {
      const task = this.afStorage.ref(value).child('Examen').delete();
      const task1 = this.afStorage.ref(value).child('Respuestas').delete();
      const task2 = this.afStorage.ref(value).child('Ejercicios').delete();
      const task3 = this.afStorage.ref(value).child('Manual').delete();

    } catch (e) {
      console.log(e);
    }
  }

  editCourse(i: number) {
    const editDialog = this.dialog.open(InfoCourseLoaderComponent, {
      width: '1000px',
      data: {
        course: this.database.IgucaCourses[i],
        isNewCourse: false,
        editCourseNumber: i,
      },
    });
    editDialog.afterClosed().subscribe((result) => {
      this.database = new Database(this.db);
      // this distroy de old data from the comoponent that was loaded before
    });
  }

  deleteCourse(i: number) {
    const dialogRef = this.dialog.open(WarningComponent, {
      width: '600px',
      data: {
        message: `Seguro que quieres eliminar '${this.database.IgucaCourses[i].name}'? Una vez eliminado no se puede recuperar`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.database.deleteCoursesByKey(i);
        this.deleteStorageCourse(this.database.coursesKeys[i]);
      //  this.deleteStorageCourse('name', this.database.IgucaCourses[i].name );
      }
    });
  }

  homePage() {
    this.igucaService.closeExistingCourses();
  }

  showNewCourse() {
    const dialogRef = this.dialog.open(InfoCourseLoaderComponent, {
      width: '1000px',
      data: {
        course: null,
        isNewCourse: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
