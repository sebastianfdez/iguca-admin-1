import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { query } from '@angular/core/src/render3/instructions';
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

  _id = '';
  company = '';
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
  public cursos: {}[];
  deletCourse: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
       this.courses = db.list('/Cursos');
       this.deletCourse = db.list('/Cursos');
        db.list('/Cursos').valueChanges().subscribe(Courses => {
        this.cursos = Courses;
    });

  }
  addElement(newCourse: IgucaCourse) {
    this.courses.push(newCourse);
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

