import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { query } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';


export class IgucaQuestion {
  a = '';
  b = '';
  c = '';
  d = '';
  correct = '';
  question = '';
  number = 0;
}

export class IgucaCourse {


  company = '';
  finalExamenPdf = '';
  documents: string[] = [];
  exersices: string[] = [];
  finalExam: IgucaQuestion[] = [];
  name = '';
}

export class Upload {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}

export class Database {
  public courses: AngularFireList<IgucaCourse>;
  public cursos: any[];
  deletCourse: AngularFireList<any>;
  items: Observable<any[]>;
  coursesCharged: boolean;

  constructor(db: AngularFireDatabase) {
    this.courses = db.list('/Cursos');
    this.deletCourse = db.list('/Cursos');
    this.coursesCharged = false;

   /*this.items = db.list('/Cursos').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log(this.items); */


    // const newKey = db.database.ref().child('/Cursos').push().key;

    db.list('/Cursos').valueChanges().subscribe((Courses) => {
      this.coursesCharged = true;

      this.cursos = Courses;
    });

    console.log(Object.keys(db.list('/Cursos').snapshotChanges()));

  }
  addElement(newCourse: IgucaCourse) {
    console.log(this.courses.push(newCourse).key);
  }
  getElement() {
    return this.cursos;
  }

  deleteElement( Child: string, equalTo: string ) {
   console.log(this.deletCourse.snapshotChanges());
   const herma = this.deletCourse.query.orderByChild(Child).equalTo(equalTo);
   herma.once('value', function(snapshot) {
    snapshot.forEach(function(child) {
      child.ref.remove();
  });
  });
}
}

